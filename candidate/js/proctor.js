// Lightweight in-page proctoring signals — a SECOND layer on top of SEB
// (Safe Exam Browser), not a replacement for it. SEB handles OS-level
// lockdown (blocking other apps, clipboard, alt-tab); this just logs
// browser-level signals so they show up live on the admin dashboard,
// matching the "second layer" approach already used in this project.
//
// onFlag(flag) is called with { type, detail, at } every time something
// worth noting happens. The caller (quiz.js) pushes each flag to Firestore
// as its own write, so this module is also responsible for not flooding
// that with duplicates — see COOLDOWN_MS below.

export function startProctoring(onFlag) {
  let tabSwitchCount = 0;
  let fullscreenExitCount = 0;
  let copyPasteBlockCount = 0;

  // At most one flag of a given type per COOLDOWN_MS. Without this, a
  // candidate holding down a blocked key (browsers auto-repeat keydown
  // ~20-30x/sec while held) or mashing right-click/paste generates one
  // Firestore write per event — a real session hit 1500+ flags this way.
  // The per-action counters below still count every real occurrence in
  // their text; this only limits how often a new flag document gets
  // written, so a held key shows as one flag every ~1.5s instead of 30/sec.
  const COOLDOWN_MS = 1500;
  const lastFlagAt = {};
  function emit(type, detail) {
    const now = Date.now();
    if (lastFlagAt[type] && now - lastFlagAt[type] < COOLDOWN_MS) return;
    lastFlagAt[type] = now;
    onFlag({ type, detail, at: now });
  }

  // Tab switch / window blur
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      tabSwitchCount += 1;
      emit("tab_switch", `Tab/window switch #${tabSwitchCount}`);
    }
  });
  window.addEventListener("blur", () => {
    // visibilitychange already covers most tab switches; blur also catches
    // alt-tab to another app on some browsers/OSes.
  });

  // Fullscreen exit
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
      fullscreenExitCount += 1;
      emit("fullscreen_exit", `Exited fullscreen #${fullscreenExitCount}`);
    }
  });

  // Block copy / paste / cut / right-click on the quiz area
  const blockedEvents = ["copy", "paste", "cut", "contextmenu"];
  blockedEvents.forEach((evt) => {
    document.addEventListener(evt, (e) => {
      e.preventDefault();
      copyPasteBlockCount += 1;
      emit("copy_paste_blocked", `Blocked "${evt}" #${copyPasteBlockCount}`);
    });
  });

  // Block common devtools / view-source shortcuts (deterrent only — this
  // cannot fully stop a determined candidate, same caveat as the rest of
  // this project's browser-signal proctoring).
  document.addEventListener("keydown", (e) => {
    // Holding a key down fires repeated keydown events (e.repeat = true)
    // at the OS's key-repeat rate — only the initial press is worth a
    // flag; the cooldown above would catch the rest anyway, but skipping
    // repeats outright avoids even evaluating/preventing them 30x/sec.
    if (e.repeat) return;
    const blocked =
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
      (e.ctrlKey && e.key === "u");
    if (blocked) {
      e.preventDefault();
      emit("devtools_attempt", "Attempted to open devtools/view-source");
    }
  });
}

// Without solid user-activation (e.g. a click that the browser doesn't
// fully credit as one, which happens in some automated/edge-case contexts),
// requestFullscreen() can fail to settle its promise at all instead of
// cleanly rejecting -- leaving whatever awaits it stuck forever. A 3s
// timeout race guards against that: a candidate's fullscreen hiccup should
// never block the quiz itself from rendering, only skip the fullscreen
// lock (already logged separately via the fullscreenchange listener).
function timeout(ms) {
  return new Promise((resolve) => setTimeout(() => resolve("timeout"), ms));
}

export async function requestFullscreen() {
  const el = document.documentElement;
  try {
    if (!el.requestFullscreen) return false;
    const outcome = await Promise.race([
      el.requestFullscreen().then(() => "ok"),
      timeout(3000),
    ]);
    return outcome === "ok";
  } catch (e) {
    return false;
  }
}

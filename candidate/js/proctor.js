// Lightweight in-page proctoring signals — a SECOND layer on top of SEB
// (Safe Exam Browser), not a replacement for it. SEB handles OS-level
// lockdown (blocking other apps, clipboard, alt-tab); this just logs
// browser-level signals so they show up live on the admin dashboard,
// matching the "second layer" approach already used in this project.
//
// onFlag(flag) is called with { type, detail, at } every time something
// worth noting happens. The caller (quiz.js) pushes each flag to Firestore.

export function startProctoring(onFlag) {
  let tabSwitchCount = 0;
  let fullscreenExitCount = 0;
  let copyPasteBlockCount = 0;

  // Tab switch / window blur
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      tabSwitchCount += 1;
      onFlag({ type: "tab_switch", detail: `Tab/window switch #${tabSwitchCount}`, at: Date.now() });
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
      onFlag({ type: "fullscreen_exit", detail: `Exited fullscreen #${fullscreenExitCount}`, at: Date.now() });
    }
  });

  // Block copy / paste / cut / right-click on the quiz area
  const blockedEvents = ["copy", "paste", "cut", "contextmenu"];
  blockedEvents.forEach((evt) => {
    document.addEventListener(evt, (e) => {
      e.preventDefault();
      copyPasteBlockCount += 1;
      onFlag({ type: "copy_paste_blocked", detail: `Blocked "${evt}" #${copyPasteBlockCount}`, at: Date.now() });
    });
  });

  // Block common devtools / view-source shortcuts (deterrent only — this
  // cannot fully stop a determined candidate, same caveat as the rest of
  // this project's browser-signal proctoring).
  document.addEventListener("keydown", (e) => {
    const blocked =
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
      (e.ctrlKey && e.key === "u");
    if (blocked) {
      e.preventDefault();
      onFlag({ type: "devtools_attempt", detail: "Attempted to open devtools/view-source", at: Date.now() });
    }
  });
}

export async function requestFullscreen() {
  const el = document.documentElement;
  try {
    if (el.requestFullscreen) await el.requestFullscreen();
    return true;
  } catch (e) {
    return false;
  }
}

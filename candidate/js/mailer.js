// Sends email via a Google Apps Script Web App running under your own
// Gmail account — no third-party email vendor. See
// ../coach-sql/mailer/README.md (same deployment, shared by every product)
// for what it is and how to deploy it.

// The POST body is a JSON string with NO explicit Content-Type header, which
// keeps this in the CORS "simple request" category. Apps Script Web Apps
// don't handle CORS preflight (OPTIONS) requests, so setting
// "Content-Type: application/json" here would make every call fail.
export async function sendMail(mailerUrl, mailerSecret, { to, subject, body }) {
  if (!mailerUrl || !mailerSecret) {
    throw new Error("MAILER_URL/MAILER_SECRET is not set in firebase-config.js.");
  }
  const res = await fetch(mailerUrl, {
    method: "POST",
    body: JSON.stringify({ key: mailerSecret, to, subject, body }),
  });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new Error(`Mailer returned an unexpected response: ${text.slice(0, 200)}`);
  }
  if (!data.ok) throw new Error(data.error || "Mailer reported failure.");
  return data;
}

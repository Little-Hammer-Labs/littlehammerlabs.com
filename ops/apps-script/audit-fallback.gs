/**
 * LHL Systems Audit — fallback lead intake (Google Apps Script web app).
 *
 * Used only when the primary intake (https://hooks.littlehammerlabs.com/webhook/audit-lead, n8n on the
 * LHL Mac mini) is unreachable or slow. The form re-sends the same payload here.
 *
 * What it does: same checks as the n8n "Clean lead" node, appends one row to the "Fallback" tab of
 * "LHL Systems Audit Leads", emails Max. No secrets in this file.
 *
 * Deploy (once, as an account with edit access to the sheet):
 *   1. Open the sheet > Extensions > Apps Script. Replace Code.gs with this file. Save.
 *   2. Run `setup` once from the editor and accept the permissions (Sheets + send mail as you).
 *   3. Deploy > New deployment > type "Web app". Execute as: Me. Who has access: Anyone. Deploy.
 *   4. Copy the Web app URL (https://script.google.com/macros/s/.../exec) into FALLBACK_URL in
 *      systems-audit/index.html.
 * Updating later: Deploy > Manage deployments > edit > Version: New version (keeps the same URL).
 * Turning it off: Deploy > Manage deployments > Archive.
 */

const SHEET_ID = '10WjrNQiYDr_cAwsvPUJXpry-_sWwk9T7kEbPzgx8-jg';
const TAB = 'Fallback';
const NOTIFY = 'max@littlehammerlabs.com';
const MAX_EMAILS_PER_HOUR = 20; // above this, rows are still saved but email stops (spam guard)

const COLS = ['received_at', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'name', 'business',
  'phone', 'email', 'industry', 'employees', 'headaches', 'best_time', 'text_consent', 'fbclid', 'gclid', 'fbp',
  'fbc', 'event_id', 'page', 'submitted_at', 'status', 'via'];

function setup() {
  sheet_();
  return 'ok';
}

function doGet() {
  return json_({ ok: true, service: 'lhl-audit-fallback' });
}

function doPost(e) {
  let b = {};
  try {
    b = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return json_({ ok: false });
  }
  if (b.form !== 'systems-audit') return json_({ ok: true });
  if (b.website_hp) return json_({ ok: true }); // honeypot filled: bot

  const s = (v, n) => (v == null ? '' : String(v)).trim().slice(0, n || 300);
  const heads = (Array.isArray(b.headaches) ? b.headaches : [b.headaches]).filter(Boolean).map(h => s(h, 80)).join(', ');
  const lead = {
    received_at: Utilities.formatDate(new Date(), 'America/Los_Angeles', 'yyyy-MM-dd HH:mm:ss'),
    utm_source: s(b.utm_source, 60) || 'direct', utm_medium: s(b.utm_medium, 60) || 'none',
    utm_campaign: s(b.utm_campaign, 100), utm_content: s(b.utm_content, 100),
    name: s(b.name, 120), business: s(b.business, 160), phone: s(b.phone, 40), email: s(b.email, 160),
    industry: s(b.industry, 80), employees: s(b.employees, 20), headaches: heads,
    best_time: s(b.best_time, 40), text_consent: b.text_consent === true || b.text_consent === 'true' ? 'yes' : 'no',
    fbclid: s(b.fbclid, 500), gclid: s(b.gclid, 500), fbp: s(b.fbp, 200), fbc: s(b.fbc, 500),
    event_id: s(b.event_id, 80), page: s(b.page, 500), submitted_at: s(b.submitted_at, 40),
    status: 'new', via: 'fallback',
  };
  if (!lead.name && !lead.phone) return json_({ ok: true });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    // Leading = + - @ would be read as a formula by Sheets: store as text.
    sheet_().appendRow(COLS.map(k => /^[=+\-@]/.test(lead[k]) ? "'" + lead[k] : lead[k]));
  } finally {
    lock.releaseLock();
  }

  const cache = CacheService.getScriptCache();
  const sent = Number(cache.get('mails') || 0);
  if (sent < MAX_EMAILS_PER_HOUR) {
    cache.put('mails', String(sent + 1), 3600);
    MailApp.sendEmail(NOTIFY,
      'FALLBACK audit lead (box unreachable): ' + (lead.business || lead.name) + ' (' + lead.utm_source + ')',
      'The LHL box did not take this lead, so the Google fallback caught it.\n' +
      'It is in the "Fallback" tab, not "Leads". Check the box (n8n / tunnel) too.\n\n' +
      'Name: ' + lead.name + '\nBusiness: ' + lead.business + '\nPhone: ' + lead.phone + '\nEmail: ' + lead.email +
      '\nBest time: ' + lead.best_time + '\nOK to text: ' + lead.text_consent +
      '\n\nIndustry: ' + lead.industry + '\nPeople: ' + lead.employees + '\nHeadaches: ' + lead.headaches +
      '\n\nSource: ' + lead.utm_source + ' / ' + lead.utm_medium + '\nevent_id: ' + lead.event_id +
      '\nReceived ' + lead.received_at +
      '\nSheet: https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/edit');
  }
  return json_({ ok: true });
}

function sheet_() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sh = ss.getSheetByName(TAB);
  if (!sh) {
    sh = ss.insertSheet(TAB);
    sh.appendRow(COLS);
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

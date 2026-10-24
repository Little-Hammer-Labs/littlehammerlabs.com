// Little Hammer Labs — small shared script. No frameworks.
(function () {
  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Mark current nav item
  var path = location.pathname.replace(/index\.html$/, '');
  document.querySelectorAll('.nav-link').forEach(function (a) {
    if (a.getAttribute('href') === path) a.setAttribute('aria-current', 'page');
  });

  function track(name, params) {
    if (typeof gtag === 'function') gtag('event', name, params || {});
  }

  // UTM capture. Ads and letters land with utm_* in the URL; keep them for the session
  // so a form on a later page still carries the source.
  var UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
  var utm = {};
  try {
    var qs = new URLSearchParams(location.search);
    var seen = false;
    UTM.forEach(function (k) { if (qs.get(k)) { utm[k] = qs.get(k); seen = true; } });
    if (seen) sessionStorage.setItem('lhl_utm', JSON.stringify(utm));
    else utm = JSON.parse(sessionStorage.getItem('lhl_utm') || '{}');
  } catch (e) { utm = {}; }
  document.querySelectorAll('form').forEach(function (f) {
    UTM.forEach(function (k) {
      var el = f.querySelector('[name="' + k + '"]');
      if (el && utm[k]) el.value = utm[k];
    });
  });

  // Conversions on links. A link may name its event with data-event; otherwise infer it.
  // Owner pages book "owner_call_booked", audit pages "audit_call_booked", everything else "book_call_click".
  var section = /^\/owners\//.test(path) ? 'owners' : /^\/systems-audit\//.test(path) ? 'audit' : /^\/guides\//.test(path) ? 'guides' : 'site';
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var label = a.textContent.trim();
    var named = a.getAttribute('data-event');
    if (named) { track(named, { event_category: 'conversion', event_label: label, transport_type: 'beacon' }); return; }
    if (/cal\.com/.test(href)) {
      var ev = section === 'owners' ? 'owner_call_booked' : section === 'audit' ? 'audit_call_booked' : 'book_call_click';
      track(ev, { event_category: 'conversion', event_label: label, transport_type: 'beacon' });
    } else if (/^mailto:/.test(href)) {
      track('email_click', { event_category: 'conversion', event_label: label, page_section: section, transport_type: 'beacon' });
    } else if (section === 'guides' && /^\/(owners|systems-audit)\//.test(href)) {
      track('guide_cta_click', { event_category: 'conversion', event_label: label, destination: href, guide: path, transport_type: 'beacon' });
    }
  });

  // Forms. Each posts to Formspree; until the endpoint ID is configured (action still contains
  // REPLACE_ME) a submit becomes a prefilled email so the form is never dead.
  function wireForm(form, eventName, subject, fields) {
    if (!form) return;
    form.addEventListener('submit', function (e) {
      var hp = form.querySelector('[name="company_website"]');
      if (hp && hp.value) { e.preventDefault(); return; } // honeypot
      track(eventName, { event_category: 'conversion', utm_source: utm.utm_source || '', utm_campaign: utm.utm_campaign || '' });
      if (/REPLACE_ME/.test(form.action)) {
        e.preventDefault();
        var f = function (n) { var el = form.querySelector('[name="' + n + '"]:checked, [name="' + n + '"]'); return el ? el.value : ''; };
        var body = fields.map(function (pair) { return pair[0] + ': ' + f(pair[1]); }).join('\n');
        var who = f('name');
        location.href = 'mailto:contact@littlehammerlabs.com?subject=' + encodeURIComponent(subject + (who ? ': ' + who : '')) + '&body=' + encodeURIComponent(body);
      }
    });
  }

  wireForm(document.getElementById('memo-form'), 'investor_memo_request', 'Investor memo request', [
    ['Name', 'name'], ['Email', 'email'], ['Accredited', 'accredited'], ['Check size', 'check_size'], ['Heard via', 'source'], ['Message', 'message']
  ]);

  wireForm(document.getElementById('audit-form'), 'audit_form_submit', 'Systems Audit request', [
    ['Name', 'name'], ['Business', 'business_name'], ['Industry', 'industry'], ['Employees', 'employees'], ['Annual revenue', 'revenue'],
    ['Biggest headache', 'headache'], ['Phone', 'phone'], ['Email', 'email'], ['Heard via', 'source'],
    ['UTM source', 'utm_source'], ['UTM medium', 'utm_medium'], ['UTM campaign', 'utm_campaign'], ['UTM content', 'utm_content']
  ]);
})();

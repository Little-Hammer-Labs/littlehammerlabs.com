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

  // Meta pixel. Set the ID once here and every page loads it; until then nothing loads.
  var META_PIXEL_ID = 'REPLACE_ME_PIXEL';
  if (!/REPLACE_ME/.test(META_PIXEL_ID)) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', META_PIXEL_ID);
    fbq('track', 'PageView');
  }
  function pixel(name, params) {
    if (typeof fbq === 'function') fbq('track', name, params || {});
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
  // Carry the same UTMs onto every cal.com link so bookings keep their source too.
  // After a form submit, also prefill name and email (kept in sessionStorage, never in this site's URLs).
  var pre = {};
  try { pre = JSON.parse(sessionStorage.getItem('lhl_prefill') || '{}'); } catch (e) { pre = {}; }
  document.querySelectorAll('a[href*="cal.com"]').forEach(function (a) {
    try {
      var u = new URL(a.href);
      UTM.forEach(function (k) { if (utm[k]) u.searchParams.set(k, utm[k]); });
      Object.keys(pre).forEach(function (k) { u.searchParams.set(k, pre[k]); });
      a.href = u.toString();
    } catch (e) {}
  });

  // Confirmed bookings. Each cal.com event type redirects here after booking
  // (/owners/booked/ and /systems-audit/booked/), so these fire only on a real booking.
  if (/^\/owners\/booked\//.test(path)) { track('owner_call_booked', { event_category: 'conversion' }); pixel('Schedule', { content_name: 'Owner conversation' }); }
  if (/^\/systems-audit\/booked\//.test(path)) { track('audit_call_booked', { event_category: 'conversion' }); pixel('Schedule', { content_name: 'Systems Audit' }); }

  // Clicks on links. A link may name its event with data-event; otherwise infer it.
  // A click on a booking link is only intent ("*_call_click"); the "*_call_booked" events fire on the booked pages above.
  var section = /^\/owners\//.test(path) ? 'owners' : /^\/systems-audit\//.test(path) ? 'audit' : /^\/guides\//.test(path) ? 'guides' : 'site';
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var label = a.textContent.trim();
    var named = a.getAttribute('data-event');
    if (named) { track(named, { event_category: 'conversion', event_label: label, transport_type: 'beacon' }); return; }
    if (/cal\.com/.test(href)) {
      var ev = section === 'owners' ? 'owner_call_click' : section === 'audit' ? 'audit_call_click' : 'book_call_click';
      track(ev, { event_category: 'conversion', event_label: label, transport_type: 'beacon' });
    } else if (/^mailto:/.test(href)) {
      track('email_click', { event_category: 'conversion', event_label: label, page_section: section, transport_type: 'beacon' });
    } else if (section === 'guides' && /^\/(owners|systems-audit)\//.test(href)) {
      track('guide_cta_click', { event_category: 'conversion', event_label: label, destination: href, guide: path, transport_type: 'beacon' });
    }
  });

  // Forms. The form action is the intake webhook (n8n, or Formspree). Submits go as JSON
  // in the background, then the owner lands on the thanks page with name and email
  // carried into the booking link. Until the endpoint is set (action still contains
  // REPLACE_ME), or if the request fails, a submit becomes a prefilled email so no lead is lost.
  function wireForm(form, eventName, subject, fields, pixelEvent) {
    if (!form) return;
    form.addEventListener('submit', function (e) {
      var hp = form.querySelector('[name="company_website"]');
      if (hp && hp.value) { e.preventDefault(); return; } // honeypot
      e.preventDefault();
      var f = function (n) {
        var el = form.querySelector('[name="' + n + '"]');
        if (el && el.type === 'checkbox') return el.checked ? 'true' : 'false';
        return el ? el.value : '';
      };
      var data = {};
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name || el.name === 'company_website' || el.name.charAt(0) === '_') return;
        data[el.name] = el.type === 'checkbox' ? el.checked : el.value;
      });
      data.form = form.id;
      data.page = location.pathname;
      data.submitted_at = new Date().toISOString();
      var mailto = function () {
        var body = fields.map(function (pair) { return pair[0] + ': ' + f(pair[1]); }).join('\n');
        var who = f('name');
        location.href = 'mailto:contact@littlehammerlabs.com?subject=' + encodeURIComponent(subject + (who ? ': ' + who : '')) + '&body=' + encodeURIComponent(body);
      };
      track(eventName, { event_category: 'conversion', utm_source: utm.utm_source || '', utm_campaign: utm.utm_campaign || '' });
      if (pixelEvent) pixel(pixelEvent);
      if (/REPLACE_ME/.test(form.action)) { mailto(); return; }
      var next = form.querySelector('[name="_next"]');
      var btn = form.querySelector('[type="submit"]');
      if (btn) btn.disabled = true;
      fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) })
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          try { sessionStorage.setItem('lhl_prefill', JSON.stringify({ name: f('name'), email: f('email') })); } catch (e) {}
          location.href = next ? next.value.replace(/^https?:\/\/[^/]+/, '') : '/';
        })
        .catch(function () { if (btn) btn.disabled = false; mailto(); });
    });
  }

  wireForm(document.getElementById('memo-form'), 'investor_memo_request', 'Investor memo request', [
    ['Name', 'name'], ['Email', 'email'], ['Accredited', 'accredited'], ['Check size', 'check_size'], ['Heard via', 'source'], ['Message', 'message']
  ]);

  wireForm(document.getElementById('audit-form'), 'audit_form_submit', 'Systems Audit request', [
    ['Name', 'name'], ['Business', 'business_name'], ['Industry', 'industry'], ['Employees', 'employees'], ['Annual revenue', 'revenue'],
    ['Biggest headache', 'headache'], ['Phone', 'phone'], ['Email', 'email'], ['Text consent', 'sms_consent'], ['Heard via', 'source'],
    ['UTM source', 'utm_source'], ['UTM medium', 'utm_medium'], ['UTM campaign', 'utm_campaign'], ['UTM content', 'utm_content']
  ], 'Lead');
})();

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

  // Conversion: calls booked
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="cal.com"]');
    if (a) track('book_call_click', { event_category: 'conversion', event_label: a.textContent.trim(), transport_type: 'beacon' });
  });

  // Investor memo form
  var form = document.getElementById('memo-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      if (form.querySelector('[name="company_website"]').value) { e.preventDefault(); return; } // honeypot
      track('investor_memo_request', { event_category: 'conversion', accredited: form.querySelector('[name="accredited"]:checked') ? form.querySelector('[name="accredited"]:checked').value : '' });

      // Until a Formspree endpoint is configured, fall back to a prefilled email.
      if (/REPLACE_ME/.test(form.action)) {
        e.preventDefault();
        var f = function (n) { var el = form.querySelector('[name="' + n + '"]:checked, [name="' + n + '"]'); return el ? el.value : ''; };
        var body = [
          'Name: ' + f('name'),
          'Email: ' + f('email'),
          'Accredited: ' + f('accredited'),
          'Check size: ' + f('check_size'),
          'Heard via: ' + f('source'),
          '',
          f('message')
        ].join('\n');
        location.href = 'mailto:contact@littlehammerlabs.com?subject=' + encodeURIComponent('Investor memo request: ' + f('name')) + '&body=' + encodeURIComponent(body);
      }
    });
  }
})();

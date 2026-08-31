document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('surveyForm');
  const progress = document.getElementById('progress');
  const sendBtn = document.getElementById('sendBtn');
  const consent = document.getElementById('consent');

  function getRequiredElements() {
    return Array.from(form.querySelectorAll('[required]'));
  }

  function isFilled(el) {
    if (!el) return false;
    if (el.type === 'checkbox' || el.type === 'radio') return el.checked;
    return String(el.value).trim() !== '';
  }

  function updateProgress() {
    const required = getRequiredElements();
    const total = required.length || 1;
    const answered = required.reduce((n, el) => n + (isFilled(el) ? 1 : 0), 0);
    const percent = Math.round((answered / total) * 100);
    progress.value = percent;
    sendBtn.disabled = !(form.checkValidity() && consent.checked);
  }

  function gatherResponses() {
    const entries = [];
    const elements = Array.from(form.elements).filter(e => e.name && !e.disabled);

    const grouped = {};
    elements.forEach(el => {
      const label = el.dataset.label || el.name;
      if (el.type === 'checkbox') {
        if (!grouped[label]) grouped[label] = [];
        if (el.checked) grouped[label].push(el.value || 'on');
      } else if (el.type === 'radio') {
        if (el.checked) grouped[label] = el.value;
      } else if (el.tagName.toLowerCase() === 'select' || el.type === 'text' || el.tagName.toLowerCase() === 'textarea' || el.type === 'number') {
        if (el.value.trim() !== '') grouped[label] = el.value.trim();
      }
    });

    Object.keys(grouped).forEach(k => {
      const v = Array.isArray(grouped[k]) ? grouped[k].join(', ') : grouped[k];
      entries.push(`${k}: ${v}`);
    });
    return entries.join('\n');
  }

  function sendViaWhatsApp(text) {
    const encoded = encodeURIComponent(text);
    // Try native deep link first (mobile), fallback to web URL
    const phoneEl = document.getElementById('targetPhone');
    const phone = phoneEl && phoneEl.value.trim();
    // Sanitize phone: allow + and digits only
    const phoneSanitized = phone ? phone.replace(/[^+\d]/g, '') : '';
    const phoneParam = phoneSanitized ? `&phone=${encodeURIComponent(phoneSanitized)}` : '';
    const native = `whatsapp://send?text=${encoded}${phoneParam}`;
    const web = phoneSanitized
      ? `https://api.whatsapp.com/send?phone=${encodeURIComponent(phoneSanitized)}&text=${encoded}`
      : `https://api.whatsapp.com/send?text=${encoded}`;
    // Attempt to open native link; if it fails, open web URL
    window.location.href = native;
    setTimeout(() => window.open(web, '_blank'), 600);
  }

  sendBtn.addEventListener('click', () => {
    if (!form.reportValidity()) return;
    const header = 'Financial & Ministry Survey Responses';
    const body = gatherResponses();
    const footer = '\n--\nSent via online questionnaire';
    const message = `${header}\n\n${body}${footer}`;
    // Track submission event (if analytics is configured)
    try {
      trackEvent('survey_submit', { method: 'whatsapp', percent: progress.value });
    } catch (e) { /* ignore */ }
    sendViaWhatsApp(message);
  });

  // Simple analytics helper: calls GA4 `gtag` if present and Plausible if present
  function trackEvent(name, params) {
    // GA4
    if (window.gtag) {
      window.gtag('event', name, params || {});
    }
    // Plausible
    if (window.plausible) {
      // plausible expects (eventName, options)
      try { window.plausible(name, { props: params || {} }); } catch (e) {}
    }
  }

  form.addEventListener('input', updateProgress);
  form.addEventListener('change', updateProgress);
  document.getElementById('resetBtn').addEventListener('click', () => setTimeout(updateProgress, 50));

  // initialize
  updateProgress();
  // track page view
  try { trackEvent('page_view'); } catch (e) {}
});

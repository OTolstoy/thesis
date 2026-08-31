document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('surveyForm');
  const progress = document.getElementById('progress');
  const progressText = document.getElementById('progressText');
  const submitBtn = document.getElementById('submitBtn');
  const consent = document.getElementById('consent');

  // Get all required form elements
  function getRequiredElements() {
    return Array.from(form.querySelectorAll('[required]'));
  }

  // Check if an element is filled
  function isFilled(el) {
    if (!el) return false;
    if (el.type === 'checkbox' || el.type === 'radio') return el.checked;
    if (el.type === 'email' || el.type === 'tel') return String(el.value).trim() !== '';
    return String(el.value).trim() !== '';
  }

  // Update progress bar
  function updateProgress() {
    const required = getRequiredElements();
    const total = required.length || 1;
    const answered = required.reduce((n, el) => n + (isFilled(el) ? 1 : 0), 0);
    const percent = Math.round((answered / total) * 100);
    
    progress.value = percent;
    progressText.textContent = `${percent}% Complete`;
    
    // Enable submit button only if all required fields filled and consent checked
    submitBtn.disabled = !(form.checkValidity() && consent.checked);
  }

  // Attach change listeners to all form elements
  form.addEventListener('change', updateProgress);
  form.addEventListener('input', updateProgress);
  consent.addEventListener('change', updateProgress);

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate consent
    if (!consent.checked) {
      alert('Please check the consent box before submitting.');
      return;
    }

    // Validate all required fields
    if (!form.checkValidity()) {
      alert('Please fill out all required fields before submitting.');
      return;
    }

    // Disable submit button to prevent double submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    try {
      // Formspree will handle the submission
      // The form action is already set to the Formspree endpoint
      form.submit();

      // Show success message
      setTimeout(() => {
        alert('Thank you! Your responses have been submitted successfully.\n\nYour contribution to this research is greatly appreciated.');
        form.reset();
        updateProgress();
        submitBtn.textContent = 'Submit Survey Response';
        submitBtn.disabled = true;
      }, 1000);
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting the form. Please try again.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Survey Response';
    }
  });

  // Initialize progress on page load
  updateProgress();
});

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

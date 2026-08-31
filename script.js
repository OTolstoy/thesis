document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('surveyForm');
  const progress = document.getElementById('progress');
  const progressText = document.getElementById('progressText');
  const submitBtn = document.getElementById('submitBtn');
  const consent = document.getElementById('consent');

  if (!form) {
    console.error('Survey form not found. Make sure the form id matches the script lookup.');
    return;
  }

  const formHashId = form.dataset.formId || (form.action.match(/\/f\/([^/?]+)/) || [])[1] || '';

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
  form.addEventListener('submit', (e) => {
    // Validate Formspree configuration before submission
    if (!formHashId || formHashId === 'YOUR_FORM_ID' || formHashId === 'myeykrgq') {
      e.preventDefault();
      alert('Form not found. Please check the Formspree hashid in index.html and replace YOUR_FORM_ID with your valid form ID.');
      return;
    }

    // Validate consent
    if (!consent.checked) {
      e.preventDefault();
      alert('Please check the consent box before submitting.');
      return;
    }

    // Validate all required fields
    if (!form.checkValidity()) {
      e.preventDefault();
      alert('Please fill out all required fields before submitting.');
      return;
    }

    // Disable submit button to prevent double submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    // Form will naturally submit to Formspree via POST action
    // Formspree will send you an email with the responses
  });

  // Initialize progress on page load
  updateProgress();
});

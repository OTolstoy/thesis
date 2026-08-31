# Kingdom Financial Stewardship & Voluntary Ministry Participation Questionnaire

A comprehensive, mobile-first HTML questionnaire designed to collect responses on financial health, planning behaviour, investment practices, debt burden, and voluntary ministry participation among Christians in selected churches in Kakamega County, Western Kenya.

## Overview

This questionnaire examines the relationship between:
- Personal financial health
- Financial planning behaviour
- Investment behaviour
- Debt burden
- Christians' capacity, willingness, and actual participation in voluntary ministry

## Files

- [index.html](index.html) — Complete questionnaire form (mobile-responsive, 12pt font)
- [styles.css](styles.css) — Professional, responsive styling
- [script.js](script.js) — Form validation, progress tracking, and email submission

## Setup & Configuration

### 1. Enable Email Submission with Formspree

This form uses **Formspree** to collect and email survey responses to you.

**Quick Setup (5 minutes):**

1. Go to [https://formspree.io](https://formspree.io)
2. Sign up for a free account
3. Create a new form project
4. Copy your **Form ID** (format: `abc123def456`)
5. Open `index.html` and find the form tag:
   ```html
   <form id="surveyForm" method="POST" action="https://formspree.io/f/YOUR_FORM_ID" data-form-id="YOUR_FORM_ID">
   ```
6. Replace `YOUR_FORM_ID` with your actual Formspree form ID from your Formspree dashboard
7. **Confirm your email** in the Formspree confirmation email

Now when respondents submit the form, you'll receive their responses via email automatically!

### 2. Host on GitHub Pages

Your questionnaire is already pushed to GitHub and ready to be hosted:

1. Go to your GitHub repository: `https://github.com/OTolstoy/thesis`
2. Click **Settings** → **Pages**
3. Under "Build and deployment", select **main** branch
4. Click **Save**
5. Your site will be live at: `https://OTolstoy.github.io/thesis/`

(Or change the repository settings to enable Pages if not already enabled)

## Questionnaire Sections

- **Section A**: Respondent Profile (age, gender, income source, church membership)
- **Section B**: Personal Financial Health (7 Likert-scale items)
- **Section C**: Financial Planning Behaviour (budgeting, monitoring, savings)
- **Section D**: Investment & Wealth-Creation Behaviour (savings vehicles, investment decisions)
- **Section E**: Debt Burden (outstanding debt, debt types, financial stress)
- **Section F**: Capacity to Participate in Voluntary Ministry (time, costs, employment limits)
- **Section G**: Willingness to Participate in Voluntary Ministry (intentions, flexibility)
- **Section H**: Actual Participation & Financial Influence (recent changes, contributing factors)
- **Section I**: Practical Mechanisms & Possible Solutions (financial factors, initiatives, recommendations)

**Contact Information** (optional): Email and phone for follow-up

## Features

✅ **Mobile-first responsive design** — works perfectly on phones, tablets, and desktops  
✅ **Progress tracking** — visual progress bar shows completion percentage  
✅ **Form validation** — ensures all required fields are completed before submission  
✅ **Professional styling** — clean, modern design with accessible controls  
✅ **Email submission** — responses automatically emailed via Formspree  
✅ **Privacy-focused** — no data stored on external servers; direct email only  
✅ **Accessibility** — proper labels, semantic HTML, keyboard navigation  

## Testing Locally

1. Open `index.html` in your browser to review the form layout
2. Test on a mobile device by accessing the GitHub Pages URL

## Privacy & Consent

- Respondents are asked to consent before submitting
- Responses are sent directly via email (Formspree)
- No data is stored on this website server
- All information is treated confidentially and used only for academic purposes
- No names are recorded (anonymous)

## Customization

To modify questions or styling:

- **Add/remove questions**: Edit question groups in `index.html`
- **Change styling**: Modify color variables and styles in `styles.css` (see `:root` variables)
- **Update title/branding**: Edit the header in `index.html`

## Deployment Checklist

- [ ] Replace `YOUR_FORM_ID` in index.html with your Formspree ID
- [ ] Confirm your email with Formspree
- [ ] Enable GitHub Pages in repository settings
- [ ] Test the form at `https://OTolstoy.github.io/thesis/`
- [ ] Share the link with respondents

## Support

For issues with:
- **Form submission**: Check Formspree account settings and confirm your email
- **GitHub Pages**: Go to Settings → Pages and ensure main branch is selected
- **Form styling/logic**: Review index.html, styles.css, and script.js

---

**Study Information**  
Study Area: Selected Churches in Kakamega County, Western Kenya  
Purpose: Research on Kingdom Financial Stewardship and Voluntary Ministry Participation  
Last Updated: August 2026

Local testing

1. Open `index.html` in a browser on desktop to review layout.
2. On a mobile device, host the files (or use GitHub Pages) and open the URL in the mobile browser to test the WhatsApp flow.

To test the optional phone targeting: enter a phone in E.164 format (e.g. +15551234567) in the "Target WhatsApp phone number" field, complete required questions, and click "Send Response via WhatsApp". The web fallback will include the `phone` parameter so recipients are preselected when possible.

Privacy and consent

- The site asks the user to consent before sending.
- Responses are not stored by this page — they are assembled on the client and sent via the user's WhatsApp client.

Customization

- To target a specific phone number, modify `script.js` to open `https://api.whatsapp.com/send?phone=<E.164>&text=...`.
- Add any analytics or server-side storage only after updating the privacy statement and obtaining explicit consent.

Analytics

- The project includes optional hooks for analytics. By default analytics are disabled. Two common options:

	1. Google Analytics (GA4): open `index.html` and replace the placeholder `MEASUREMENT_ID` in the commented GA4 snippet, then uncomment the snippet. This will load `gtag` and the client-side `trackEvent` calls in `script.js` will send events such as `page_view` and `survey_submit`.

	2. Plausible (privacy-friendly): add your domain to the Plausible script tag in `index.html` (replace `your-domain.com`) and uncomment it. The same `trackEvent` calls will attempt to call `plausible()` when available.

- Privacy: enabling analytics may affect user privacy. Update the privacy statement in `index.html` to reflect the analytics provider you choose and obtain any required consents for your jurisdiction.


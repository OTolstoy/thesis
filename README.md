# WhatsApp-friendly Financial Questionnaire

This is a mobile-first HTML questionnaire designed to collect responses and let users share them via WhatsApp from their device.

Files added:

- [index.html](index.html) — the form (mobile-first, 12pt font)
- [styles.css](styles.css) — separated CSS
- [script.js](script.js) — validation, progress indicator, and WhatsApp message builder

Notes about hosting and WhatsApp

- WhatsApp cannot host HTML content itself. Host this site on any web server (GitHub Pages recommended) and share the HTTPS link.
- The form uses a WhatsApp deep link (`whatsapp://send?text=...`) and falls back to the web API (`https://api.whatsapp.com/send?text=...`). On mobile devices the native app will be used; on desktop the web client opens.

- New: Optional phone-number targeting — enter an E.164 phone number in the form to open WhatsApp pre-addressed to that number (leave empty to let the user pick a contact).

Hosting on GitHub Pages (quick steps)

1. Create a new Git repository and add these files.
2. Push to GitHub.
3. Enable GitHub Pages from repository Settings → Pages and select the `main` branch (or `gh-pages`).
4. The site will be available at `https://<your-username>.github.io/<repo>/`.

Automated steps (local) — create repo, push, and enable Pages

Run these commands in the project folder (replace placeholders):

```bash
git init
git add .
git commit -m "Add WhatsApp-friendly questionnaire"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

If you have the GitHub CLI (`gh`) installed you can create and push a repo with:

```bash
gh repo create <your-username>/<repo> --public --source=. --remote=origin --push
```

Then enable Pages in the repository settings or via `gh`:

```bash
gh api repos/:owner/:repo/pages -X POST -f source=main
```

Local testing

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


# Prompt: Generate PDF Lead Magnet — Authentication Rate Playbook

## What to build

A polished, well-formatted PDF version of the Authentication Rate Playbook for use as a downloadable lead magnet. The content source is the Astro page at `src/pages/publisher-authentication-playbook.astro`. Extract the content from that file and produce a standalone PDF.

## Output

- File: `public/downloads/authentication-rate-playbook.pdf`
- Also produce: `public/downloads/authentication-rate-playbook.html` (the intermediate HTML used to render the PDF — keep it, it's useful for debugging and re-rendering)

## Approach

Use Puppeteer to render an HTML file to PDF. Install it if not already present:

```
npm install puppeteer
```

Write a Node.js script at `scripts/generate-pdf.mjs` that:
1. Reads the HTML template (defined below)
2. Launches a headless Chromium browser via Puppeteer
3. Renders the HTML
4. Exports to PDF with the settings below
5. Saves to `public/downloads/authentication-rate-playbook.pdf`

Run the script with `node scripts/generate-pdf.mjs`.

## PDF settings

```js
await page.pdf({
  path: 'public/downloads/authentication-rate-playbook.pdf',
  format: 'A4',
  printBackground: true,
  margin: { top: '20mm', bottom: '20mm', left: '18mm', right: '18mm' },
});
```

## Design spec

Match the Clearpath Analytics visual identity:

```
Background:   #FAF7F2  (--cream)
Paper:        #FFFDF9  (--paper)
Ink:          #1C1917
Ink mid:      rgba(28,25,23,0.65)
Amber:        #D97706
Border:       rgba(28,25,23,0.12)

Fonts (load from Google Fonts in the HTML):
  Headings:   Lora (serif), weight 600
  Body:       DM Sans, weight 400/500
  Accent:     Caveat (for section numbers / pull quotes)
```

## HTML structure

The PDF HTML should have these sections in order:

### Cover page
- Clearpath Analytics wordmark (top left, small)
- Title: "The Authentication Rate Playbook"
- Subtitle: "How Publishers Turn Login Into Revenue"
- Three stat callouts in a row: 3–5× CPM premium / 8–15% average auth rate / 35% direct IO threshold
- Tagline: "By Angshuman Rudra, Clearpath Analytics"
- URL: clearpath-analytics.vercel.app
- Full-page cream background, amber accent on the title

### Content pages (6 parts)
Extract and format the six sections from the Astro file:

1. The CPM Math — What Authentication Rate Actually Does to Revenue
2. What Authentication Rate Actually Means — and How to Measure It
3. Five Mechanisms to Increase Authentication Rate
4. The Registration Wall vs. Hard Paywall Decision Framework
5. Realistic Targets by Publisher Type
6. Measuring the Lift — What to Track and When

Plus the one-paragraph summary at the end.

### Back cover / CTA page
- "Work with Clearpath Analytics"
- Two lines: website + email (angshuman.rudra@gmail.com)
- Amber accent, dark background (#1C1917)

## Formatting rules

- Section numbers use Caveat font, amber color, large (28px)
- H2 headings: Lora, 22px, ink color
- H3 headings: DM Sans, 16px, weight 600
- Body text: DM Sans, 14px, line-height 1.8, ink-mid color
- Tables: full width, alternating row shading (cream-dark on even rows), amber header background
- Pull quotes: left border 3px amber, Lora italic, 18px
- Mechanism cards: light border, number in amber Caveat font, card background #FFFDF9
- Page numbers: bottom center, 11px, ink-dim
- Page break before each Part heading
- Do not paginate the cover or back cover

## After generating

1. Verify the PDF opens correctly and all 6 parts render
2. Confirm `public/downloads/authentication-rate-playbook.pdf` exists
3. Add a download link to the playbook page (`src/pages/publisher-authentication-playbook.astro`) — place it in the hero section next to the existing CTA button:
   ```html
   <a href="/downloads/authentication-rate-playbook.pdf" download class="btn-secondary">Download PDF →</a>
   ```
4. Deploy with `vercel --prod`

## Do not

- Do not add any content that isn't in the source Astro file
- Do not change the playbook content — PDF and web versions should be identical in substance
- Do not use wkhtmltopdf or pandoc — Puppeteer only, so the design matches the site exactly

# RouteCraft Systems website

Production marketing website for RouteCraft Systems, a managed AI front desk and web development business serving independent service companies.

## Pages

- Home
- Services and pricing
- AI Voice Agents
- Web Development
- About
- Contact / qualified inquiry
- Privacy Policy
- Website Terms

## Build

The site is dependency-free static HTML/CSS/JavaScript. Python 3.8+ is only needed to regenerate the HTML pages:

```bash
python build.py
```

Preview locally:

```bash
python -m http.server 8765
```

## Deployment

GitHub Pages deploys the `main` branch through `.github/workflows/pages.yml`.

Production URL: <https://praneethpogula09.github.io/routecraft-systems/>

## Lead capture

The inquiry form posts to FormSubmit and requires one-time recipient activation. After activation, submit a second test inquiry to verify inbox delivery.

## Analytics

Simple Analytics records privacy-friendly pageviews and named conversion events without cookies. Event names are defined through `data-event` attributes and `assets/site.js`.

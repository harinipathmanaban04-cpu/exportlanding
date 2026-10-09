# Master Export Pro — React landing page

This is a Vite + React landing page for Master Export Pro.

## Run locally

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The production build is generated in `dist/`. It is intentionally excluded from Git; Vercel builds it during deployment.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Leave the project root as the repository root. Vercel is configured to run `npm run build` and publish `dist/`.
4. Deploy. Future pushes to the connected branch will trigger deployments automatically.

The `vercel.json` file also routes application paths to the landing page, so direct visits to paths such as `/login` load the app.

## Structure

```
src/
  main.jsx            entry point
  App.jsx             page layout, demo-dialog + tour wiring
  index.css           all original styles, unchanged
  assets/logo.png     logo (was base64 inside the HTML)
  hooks/              useActiveSection, useReducedMotion
  components/
    Navbar.jsx        sticky nav, mobile menu, active-link highlighting
    Hero.jsx          hero + interactive app mock-up and guided tour
    Strip.jsx         "at a glance" counters (CountUp)
    About / Products / Services / Markets / HowItWorks / Contact / Footer
    DemoDialog.jsx    "Book a free demo" modal (opens a mailto: link)
    Reveal.jsx        scroll-reveal wrapper      Tile.jsx  spotlight card
    CountUp.jsx       animated number            icons.jsx inline SVG icons
public/favicon.png
```

## Before publishing

- Set the demo request email in `src/components/DemoDialog.jsx` and update the contact section in `src/components/Contact.jsx`.
- Sign-in links currently point to `/login`; connect them to your app when it is available.
- Update the tour copy in the `STEPS` array in `src/components/Hero.jsx`.

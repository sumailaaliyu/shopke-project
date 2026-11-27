# Shopke

Shopke lets small and mid-sized Nigerian businesses open an online store, add products, take payments and share the store link on WhatsApp and Instagram. This is a React app built from the design artboards, with mock data and no backend.

## Tech stack

- React 19
- Vite
- React Router (`react-router-dom`)
- Oxlint for linting
- Plain CSS with shared design tokens 

## Getting started

You need Node.js (LTS) and Git.

```bash
git clone https://github.com/sumailaaliyu/shopke-project.git
cd shopke
git fetch origin
git switch development
npm install
npm run dev
```

Open the address Vite prints, usually `http://localhost:5173`.

`react-router-dom` is imported by `main.jsx` and `App.jsx`. If the app fails to start with a missing-module error, run `npm install react-router-dom`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the dev server |
| `npm run build` | Builds the app for production |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs Oxlint |


## Project structure

```
src/
  assets/        Logos and images
  components/
    marketing/   Navbar, Footer, MarketingLayout (Team B)
    dashboard/   DashboardLayout and sidebar (Team D)
    ui/          Shared Button, Input, Card
  data/          Mock data (posts, team, products, orders)
  pages/         One folder per page, with its components beside it
  App.jsx        Route table
  App.css        Shared classes (layout, buttons, cards, forms)
  index.css      Design tokens and reset
  main.jsx       Entry point and router
```

## Design system

Colours, type, spacing and shapes are CSS variables in `src/index.css`. Use them and never hard-code values.

- **Colours:** forest `#14301F`, leaf `#2F6B3F`, marigold `#F2B632`, terracotta `#C8553D`, page background `#F3F6F0`, sage `#DCE8D6`
- **Fonts:** Bricolage Grotesque for headings, DM Sans for body text
- **Shapes:** pill buttons, 18px cards, 12px inputs
- **Shared classes** such as `.section`, `.grid--3`, `.card`, `.btn`, `.chip`, `.input` and `.field` live in `src/App.css`
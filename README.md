# Omprakash Behera — Portfolio

A modern, gamified designer portfolio built with **React + Vite**. Features a dotted cream background, deep neo-brutalist borders, and a vibrant multi-colored component system.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + Vite |
| Styling | CSS Modules + CSS custom properties |
| Fonts | Syne · Space Grotesk · Space Mono (Google Fonts) |
| Animations | Pure CSS keyframes |

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx / .module.css
│   ├── Hero.jsx   / .module.css
│   ├── About.jsx  / .module.css
│   ├── Skills.jsx / .module.css
│   ├── Projects.jsx / .module.css
│   ├── Contact.jsx  / .module.css
│   └── Footer.jsx   / .module.css
├── App.jsx
├── App.css
├── index.css        ← global tokens, .btn, .card utilities
└── main.jsx
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Sections

- **Hero** — Full-height landing with animated status badge, large typographic headline, CTA buttons, and floating skill badges
- **About** — Gamified character card with XP bar, level badge, and toolkit chips
- **Skills** — Four color-coded stat cards (Design · Frontend · Backend · Strategy) with animated progress bars
- **Projects** — 3-column project grid with colored thumbnails, award labels, and tag chips
- **Contact** — Two-column layout with channel cards, availability indicator, and a working form
- **Footer** — Dark footer with social links

---

## Customisation

1. **Personal info** — Update name, bio, and location in `About.jsx` and `Hero.jsx`
2. **Projects** — Edit the `projects` array in `Projects.jsx`
3. **Social links** — Update hrefs in `Footer.jsx`
4. **Colors** — CSS variables in `index.css` (`:root` block)
5. **Fonts** — Swap the Google Fonts `@import` in `index.css`

---

## License

MIT — free to use and adapt for personal portfolios.


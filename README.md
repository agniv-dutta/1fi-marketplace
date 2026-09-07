# 1Fi Marketplace

Shop today, pay later using your mutual funds — a mobile-friendly marketplace with no-cost EMI plans, built with React + TypeScript, Tailwind CSS, and Vite.

---

## 📊 Project Status

**Status: Complete — all core flows implemented**

| Feature | Status |
|---------|--------|
| Product listing & grid | ✅ Implemented |
| Search & filter (category / price / EMI tenure / sort) | ✅ Implemented |
| Product details modal | ✅ Implemented |
| Product specifications | ✅ Implemented |
| Variant selection (color, size, storage) | ✅ Implemented |
| No-cost EMI plan selection with calculations | ✅ Implemented |
| Checkout flow with confirmation | ✅ Implemented |
| Loading states (skeletons) & error states | ✅ Implemented |
| Empty states | ✅ Implemented |
| Responsive design (mobile bottom nav) | ✅ Implemented |

---

## 🧱 Tech Stack

- **React 18** + **TypeScript** (strict mode)
- **Vite** (build tool) + **Tailwind CSS** via **PostCSS**
- **Axios** (API layer with mock-backed services)
- **lucide-react** (icons), **clsx** (class composition)

---

## 📁 Repository Structure

```
1fi-marketplace/
├── frontend/               # React + Vite application
│   ├── src/
│   │   ├── components/     # UI, Common, Marketplace, Shop components
│   │   ├── hooks/          # useProducts, useProductFilters, useEMIPlan
│   │   ├── services/api/   # Axios instance, productApi, emiApi, checkoutApi
│   │   ├── services/mockData/  # Mock products & EMI plan data
│   │   ├── types/          # Product, EMI, common types
│   │   └── utils/          # formatters, validators, constants
│   ├── index.html
│   ├── package.json
│   └── ...
└── docs/                   # Implementation specs, assessment & flow docs
```

---

## 🚀 Getting Started

```bash
cd frontend
npm install
npm run dev
```

Vite serves the app at `http://localhost:5173`.

### Scripts (`frontend/package.json`)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Typecheck (`tsc -b`) then production build |
| `npm run preview` | Preview the production build |
| `npm run check` | TypeScript typecheck only |

---

## 🏗️ Key Architecture

### API & Data Layer (`frontend/src/services/`)
- `productApi` — fetch products with search / filter / sort / pagination, fetch by id, featured products.
- `emiApi` — fetch EMI plans, calculate monthly EMI and totals.
- `checkoutApi` — initiate checkout and return an order confirmation.
- Data is mock-backed today and structured so it can be swapped for real endpoints. Set `VITE_API_BASE_URL` to point at a backend.

### Marketplace Flow
```
Browser → Product card → Product details modal
  ├─ Variant selection (optional)
  ├─ Specifications (optional)
  ├─ No-cost EMI plan selection
  └─ "Select & Proceed" → checkout confirmation & order id
```

---

## 📚 Documentation

The `docs/` folder contains the original setup prompt, implementation roadmap, feature assessment, critical-fix prompts, and user-flow mapping. See `docs/ASSESSMENT_SUMMARY.md` and `docs/Implementation_Assessment_Report.md` for the gap analysis that drove the implementation.

---
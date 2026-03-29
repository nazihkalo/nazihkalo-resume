# Nazih Kalo — Interactive Resume

A personal resume website with interactive statistical simulations running alongside the CV content.

Built with Next.js 14, React, TypeScript, Tailwind CSS, shadcn/ui, and Matter.js. Deployed on Vercel.

## Layout

The page is split into two panels on desktop:

- **Left** — Resume content: work experience with company logos, education, skills, and projects
- **Right** — Scrollable simulation panel with three interactive statistical demonstrations

On smaller screens the simulations are hidden and the resume displays in a standard single-column layout. Print view renders a clean, centered CV with no simulations.

## Statistical Simulations

The right panel contains three interactive simulations that generate real observed data and compare it against theoretical distributions:

### Galton Board (Binomial → Normal)

A physics-based Galton board built with Matter.js. Balls drop through a triangular peg lattice, land in bins, and build up a histogram that converges to a normal distribution via the Central Limit Theorem. Live stats show observed vs theoretical mean and standard deviation.

**Controls:** peg rows, gravity, spawn speed, add balls, reset.

<img width="546" height="587" alt="Screenshot 2026-03-29 at 12 13 17 PM" src="https://github.com/user-attachments/assets/b800fec1-4959-435c-abba-3991b53a47af" />


### Poisson Traffic

Cars spawn on a road according to a Poisson process. Arrivals are counted in fixed time windows and displayed as a histogram with the theoretical Poisson PMF overlaid as a connected dot plot.

**Controls:** lambda (arrival rate), observation window duration, reset.

<img width="555" height="430" alt="Screenshot 2026-03-29 at 12 13 24 PM" src="https://github.com/user-attachments/assets/5f765283-227a-483e-8ce9-6397ca785b51" />


### Exponential Waiting Times

Generates exponentially distributed inter-arrival times and plots them as a histogram with the theoretical exponential PDF curve overlaid. Demonstrates the "most waits are short, long waits are rare" property.

**Controls:** lambda (rate parameter), reset.

<img width="552" height="370" alt="Screenshot 2026-03-29 at 12 13 34 PM" src="https://github.com/user-attachments/assets/35e422bc-019b-4d01-9e3b-8b2f92d61157" />

---

All simulations cap at **5,000 observations** to prevent client-side performance issues. Parameters are adjustable in real time via sliders; changing a parameter resets and restarts the simulation.

## Resume Data

All resume content lives in a single config file: [`src/data/resume-data.tsx`](./src/data/resume-data.tsx). Company logos are stored in [`public/logos/`](./public/logos/).

## Getting Started

```bash
# Install dependencies
yarn install

# Start dev server
yarn dev

# Production build
yarn build && yarn start
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 |
| UI | React 18, TypeScript, Tailwind CSS, shadcn/ui |
| Physics | Matter.js |
| Icons | Custom SVG + Lucide React |
| Deployment | Vercel |

## License

[MIT](https://choosealicense.com/licenses/mit/)

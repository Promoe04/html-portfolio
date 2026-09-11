# Moemen Ghazzawi — Portfolio

A personal portfolio site for M. Moemen Ghazzawi, a second-year Computer Science
student. Built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

## Structure

```
.
├── index.html                Home page — featured projects, skills
├── assets/
│   ├── css/style.css          Shared design system
│   └── js/main.js             Nav toggle, scroll reveal, skill bars
└── public/
    ├── about.html             About page
    └── contact.html           Contact page
```

Featured projects (Tutorly, Tic-Tac-Toe Titan) link out to their own
repositories rather than living in this one.

## Running locally

No build tools required — just serve the folder statically, e.g.:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

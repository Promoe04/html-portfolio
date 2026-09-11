# Moemen Ghazzawi — Portfolio

A personal portfolio site for M. Moemen Ghazzawi, a second-year Computer Science
student. Built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

## Structure

```
.
├── index.html                     Home page
├── assets/
│   ├── css/style.css               Shared design system
│   └── js/
│       ├── main.js                 Nav toggle, scroll reveal, skill bars
│       ├── movie-ranking.js         Movie Ranking project logic
│       └── birthday.js              Birthday Invite countdown + confetti
└── public/
    ├── about.html                  About page
    ├── contact.html                Contact page
    ├── movie-ranking.html          Project: rate & rank movies
    └── birthday-invite.html        Project: animated birthday invite
```

## Running locally

No build tools required — just serve the folder statically, e.g.:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

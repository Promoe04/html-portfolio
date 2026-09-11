// Mobile nav toggle
const navToggle = document.querySelector(".nav__toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });
}

// Scroll reveal — elements are visible by default (see CSS); this only
// arms a fade-in for browsers that support it, and always resolves to
// visible within REVEAL_FALLBACK_MS so content never stays hidden from a
// crawler, print view, or a user who never scrolls.
const REVEAL_FALLBACK_MS = 2500;
const revealEls = document.querySelectorAll(".reveal");

function showReveal(el) {
  el.classList.remove("reveal-armed");
  el.classList.add("is-visible");
}

if ("IntersectionObserver" in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          showReveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => {
    el.classList.add("reveal-armed");
    observer.observe(el);
  });

  setTimeout(() => revealEls.forEach(showReveal), REVEAL_FALLBACK_MS);
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Animate skill bars once visible; same fallback guarantee as above.
const SKILL_FALLBACK_MS = 2500;
const skillBars = document.querySelectorAll(".skill-pill__fill");

function fillSkillBar(bar) {
  bar.style.width = bar.dataset.level;
}

if ("IntersectionObserver" in window && skillBars.length) {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fillSkillBar(entry.target);
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  skillBars.forEach((bar) => {
    bar.style.width = "0%";
    skillObserver.observe(bar);
  });

  setTimeout(() => skillBars.forEach(fillSkillBar), SKILL_FALLBACK_MS);
} else {
  skillBars.forEach(fillSkillBar);
}

// Footer year
const yearEl = document.querySelector("[data-year]");
if (yearEl) yearEl.textContent = new Date().getFullYear();

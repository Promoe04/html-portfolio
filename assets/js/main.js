// Mobile nav toggle
const navToggle = document.querySelector(".nav__toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Animate skill bars once visible
const skillBars = document.querySelectorAll(".skill-pill__fill");

if ("IntersectionObserver" in window && skillBars.length) {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          target.style.width = target.dataset.level;
          skillObserver.unobserve(target);
        }
      });
    },
    { threshold: 0.4 }
  );

  skillBars.forEach((bar) => {
    bar.style.width = "0%";
    skillObserver.observe(bar);
  });
}

// Footer year
const yearEl = document.querySelector("[data-year]");
if (yearEl) yearEl.textContent = new Date().getFullYear();

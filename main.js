const root = document.documentElement;
const modeToggle = document.getElementById("toggle-mode");

const savedMode = localStorage.getItem("portfolio-mode");
if (savedMode) {
  root.dataset.mode = savedMode;
  modeToggle.setAttribute("aria-pressed", savedMode === "dusk");
}

modeToggle.addEventListener("click", () => {
  const nextMode = root.dataset.mode === "dusk" ? "" : "dusk";
  if (nextMode) {
    root.dataset.mode = nextMode;
  } else {
    delete root.dataset.mode;
  }
  localStorage.setItem("portfolio-mode", nextMode || "light");
  modeToggle.setAttribute("aria-pressed", nextMode === "dusk");
});

const chips = document.querySelectorAll(".chip[data-filter]");
const cards = document.querySelectorAll(".card[data-category]");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((btn) => btn.classList.remove("is-active"));
    chip.classList.add("is-active");

    const filter = chip.dataset.filter;
    cards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.style.display = show ? "block" : "none";
    });
  });
});

const revealTargets = document.querySelectorAll("section, .card, .skill, .timeline__item");
revealTargets.forEach((el) => el.setAttribute("data-reveal", ""));

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

revealTargets.forEach((el) => observer.observe(el));

const form = document.querySelector(".contact__form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.reset();
  alert("Thanks! Your message is on its way.");
});

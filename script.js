document.getElementById("year").textContent = new Date().getFullYear();

const dashboardData = [
  { readiness: 73, sleep: 99, activity: 95, productivity: 86, emotion: 100, av: 90 },
  { readiness: 67, sleep: 100, activity: 100, productivity: 90, emotion: 100, av: 91 },
  { readiness: 69, sleep: 96, activity: 100, productivity: 83, emotion: 100, av: 90 },
  { readiness: 61, sleep: 98, activity: 100, productivity: 88, emotion: 100, av: 89 },
  { readiness: 75, sleep: 91, activity: 100, productivity: 81, emotion: 100, av: 89 },
  { readiness: 59, sleep: 98, activity: 100, productivity: 88, emotion: 100, av: 89 },
  { readiness: 81, sleep: 94, activity: 100, productivity: 75, emotion: 100, av: 90 },
  { readiness: 91, sleep: 100, activity: 100, productivity: 88, emotion: 100, av: 96 },
  { readiness: 69, sleep: 96, activity: 100, productivity: 91, emotion: 100, av: 91 },
  { readiness: 76, sleep: 89, activity: 100, productivity: 82, emotion: 100, av: 90 },
  { readiness: 56, sleep: 98, activity: 100, productivity: 95, emotion: 100, av: 90 },
  { readiness: 66, sleep: 93, activity: 100, productivity: 91, emotion: 100, av: 90 },
  { readiness: 66, sleep: 98, activity: 100, productivity: 85, emotion: 100, av: 90 },
  { readiness: 95, sleep: 87, activity: 100, productivity: 85, emotion: 100, av: 93 },
  { readiness: 75, sleep: 94, activity: 100, productivity: 90, emotion: 100, av: 92 },
  { readiness: 84, sleep: 91, activity: 100, productivity: 80, emotion: 100, av: 91 },
  { readiness: 82, sleep: 99, activity: 84, productivity: 86, emotion: 100, av: 90 },
  { readiness: 72, sleep: 93, activity: 100, productivity: 84, emotion: 100, av: 90 },
  { readiness: 83, sleep: 94, activity: 100, productivity: 90, emotion: 100, av: 93 },
  { readiness: 77, sleep: 98, activity: 100, productivity: 80, emotion: 100, av: 91 },
  { readiness: 65, sleep: 94, activity: 100, productivity: 96, emotion: 100, av: 91 },
  { readiness: 67, sleep: 97, activity: 100, productivity: 82, emotion: 100, av: 89 },
  { readiness: 65, sleep: 97, activity: 100, productivity: 87, emotion: 100, av: 90 },
  { readiness: 69, sleep: 91, activity: 100, productivity: 89, emotion: 100, av: 90 },
  { readiness: 100, sleep: 91, activity: 100, productivity: 62, emotion: 100, av: 91 },
  { readiness: 74, sleep: 99, activity: 100, productivity: 89, emotion: 100, av: 93 },
  { readiness: 83, sleep: 93, activity: 100, productivity: 82, emotion: 100, av: 92 },
  { readiness: 70, sleep: 98, activity: 100, productivity: 82, emotion: 100, av: 90 },
  { readiness: 63, sleep: 100, activity: 100, productivity: 95, emotion: 100, av: 92 },
  { readiness: 77, sleep: 96, activity: 100, productivity: 88, emotion: 100, av: 92 },
];

function renderDashboard() {
  const dayIndex = Math.floor(Date.now() / 86400000) % dashboardData.length;
  const prevIndex = (dayIndex - 1 + dashboardData.length) % dashboardData.length;
  const today = dashboardData[dayIndex];
  const prev = dashboardData[prevIndex];
  const delta = today.av - prev.av;

  const tier = today.av >= 80 ? "Diamond Tier" : today.av >= 70 ? "Gold Tier" : "Bronze Tier";

  document.getElementById("dash-score").textContent = today.av;
  document.getElementById("dash-date").textContent = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  document.getElementById("dash-tier").textContent = tier;
  document.getElementById("dash-delta").textContent = delta === 0 ? "— 0" : delta > 0 ? `↑ ${delta}` : `↓ ${Math.abs(delta)}`;

  ["readiness", "sleep", "activity", "productivity", "emotion"].forEach((key) => {
    const bar = document.getElementById(`dash-bar-${key}`);
    bar.style.height = `${today[key]}%`;
    bar.textContent = today[key];
  });
}

renderDashboard();

(function () {
  const floatingNav = document.getElementById("floating-nav");
  const heroNav = document.querySelector(".hero nav");
  if (!floatingNav || !heroNav) return;

  let lastScrollY = window.scrollY;

  function updateNav() {
    const currentScrollY = window.scrollY;
    const scrollingUp = currentScrollY < lastScrollY;
    const heroNavVisible = heroNav.getBoundingClientRect().bottom > 0;

    if (scrollingUp && !heroNavVisible) {
      floatingNav.classList.add("visible");
    } else if (!scrollingUp || heroNavVisible) {
      floatingNav.classList.remove("visible");
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", updateNav, { passive: true });

  floatingNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => floatingNav.classList.remove("visible"));
  });
})();

(function () {
  const modal = document.getElementById("pdf-modal");
  const frame = document.getElementById("pdf-modal-frame");
  const title = document.getElementById("pdf-modal-title");
  const triggers = document.querySelectorAll("[data-pdf-modal]");
  if (!modal || !frame || !triggers.length) return;

  function openModal(href, label) {
    frame.src = href;
    title.textContent = label || "";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    frame.src = "";
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(trigger.getAttribute("href"), trigger.dataset.pdfModal);
    });
  });

  modal.querySelectorAll("[data-pdf-close]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
})();

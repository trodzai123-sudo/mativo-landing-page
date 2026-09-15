const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
const menuLinks = menu ? [...menu.querySelectorAll("a")] : [];

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

const closeMenu = () => {
  if (!menu || !menuToggle) return;
  menu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Mở menu");
  document.body.classList.remove("menu-open");
};

menuToggle?.addEventListener("click", () => {
  if (!menu) return;
  const willOpen = !menu.classList.contains("is-open");
  menu.classList.toggle("is-open", willOpen);
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  menuToggle.setAttribute("aria-label", willOpen ? "Đóng menu" : "Mở menu");
  document.body.classList.toggle("menu-open", willOpen);
});

menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 920) closeMenu();
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const runtime = document.querySelector("[data-runtime]");

if (runtime) {
  const buttons = [...runtime.querySelectorAll("[data-voltage]")];
  const voltageOutput = runtime.querySelector("[data-voltage-output]");
  const hoursOutput = runtime.querySelector("[data-hours-output]");
  const ring = runtime.querySelector("[data-runtime-ring]");

  const updateRuntime = (button) => {
    const voltage = button.dataset.voltage;
    const hours = button.dataset.hours;
    const progress = Math.min((Number(hours) / 20) * 100, 100);

    buttons.forEach((item) => item.setAttribute("aria-selected", String(item === button)));
    if (voltageOutput) voltageOutput.textContent = voltage;
    if (hoursOutput) hoursOutput.textContent = hours.replace(".", ",");
    if (ring) ring.style.setProperty("--progress", `${progress}%`);
  };

  buttons.forEach((button) => button.addEventListener("click", () => updateRuntime(button)));
}

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();

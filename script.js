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

const productGalleries = document.querySelectorAll("[data-product-gallery]");

productGalleries.forEach((productGallery) => {
  const galleryButtons = [...productGallery.querySelectorAll("[data-gallery-src]")];
  const galleryImage = productGallery.querySelector("[data-gallery-main]");
  const galleryTitle = productGallery.querySelector("[data-gallery-title]");
  const galleryDescription = productGallery.querySelector("[data-gallery-description]");
  const galleryIndex = productGallery.querySelector("[data-gallery-index]");
  const galleryKicker = productGallery.querySelector(".gallery-copy .mini-label");
  const galleryModel = productGallery.dataset.galleryModel || "sản phẩm";

  const showGalleryItem = (button) => {
    if (!galleryImage || button.classList.contains("is-active")) return;

    galleryButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
      item.tabIndex = isActive ? 0 : -1;
    });

    const applyImage = () => {
      galleryImage.src = button.dataset.gallerySrc;
      galleryImage.alt = button.dataset.galleryAlt || `Hình ảnh MATIVO ${galleryModel}`;
      if (galleryTitle) galleryTitle.textContent = button.dataset.galleryTitle;
      if (galleryDescription) galleryDescription.textContent = button.dataset.galleryDescription;
      if (galleryIndex) galleryIndex.textContent = button.dataset.galleryNumber;
      if (galleryKicker) galleryKicker.textContent = `GÓC NHÌN ${button.dataset.galleryNumber}`;
      requestAnimationFrame(() => galleryImage.classList.remove("is-changing"));
    };

    galleryImage.classList.add("is-changing");
    const preloader = new Image();
    preloader.onload = applyImage;
    preloader.onerror = applyImage;
    preloader.src = button.dataset.gallerySrc;
  };

  galleryButtons.forEach((button, index) => {
    button.tabIndex = index === 0 ? 0 : -1;
    button.addEventListener("click", () => showGalleryItem(button));
    button.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + direction + galleryButtons.length) % galleryButtons.length;
      galleryButtons[nextIndex].focus();
      showGalleryItem(galleryButtons[nextIndex]);
    });
  });
});

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

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

// Giữ nguyên vị trí khối "Trong hộp có gì?" nhưng hiển thị đủ cả X24 và X36.
const kitSection = document.querySelector("#bo-san-pham");

if (kitSection && !kitSection.querySelector(".kit-showcase-x36")) {
  const heading = kitSection.querySelector("#kit-title");
  const intro = kitSection.querySelector(".section-heading > p:not(.eyebrow)");
  const x24Showcase = kitSection.querySelector(".kit-showcase");
  const navCta = document.querySelector('.main-nav .button[href="#bo-san-pham"]');

  if (heading) heading.textContent = "Bộ sản phẩm MATIVO X24 & X36";
  if (intro) {
    intro.textContent =
      "Hai cấu hình được trình bày riêng để khách dễ chọn: X24 ưu tiên gọn nhẹ, X36 ưu tiên lực gió và hiệu năng cao hơn.";
  }
  if (navCta) navCta.textContent = "Khám phá 2 bộ";

  if (x24Showcase) {
    x24Showcase.classList.add("kit-showcase-x24");

    const x36Showcase = document.createElement("div");
    x36Showcase.className = "kit-showcase kit-showcase-x36 is-visible";
    x36Showcase.innerHTML = `
      <figure class="kit-photo">
        <img
          src="assets/x36-gallery-kit.webp"
          alt="Hai quạt MATIVO X36, pin 36V 24.000mAh, dây kết nối và phụ kiện sạc"
          width="1254"
          height="1254"
          loading="lazy"
        />
        <figcaption>Ảnh minh họa các thành phần của bộ MATIVO X36.</figcaption>
      </figure>

      <div class="kit-content">
        <div class="kit-title-row">
          <div>
            <span class="mini-label">MATIVO</span>
            <h3>X36 Cooling Kit</h3>
          </div>
          <span class="kit-status">Bộ hiệu năng cao</span>
        </div>

        <div class="kit-list" aria-label="Danh sách thành phần MATIVO X36">
          <article class="kit-item">
            <span class="kit-qty">02</span>
            <div><h4>Quạt X36 36V</h4><p>Không chổi than, ổ bi kép, lực gió cao</p></div>
            <span class="included">Có sẵn</span>
          </article>
          <article class="kit-item">
            <span class="kit-qty">01</span>
            <div><h4>Pin X36</h4><p>24.000mAh, màn hình LED hiển thị dung lượng</p></div>
            <span class="included">Có sẵn</span>
          </article>
          <article class="kit-item">
            <span class="kit-qty">01</span>
            <div><h4>Dây chia DC</h4><p>Một nguồn kết nối đồng thời hai quạt</p></div>
            <span class="included">Có sẵn</span>
          </article>
          <article class="kit-item">
            <span class="kit-qty">01</span>
            <div><h4>Cáp sạc</h4><p>Phụ kiện sạc dành cho pin X36</p></div>
            <span class="included">Có sẵn</span>
          </article>
        </div>

        <div class="optional-item">
          <span>+</span>
          <p><strong>Củ sạc nhanh</strong><small>Phụ kiện theo cấu hình đặt hàng</small></p>
          <em>Tùy cấu hình</em>
        </div>
      </div>
    `;

    x24Showcase.insertAdjacentElement("afterend", x36Showcase);
  }

  const style = document.createElement("style");
  style.textContent = `
    #bo-san-pham .kit-showcase + .kit-showcase { margin-top: 28px; }
    #bo-san-pham .kit-showcase-x24 { border-top: 3px solid #1688f5; }
    #bo-san-pham .kit-showcase-x36 { border-top: 3px solid #ff6b21; }
    #bo-san-pham .kit-showcase-x36 .kit-qty { color: #ff6b21; }
    #bo-san-pham .kit-showcase-x36 .kit-status {
      border-color: #ffd4bf;
      color: #b94b18;
      background: #fff3ec;
    }
    @media (max-width: 760px) {
      #bo-san-pham .kit-showcase + .kit-showcase { margin-top: 20px; }
    }
  `;
  document.head.appendChild(style);
}

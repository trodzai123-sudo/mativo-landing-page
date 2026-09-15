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

const productShowcase = document.querySelector("[data-product-showcase]");
const productGallery = productShowcase?.querySelector("[data-product-gallery]");

if (productShowcase && productGallery) {
  const galleryItems = [...productGallery.querySelectorAll("[data-gallery-src]")];
  const modelButtons = [...productShowcase.querySelectorAll("[data-gallery-model-button]")];
  const galleryImage = productGallery.querySelector("[data-gallery-main]");
  const galleryTitle = productGallery.querySelector("[data-gallery-title]");
  const galleryDescription = productGallery.querySelector("[data-gallery-description]");
  const galleryIndex = productGallery.querySelector("[data-gallery-index]");
  const galleryTotal = productGallery.querySelector("[data-gallery-total]");
  const galleryKicker = productGallery.querySelector(".gallery-copy .mini-label");
  const galleryModelLabel = productGallery.querySelector("[data-gallery-model-label]");
  const galleryStage = productGallery.querySelector("[data-gallery-stage]");
  const previousButton = productGallery.querySelector("[data-gallery-prev]");
  const nextButton = productGallery.querySelector("[data-gallery-next]");
  const buyButton = productGallery.querySelector("[data-buy-product]");
  let activeItems = [];
  let activeIndex = 0;
  let imageRequest = 0;
  let touchStart = null;

  const showGalleryItem = (button, animate = true) => {
    if (!button || !galleryImage) return;

    activeIndex = Math.max(activeItems.indexOf(button), 0);
    galleryItems.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
      item.tabIndex = isActive ? 0 : -1;
    });

    const model = button.dataset.galleryItemModel || productGallery.dataset.galleryModel;
    if (galleryTitle) galleryTitle.textContent = button.dataset.galleryTitle;
    if (galleryDescription) galleryDescription.textContent = button.dataset.galleryDescription;
    if (galleryIndex) galleryIndex.textContent = button.dataset.galleryNumber;
    if (galleryKicker) galleryKicker.textContent = `${model} · GÓC NHÌN ${button.dataset.galleryNumber}`;

    const newSource = button.dataset.gallerySrc;
    const requestId = ++imageRequest;
    if (galleryImage.getAttribute("src") === newSource) {
      galleryImage.alt = button.dataset.galleryAlt || `Hình ảnh MATIVO ${model}`;
      galleryImage.classList.remove("is-changing");
      return;
    }

    if (animate) galleryImage.classList.add("is-changing");
    const applyImage = () => {
      if (requestId !== imageRequest) return;
      galleryImage.src = newSource;
      galleryImage.alt = button.dataset.galleryAlt || `Hình ảnh MATIVO ${model}`;
      requestAnimationFrame(() => galleryImage.classList.remove("is-changing"));
    };

    const preloader = new Image();
    preloader.onload = applyImage;
    preloader.onerror = applyImage;
    preloader.src = newSource;
  };

  const moveGallery = (direction) => {
    if (!activeItems.length) return;
    activeIndex = (activeIndex + direction + activeItems.length) % activeItems.length;
    showGalleryItem(activeItems[activeIndex]);
  };

  const selectModel = (model) => {
    productShowcase.dataset.activeModel = model;
    productGallery.dataset.galleryModel = model;
    activeItems = galleryItems.filter((item) => item.dataset.galleryItemModel === model);

    galleryItems.forEach((item) => {
      const belongsToModel = item.dataset.galleryItemModel === model;
      item.hidden = !belongsToModel;
      if (!belongsToModel) {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
        item.tabIndex = -1;
      }
    });

    modelButtons.forEach((button) => {
      const isActive = button.dataset.galleryModelButton === model;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
      button.tabIndex = isActive ? 0 : -1;
    });

    if (galleryModelLabel) galleryModelLabel.textContent = `MATIVO ${model}`;
    if (galleryTotal) galleryTotal.textContent = String(activeItems.length).padStart(2, "0");
    if (buyButton) {
      buyButton.dataset.buyProduct = model;
      buyButton.textContent = `Mua ngay ${model}`;
    }
    showGalleryItem(activeItems[0], false);
  };

  galleryItems.forEach((button) => {
    button.addEventListener("click", () => showGalleryItem(button));
    button.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      moveGallery(event.key === "ArrowRight" ? 1 : -1);
      activeItems[activeIndex]?.focus();
    });
  });

  modelButtons.forEach((button) => {
    button.addEventListener("click", () => selectModel(button.dataset.galleryModelButton));
    button.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const currentIndex = modelButtons.indexOf(button);
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (currentIndex + direction + modelButtons.length) % modelButtons.length;
      modelButtons[nextIndex].focus();
      selectModel(modelButtons[nextIndex].dataset.galleryModelButton);
    });
  });

  previousButton?.addEventListener("click", () => moveGallery(-1));
  nextButton?.addEventListener("click", () => moveGallery(1));

  galleryStage?.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key) || event.target.closest("button")) return;
    event.preventDefault();
    moveGallery(event.key === "ArrowRight" ? 1 : -1);
  });

  galleryStage?.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.changedTouches[0];
      touchStart = { x: touch.clientX, y: touch.clientY };
    },
    { passive: true },
  );

  galleryStage?.addEventListener(
    "touchend",
    (event) => {
      if (!touchStart) return;
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStart.x;
      const deltaY = touch.clientY - touchStart.y;
      touchStart = null;
      if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY) * 1.15) return;
      moveGallery(deltaX < 0 ? 1 : -1);
    },
    { passive: true },
  );

  selectModel(productShowcase.dataset.activeModel || "X36");
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

const quoteForm = document.querySelector("[data-quote-form]");
const productSelect = quoteForm?.querySelector("[data-product-select]");
const formNext = quoteForm?.querySelector("[data-form-next]");
const submitButton = quoteForm?.querySelector("[data-submit-button]");
const formSuccess = quoteForm?.querySelector("[data-form-success]");
const buyerName = quoteForm?.querySelector('input[name="Họ và tên"]');
const quoteBackdrop = document.querySelector("[data-quote-backdrop]");
const quoteFormClose = quoteForm?.querySelector("[data-quote-form-close]");
let activeBuyTrigger = null;

if (quoteForm) {
  if (formNext) {
    const nextUrl = new URL(window.location.href);
    nextUrl.search = "";
    nextUrl.searchParams.set("bao-gia", "da-gui");
    nextUrl.hash = "bao-gia";
    formNext.value = nextUrl.toString();
  }

  const currentUrl = new URL(window.location.href);
  if (currentUrl.searchParams.get("bao-gia") === "da-gui" && formSuccess) {
    formSuccess.hidden = false;
    quoteForm.classList.add("has-success");
    currentUrl.searchParams.delete("bao-gia");
    window.history.replaceState({}, "", `${currentUrl.pathname}${currentUrl.search}#bao-gia`);
  }

  quoteForm.addEventListener("submit", () => {
    if (!quoteForm.checkValidity() || !submitButton) return;
    submitButton.disabled = true;
    submitButton.textContent = "Đang gửi yêu cầu...";
  });

  window.addEventListener("pageshow", () => {
    if (!submitButton) return;
    submitButton.disabled = false;
    submitButton.innerHTML =
      'Gửi yêu cầu báo giá <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" /></svg>';
  });
}

const closeQuoteModal = () => {
  if (!quoteForm?.classList.contains("is-modal")) return;
  quoteForm.classList.remove("is-modal");
  quoteForm.removeAttribute("role");
  quoteForm.removeAttribute("aria-modal");
  quoteForm.removeAttribute("aria-labelledby");
  if (quoteBackdrop) quoteBackdrop.hidden = true;
  document.body.classList.remove("quote-modal-open");
  activeBuyTrigger?.focus();
  activeBuyTrigger = null;
};

const openQuoteModal = (model, trigger) => {
  if (!quoteForm) return;
  activeBuyTrigger = trigger;
  if (productSelect && model) productSelect.value = `MATIVO ${model}`;
  quoteForm.classList.add("is-modal", "is-visible");
  quoteForm.setAttribute("role", "dialog");
  quoteForm.setAttribute("aria-modal", "true");
  quoteForm.setAttribute("aria-labelledby", "quote-form-title");
  if (quoteBackdrop) quoteBackdrop.hidden = false;
  document.body.classList.add("quote-modal-open");
  window.setTimeout(() => buyerName?.focus({ preventScroll: true }), 80);
};

document.querySelectorAll("[data-buy-product]").forEach((button) => {
  button.addEventListener("click", (event) => {
    if (!quoteForm) return;
    event.preventDefault();
    openQuoteModal(button.dataset.buyProduct, button);
  });
});

quoteBackdrop?.addEventListener("click", closeQuoteModal);
quoteFormClose?.addEventListener("click", closeQuoteModal);

document.addEventListener("keydown", (event) => {
  if (!quoteForm?.classList.contains("is-modal")) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeQuoteModal();
    return;
  }
  if (event.key !== "Tab") return;
  const focusable = [...quoteForm.querySelectorAll('button:not([disabled]), input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]')]
    .filter((element) => !element.hidden && element.offsetParent !== null);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

const imageViewer = document.querySelector("[data-image-viewer]");
const viewerImage = imageViewer?.querySelector("[data-viewer-image]");
const viewerCanvas = imageViewer?.querySelector("[data-viewer-canvas]");
const viewerTitle = imageViewer?.querySelector("[data-viewer-title]");
const viewerZoomOutput = imageViewer?.querySelector("[data-viewer-zoom-output]");
const viewerOpenButton = document.querySelector("[data-gallery-zoom-open]");
let viewerScale = 1;
let viewerX = 0;
let viewerY = 0;
let dragStart = null;

const updateViewerTransform = () => {
  if (!viewerImage) return;
  viewerImage.style.transform = `translate3d(${viewerX}px, ${viewerY}px, 0) scale(${viewerScale})`;
  if (viewerZoomOutput) viewerZoomOutput.textContent = `${Math.round(viewerScale * 100)}%`;
  viewerCanvas?.classList.toggle("is-zoomed", viewerScale > 1);
};

const setViewerScale = (nextScale) => {
  viewerScale = Math.min(3, Math.max(0.75, Math.round(nextScale * 100) / 100));
  if (viewerScale <= 1) {
    viewerX = 0;
    viewerY = 0;
  }
  updateViewerTransform();
};

const resetViewer = () => {
  viewerScale = 1;
  viewerX = 0;
  viewerY = 0;
  updateViewerTransform();
};

const closeViewer = () => {
  if (!imageViewer || imageViewer.hidden) return;
  imageViewer.hidden = true;
  document.body.classList.remove("viewer-open");
  resetViewer();
  viewerOpenButton?.focus();
};

viewerOpenButton?.addEventListener("click", () => {
  const galleryImage = productGallery?.querySelector("[data-gallery-main]");
  if (!imageViewer || !viewerImage || !galleryImage) return;
  viewerImage.src = galleryImage.currentSrc || galleryImage.src;
  viewerImage.alt = galleryImage.alt;
  if (viewerTitle) viewerTitle.textContent = galleryImage.alt || "Ảnh sản phẩm MATIVO";
  imageViewer.hidden = false;
  document.body.classList.add("viewer-open");
  resetViewer();
  imageViewer.querySelector("[data-viewer-close]")?.focus();
});

imageViewer?.querySelectorAll("[data-viewer-close]").forEach((button) => {
  button.addEventListener("click", closeViewer);
});

imageViewer?.querySelector("[data-viewer-zoom-in]")?.addEventListener("click", () => setViewerScale(viewerScale + 0.25));
imageViewer?.querySelector("[data-viewer-zoom-out]")?.addEventListener("click", () => setViewerScale(viewerScale - 0.25));
imageViewer?.querySelector("[data-viewer-zoom-reset]")?.addEventListener("click", resetViewer);

viewerCanvas?.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    setViewerScale(viewerScale + (event.deltaY < 0 ? 0.2 : -0.2));
  },
  { passive: false },
);

viewerCanvas?.addEventListener("pointerdown", (event) => {
  if (viewerScale <= 1 || event.button !== 0) return;
  dragStart = { x: event.clientX - viewerX, y: event.clientY - viewerY };
  viewerCanvas.setPointerCapture(event.pointerId);
  viewerCanvas.classList.add("is-dragging");
});

viewerCanvas?.addEventListener("pointermove", (event) => {
  if (!dragStart) return;
  viewerX = event.clientX - dragStart.x;
  viewerY = event.clientY - dragStart.y;
  updateViewerTransform();
});

const stopViewerDrag = (event) => {
  if (!dragStart) return;
  dragStart = null;
  viewerCanvas?.classList.remove("is-dragging");
  if (viewerCanvas?.hasPointerCapture(event.pointerId)) viewerCanvas.releasePointerCapture(event.pointerId);
};

viewerCanvas?.addEventListener("pointerup", stopViewerDrag);
viewerCanvas?.addEventListener("pointercancel", stopViewerDrag);

document.addEventListener("keydown", (event) => {
  if (!imageViewer || imageViewer.hidden) return;
  if (event.key === "Escape") closeViewer();
  if (event.key === "+" || event.key === "=") setViewerScale(viewerScale + 0.25);
  if (event.key === "-") setViewerScale(viewerScale - 0.25);
  if (event.key === "0") resetViewer();
});

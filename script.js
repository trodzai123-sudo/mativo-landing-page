(() => {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const header = document.querySelector('[data-header]');

  if (menuToggle && menu) {
    const closeMenu = () => {
      menu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    };

    menuToggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });

    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  // X36: dùng đúng 4 ảnh sản phẩm người dùng đã cung cấp, không dùng ảnh tự tạo.
  document.querySelectorAll('.hero-sku-x36 img, .product-card-x36 .product-media img').forEach((img) => {
    img.src = 'assets/x36-gallery-3.webp';
    img.alt = 'Trọn bộ MATIVO X36 gồm 2 quạt 36V, pin 24.000mAh và phụ kiện';
  });

  const x36Gallery = document.querySelector('.gallery-grid-x36');
  if (x36Gallery) {
    x36Gallery.innerHTML = `
      <figure class="gallery-card">
        <img src="assets/x36-gallery-1.webp" alt="MATIVO X36 36V gió mạnh và pin 24.000mAh" width="384" height="384" loading="lazy" />
        <figcaption>36V gió mạnh · pin 24.000mAh</figcaption>
      </figure>
      <figure class="gallery-card">
        <img src="assets/x36-gallery-2.webp" alt="Động cơ DC không chổi than 36V MATIVO X36" width="384" height="384" loading="lazy" />
        <figcaption>Động cơ không chổi than 36V</figcaption>
      </figure>
      <figure class="gallery-card">
        <img src="assets/x36-gallery-3.webp" alt="Trọn bộ MATIVO X36 gồm quạt pin và phụ kiện" width="384" height="384" loading="lazy" />
        <figcaption>Trọn bộ X36 · quạt + pin + phụ kiện</figcaption>
      </figure>
      <figure class="gallery-card">
        <img src="assets/x36-gallery-4.webp" alt="Áo điều hòa MATIVO X36 sử dụng thực tế" width="360" height="384" loading="lazy" />
        <figcaption>Ứng dụng thực tế với áo điều hòa</figcaption>
      </figure>`;

    const x36Style = document.createElement('style');
    x36Style.textContent = `
      .gallery-grid-x36{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
      .gallery-grid-x36 figure{min-height:0;aspect-ratio:1/1;background:#eef5fb}
      .gallery-grid-x36 figure img{width:100%;height:100%;object-fit:contain!important;object-position:center!important;transform:none!important;background:#eef5fb}
      @media(max-width:760px){.gallery-grid-x36{grid-template-columns:1fr}.gallery-grid-x36 figure{aspect-ratio:auto}.gallery-grid-x36 figure img{height:auto;aspect-ratio:1/1}}
    `;
    document.head.appendChild(x36Style);
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  document.querySelectorAll('.faq-list details').forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (!detail.open) return;
      document.querySelectorAll('.faq-list details').forEach((other) => {
        if (other !== detail) other.open = false;
      });
    });
  });
})();

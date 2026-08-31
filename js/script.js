if (window.AOS) {
  AOS.init({ duration: 700, once: false, offset: 60 });
}

// Homepage-only: header is transparent over the fullscreen hero video and
// turns solid white once the user scrolls past it.
const siteHeader = document.getElementById("siteHeader");
if (document.body.classList.contains("home") && siteHeader) {
  const heroEl = document.getElementById("home");
  const toggleHeader = () => {
    const threshold = heroEl ? heroEl.offsetHeight - 80 : 400;
    siteHeader.classList.toggle("scrolled", window.scrollY > threshold);
  };
  toggleHeader();
  window.addEventListener("scroll", toggleHeader, { passive: true });
}

// 파트너사 로고: 참고 사이트처럼 한 번에 하나씩 순차적으로 전환
const partnerCarousel = document.getElementById("partnerCarousel");
if (partnerCarousel) {
  const slides = partnerCarousel.querySelectorAll(".partner-slide");
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 2200);
}

const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

navToggle.addEventListener("click", () => {
  const open = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

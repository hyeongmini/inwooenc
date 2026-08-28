if (window.AOS) {
  AOS.init({ duration: 700, once: true, offset: 60 });
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

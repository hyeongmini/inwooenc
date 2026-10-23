(function () {
  var header = document.getElementById('siteHeader');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // 전체화면 메뉴
  var overlay = document.getElementById('menuOverlay');
  var openBtn = document.getElementById('menuBtn');
  var closeBtn = document.getElementById('menuClose');
  function setMenu(open) {
    if (!overlay) return;
    overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (openBtn) openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (openBtn) openBtn.addEventListener('click', function () { setMenu(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  if (overlay) overlay.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

  // 히어로 슬라이더 (자동 전환 + 화살표 + 점)
  var hero = document.getElementById('heroSlider');
  if (hero) {
    var slides = hero.querySelectorAll('.slide');
    var dots = hero.querySelectorAll('.hero-dots button');
    var cur = 0, timer = null;
    function go(n) {
      slides[cur].classList.remove('active');
      if (dots[cur]) dots[cur].classList.remove('on');
      cur = (n + slides.length) % slides.length;
      slides[cur].classList.add('active');
      if (dots[cur]) dots[cur].classList.add('on');
    }
    function auto() { clearInterval(timer); timer = setInterval(function () { go(cur + 1); }, 6500); }
    var prev = hero.querySelector('.hero-arrow.prev'), next = hero.querySelector('.hero-arrow.next');
    if (prev) prev.addEventListener('click', function () { go(cur - 1); auto(); });
    if (next) next.addEventListener('click', function () { go(cur + 1); auto(); });
    dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); auto(); }); });
    go(0); auto();
  }

  // 파트너사 로고 순차 전환
  var pc = document.getElementById('partnerCarousel');
  if (pc) {
    var ps = pc.querySelectorAll('.partner-slide'), pi = 0;
    setInterval(function () { ps[pi].classList.remove('active'); pi = (pi + 1) % ps.length; ps[pi].classList.add('active'); }, 2200);
  }

  // 스크롤 등장 효과
  var items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add('in'); }); }

  // 서브 탭: 현재 구역 표시
  var tabs = document.querySelectorAll('.sub-tabs a[href^="#"]');
  if (tabs.length && 'IntersectionObserver' in window) {
    var map = {};
    tabs.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { tabs.forEach(function (a) { a.classList.remove('on'); }); if (map[e.target.id]) map[e.target.id].classList.add('on'); } });
    }, { rootMargin: '-40% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) spy.observe(el); });
  }
})();

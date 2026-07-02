(function applyInitialTheme() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark-mode');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  const applyTheme = theme => {
    const isDark = theme === 'dark';
    html.classList.toggle('dark-mode', isDark);
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
  };

  const savedTheme = localStorage.getItem('theme');
  const isHtmlDark = html.classList.contains('dark-mode');

  if (savedTheme === 'light') {
    html.classList.remove('dark-mode');
    themeToggle.textContent = '🌙';
  } else if (savedTheme === 'dark' || isHtmlDark) {
    html.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  }

  themeToggle?.addEventListener('click', () => {
    const isDarkMode = html.classList.contains('dark-mode');
    const newTheme = isDarkMode ? 'light' : 'dark';
    applyTheme(newTheme);
  });

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const spans = navToggle?.querySelectorAll('span');

  const animateHamburgerIcon = isOpen => {
    if (!spans) return;
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 4px)' : 'none';
    spans[1].style.opacity = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
  };

  const closeMenu = () => {
    navMenu?.classList.remove('active');
    animateHamburgerIcon(false);
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = navMenu.classList.toggle('active');
      animateHamburgerIcon(isOpen);
    });

    navLinks.forEach(link => link.addEventListener('click', () => closeMenu()));

    document.addEventListener('click', e => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        closeMenu();
      }
    });
  }
});

/* ============================================================
   CASE NioDS — reveal on scroll, barra de progresso e navegação prev/próxima.
   Guardado: só ativa na página do case (existência de .nds-nav / main.project).
   Roda inerte na home e em outras páginas.
   ============================================================ */
(function () {
  var caseRoot = document.querySelector('.project');
  if (!caseRoot) return; // não é a página do case: sai sem fazer nada

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('nds-js');

  var targets = Array.prototype.slice.call(caseRoot.querySelectorAll('section'));
  var contact = document.getElementById('contact');
  if (contact) targets.push(contact);

  // reveal on scroll (com fallback: sem suporte ou sem movimento, mostra tudo)
  var reveals = Array.prototype.slice.call(caseRoot.querySelectorAll('.nds-reveal'));
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) {
      el.classList.add('nds-in');
    });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('nds-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
    setTimeout(function () {
      reveals.forEach(function (el) {
        el.classList.add('nds-in');
      });
    }, 3000);
  }

  // barra de progresso
  var bar = document.getElementById('nds-progress');
  var prevBtn = document.getElementById('nds-prev');
  var nextBtn = document.getElementById('nds-next');

  function currentIndex() {
    var mid = (window.pageYOffset || 0) + window.innerHeight * 0.35;
    var idx = 0;
    for (var i = 0; i < targets.length; i++) {
      if (targets[i].offsetTop <= mid) idx = i;
    }
    return idx;
  }
  function goTo(i) {
    if (i < 0 || i >= targets.length) return;
    targets[i].scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
  function updateNav() {
    var i = currentIndex();
    if (prevBtn) prevBtn.disabled = i <= 0;
    if (nextBtn) nextBtn.disabled = i >= targets.length - 1;
  }
  function onScroll() {
    if (bar) {
      var st = window.pageYOffset || document.documentElement.scrollTop;
      var docH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      bar.style.width = (docH > 0 ? (st / docH) * 100 : 0) + '%';
    }
    updateNav();
  }
  if (prevBtn)
    prevBtn.addEventListener('click', function () {
      goTo(currentIndex() - 1);
    });
  if (nextBtn)
    nextBtn.addEventListener('click', function () {
      goTo(currentIndex() + 1);
    });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateNav, { passive: true });
  onScroll();
})();

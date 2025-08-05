// 🌙 Tema: aplica imediatamente o modo escuro se necessário
(function applyInitialTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.documentElement.classList.add("dark-mode");
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  // ========= 🌗 Alternância de Tema ========= //
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  const updateTheme = (theme) => {
    const isDark = theme === "dark";
    html.classList.toggle("dark-mode", isDark);
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", theme);
  };

  const currentTheme = localStorage.getItem("theme") || "light";
  updateTheme(currentTheme);

  themeToggle?.addEventListener("click", () => {
    const newTheme = html.classList.contains("dark-mode") ? "light" : "dark";
    updateTheme(newTheme);
  });

  // ========= 📱 Menu Mobile ========= //
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const spans = navToggle?.querySelectorAll("span");

  const animateHamburgerIcon = (isOpen) => {
    if (!spans) return;
    spans[0].style.transform = isOpen
      ? "rotate(45deg) translate(5px, 5px)"
      : "none";
    spans[1].style.opacity = isOpen ? "0" : "1";
    spans[2].style.transform = isOpen
      ? "rotate(-45deg) translate(5px, -6px)"
      : "none";
  };

  const closeMenu = () => {
    navMenu?.classList.remove("active");
    animateHamburgerIcon(false);
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = navMenu.classList.toggle("active");
      animateHamburgerIcon(isOpen);
    });

    navLinks.forEach((link) =>
      link.addEventListener("click", () => closeMenu())
    );

    document.addEventListener("click", (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        closeMenu();
      }
    });
  }
});

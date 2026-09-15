(function () {
  "use strict";

  var nav = document.getElementById("siteNav");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  var navLinkItems = document.querySelectorAll("[data-nav]");
  var sections = document.querySelectorAll("main section[id]");
  var yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Sticky nav background on scroll ---------- */
  function onScroll() {
    if (window.scrollY > 12) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  function closeMenu() {
    navToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  function openMenu() {
    navToggle.setAttribute("aria-expanded", "true");
    navLinks.classList.add("is-open");
    navToggle.setAttribute("aria-label", "Close menu");
  }

  navToggle.addEventListener("click", function () {
    var isOpen = navToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinkItems.forEach(function (link) {
    link.addEventListener("click", function () {
      closeMenu();
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  /* ---------- Active section indicator ---------- */
  if ("IntersectionObserver" in window && sections.length) {
    var linkById = {};
    navLinkItems.forEach(function (link) {
      var id = link.getAttribute("href").replace("#", "");
      linkById[id] = link;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var id = entry.target.id;
          var link = linkById[id];
          if (!link) return;
          if (entry.isIntersecting) {
            navLinkItems.forEach(function (l) { l.classList.remove("is-active"); });
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ---------- Scroll reveal for section content ---------- */
  var revealTargets = document.querySelectorAll(
    ".section__heading, .section__lead, .about__content > *, .skills__group, " +
    ".service-card, .project-card, .contact__inner > *"
  );

  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();

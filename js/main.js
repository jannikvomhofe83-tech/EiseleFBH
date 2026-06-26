/* Krotzer & Eisele – Interaktionen */
(function () {
  "use strict";

  /* sticky header shadow */
  var header = document.querySelector(".header");
  var onScroll = function () {
    if (header) header.classList.toggle("is-stuck", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* mobile menu */
  var burger = document.querySelector(".burger");
  var mobileNav = document.querySelector(".mobile-nav");
  if (burger && mobileNav) {
    var toggle = function () {
      var open = burger.classList.toggle("is-open");
      mobileNav.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    };
    burger.addEventListener("click", toggle);
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        burger.classList.remove("is-open");
        mobileNav.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* active nav link by current path */
  var path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-nav a").forEach(function (a) {
    var href = (a.getAttribute("href") || "").split("/").pop();
    if (href === path) a.classList.add("active");
  });

  /* FAQ accordion */
  document.querySelectorAll(".faq__q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq__item");
      var ans = item.querySelector(".faq__a");
      var open = item.classList.contains("is-open");
      item.classList.toggle("is-open", !open);
      ans.style.maxHeight = open ? null : ans.scrollHeight + "px";
      q.setAttribute("aria-expanded", open ? "false" : "true");
    });
  });

  /* scroll reveal */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* animated counters */
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, target = parseFloat(el.dataset.count),
            suffix = el.dataset.suffix || "", dur = 1600, t0 = null;
        var step = function (ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          var val = Math.floor((1 - Math.pow(1 - p, 3)) * target);
          el.textContent = val.toLocaleString("de-DE") + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target.toLocaleString("de-DE") + suffix;
        };
        requestAnimationFrame(step);
        co.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* contact form (front-end demo) */
  var form = document.querySelector("#anfrage-form");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var ok = form.querySelector(".form__ok");
      if (ok) { ok.classList.add("show"); ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
      form.reset();
    });
  }

  /* footer year */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();

(function () {
  var header = document.getElementById("header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  var yearEl = document.getElementById("year");
  var form = document.getElementById("callback-form");
  var formSuccess = document.getElementById("form-success");
  var formReset = document.getElementById("form-reset");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (header) {
    var onScroll = function () {
      header.classList.toggle("header--scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        toggle.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("is-open")) return;
      var t = e.target;
      if (nav.contains(t) || toggle.contains(t)) return;
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  }

  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.08 }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  function resetFormUi() {
    if (!form || !formSuccess) return;
    form.classList.remove("form--done");
    formSuccess.setAttribute("hidden", "");
    var submitBtn = document.getElementById("form-submit");
    if (submitBtn) submitBtn.disabled = false;
  }

  if (form && formSuccess) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.classList.add("form--done");
      formSuccess.removeAttribute("hidden");
      var submitBtn = document.getElementById("form-submit");
      if (submitBtn) submitBtn.disabled = true;
      formSuccess.focus();
    });
  }

  if (formReset && form) {
    formReset.addEventListener("click", function () {
      form.reset();
      resetFormUi();
    });
  }
})();

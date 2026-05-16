document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  if (typeof Swiper !== "undefined") {
    var heroSwiper = new Swiper(".hero-swiper", {
      loop: false,
      speed: 700,
      allowTouchMove: false,
      pagination: {
        el: ".hero-swiper__pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".hero-swiper__next",
        prevEl: ".hero-swiper__prev",
      },
    });

    var catalogSwiper = null;
    var catalogMq = window.matchMedia("(max-width: 992px)");

    function initCatalogSwiper() {
      if (catalogMq.matches && !catalogSwiper) {
        catalogSwiper = new Swiper(".catalog-swiper", {
          slidesPerView: 1,
          spaceBetween: 20,
          speed: 500,
          navigation: {
            nextEl: ".catalog-swiper__next",
            prevEl: ".catalog-swiper__prev",
          },
        });
      } else if (!catalogMq.matches && catalogSwiper) {
        catalogSwiper.destroy(true, true);
        catalogSwiper = null;
      }
    }

    initCatalogSwiper();
    catalogMq.addEventListener("change", initCatalogSwiper);

    void heroSwiper;
  }

  if (typeof jQuery !== "undefined" && jQuery.fancybox) {
    jQuery("[data-fancybox]").fancybox({
      touch: false,
      smallBtn: true,
      btnTpl: {
        smallBtn:
          '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="Закрыть"></button>',
      },
    });
  }

  var phoneInputs = document.querySelectorAll('[name="phone"]');

  phoneInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      var digits = input.value.replace(/\D/g, "").slice(0, 11);
      if (!digits.length) {
        input.value = "";
        return;
      }
      if (digits[0] === "8") digits = "7" + digits.slice(1);
      if (digits[0] !== "7") digits = "7" + digits;

      var formatted = "+7";
      if (digits.length > 1) formatted += " (" + digits.slice(1, 4);
      if (digits.length >= 4) formatted += ") " + digits.slice(4, 7);
      if (digits.length >= 7) formatted += "-" + digits.slice(7, 9);
      if (digits.length >= 9) formatted += "-" + digits.slice(9, 11);
      input.value = formatted;
    });
  });

  document.querySelectorAll("[data-callback-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (typeof jQuery !== "undefined" && jQuery.fancybox) {
        jQuery.fancybox.close();
      }
      form.reset();
    });
  });

  var burger = document.querySelector("[data-burger]");
  var nav = document.querySelector("[data-nav]");

  if (burger && nav) {
    burger.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      burger.classList.toggle("is-open", isOpen);
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  document.querySelectorAll(".car-card__colors").forEach(function (list) {
    var card = list.closest(".car-card");
    var photo = card && card.querySelector(".car-card__photo");

    list.addEventListener("click", function (event) {
      var btn = event.target.closest("button");
      if (!btn) return;

      var imageSrc = btn.getAttribute("data-image");
      if (!imageSrc) return;

      list.querySelectorAll("button").forEach(function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");

      if (!photo || photo.getAttribute("src") === imageSrc) return;

      photo.classList.add("is-switching");
      var preload = new Image();
      preload.onload = function () {
        photo.src = imageSrc;
        photo.classList.remove("is-switching");
      };
      preload.onerror = function () {
        photo.classList.remove("is-switching");
      };
      preload.src = imageSrc;
    });
  });
});

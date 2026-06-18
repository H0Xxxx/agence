/* ============================================
   PAGE LOADER + TRANSITIONS
   Agence Immobilière Hamdaoui
   ============================================ */

(function () {
  "use strict";

  document.documentElement.classList.add("is-transitioning");

  function ensureOverlay() {
    if (document.querySelector(".page-loader")) return;

    var loader = document.createElement("div");
    loader.className = "page-loader";
    loader.innerHTML =
      '<span class="page-loader-logo">AH</span>' +
      '<span class="page-loader-bar"><span class="page-loader-bar-fill"></span></span>';
    document.documentElement.appendChild(loader);
  }

  ensureOverlay();

  // ---- Hide loader once page is ready ----
  function revealPage() {
    document.documentElement.classList.remove("is-transitioning");
    document.documentElement.classList.add("is-revealed");
    var loader = document.querySelector(".page-loader");
    if (loader) {
      loader.classList.add("page-loader-hide");
      setTimeout(function () {
        if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
      }, 500);
    }
  }

  if (document.readyState === "complete") {
    setTimeout(revealPage, 350);
  } else {
    window.addEventListener("load", function () {
      setTimeout(revealPage, 350);
    });
  }

  // ---- Intercept internal nav clicks for slide+fade exit ----
  function isInternalPageLink(link) {
    if (!link) return false;
    if (link.target === "_blank") return false;
    if (link.hasAttribute("download")) return false;
    var href = link.getAttribute("href") || "";
    if (href === "" || href.charAt(0) === "#") return false;
    if (href.indexOf("://") !== -1 || href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0) {
      return false;
    }
    return href.endsWith(".html") || href === "/" ;
  }

  document.addEventListener("click", function (e) {
    var link = e.target.closest ? e.target.closest("a") : null;
    if (!isInternalPageLink(link)) return;

    var href = link.getAttribute("href");
    e.preventDefault();

    document.documentElement.classList.add("is-leaving");

    setTimeout(function () {
      window.location.href = href;
    }, 380);
  });
})();

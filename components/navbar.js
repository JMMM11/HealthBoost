/*
 * components/navbar.js
 * Menu principal compartido por todas las paginas.
 * Uso: <script src="components/navbar.js" data-root="" data-page="home"></script>
 *   data-root  ruta hasta la raiz del sitio ("" en index.html, "../" dentro de pages/).
 *   data-page  id de la pagina actual, para marcar su enlace como activo.
 * El menu se inserta justo donde esta la etiqueta <script>.
 */
(() => {
  const mount = document.currentScript;
  const root = mount.dataset.root || "";
  const currentPage = mount.dataset.page || "";
  const onHome = currentPage === "home";

  // Orden del menu: Inicio -> Nutrition -> Mental Wellness -> Physical Activity -> About Us -> Contacto.
  // En Inicio, "HOME" y "CONTACT" son anclas de la misma pagina (scroll suave).
  const links = [
    { id: "home", label: "HOME", href: onHome ? "#hero" : `${root}index.html` },
    { id: "nutrition", label: "NUTRITION", href: `${root}pages/nutrition.html` },
    { id: "mental-wellness", label: "MENTAL WELLNESS", href: `${root}pages/mental-wellness.html` },
    { id: "physical-activity", label: "PHYSICAL ACTIVITY", href: `${root}pages/physical-activity.html` },
    { id: "about", label: "ABOUT US", href: `${root}pages/about.html` },
    { id: "contact", label: "CONTACT", href: onHome ? "#contact" : `${root}index.html#contact` }
  ];

  const items = links.map((link) => `
          <li class="nav-item"><a class="nav-link${link.id === currentPage ? " active" : ""}" href="${link.href}">${link.label}</a></li>`).join("");

  mount.insertAdjacentHTML("beforebegin", `
  <nav id="mainNav" class="navbar navbar-expand-lg">
    <div class="container">
      <a class="navbar-brand" href="${root}index.html">H E A L T H<span> B O O S T</span></a>
      <button class="navbar-toggler border-0 p-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-label="Toggle navigation">
        <div class="hamburger-icon p-2"><span></span><span></span><span></span></div>
      </button>
      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav ms-auto align-items-lg-center gap-1">${items}
        </ul>
      </div>
    </div>
  </nav>`);
})();

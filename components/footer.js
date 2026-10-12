/*
 * components/footer.js
 * Pie de pagina compartido por las paginas internas (carpeta pages/).
 * Uso: <script src="../components/footer.js" data-root="../"></script>
 *   data-root  ruta hasta la raiz del sitio ("../" dentro de pages/).
 * El pie se inserta justo donde esta la etiqueta <script>.
 */
(() => {
  const mount = document.currentScript;
  const root = mount.dataset.root || "";
  const page = (name) => `${root}pages/${name}.html`;

  mount.insertAdjacentHTML("beforebegin", `
  <footer>
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-5"><div class="footer-brand">HEALTH<span>BOOST</span></div><p class="footer-desc">Nutrition, mental balance and physical activity connected in one platform.</p></div>
        <div class="col-6 col-lg-3"><div class="footer-title">Areas</div><ul class="footer-links"><li><a href="${page("nutrition")}">Nutrition</a></li><li><a href="${page("mental-wellness")}">Mind & Balance</a></li><li><a href="${page("physical-activity")}">Physical Activity</a></li></ul></div>
        <div class="col-6 col-lg-2"><div class="footer-title">Flow</div><ul class="footer-links"><li><a href="${page("questionnaire")}">Questionnaire</a></li><li><a href="${page("nutrition-plan")}">Program</a></li></ul></div>
        <div class="col-lg-2"><div class="footer-title">Help</div><ul class="footer-links"><li><a href="${page("terms-and-conditions")}">Terms</a></li><li><a href="${page("faq")}">FAQs</a></li></ul></div>
      </div>
      <div class="footer-bottom"><span>© 2026 HEALTHBOOST. All rights reserved.</span><span>Clean wellness, connected habits.</span></div>
    </div>
  </footer>`);
})();

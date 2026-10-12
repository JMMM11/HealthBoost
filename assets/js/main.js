/*
 * assets/js/main.js
 * Comportamiento de las paginas internas (carpeta pages/).
 * Los datos de ejemplo vienen de data/mockData.js (objeto global HB_DATA).
 * Nada se guarda en el navegador: al recargar, todo vuelve a su estado inicial.
 */
(() => {
  // Atajos para seleccionar uno o varios elementos.
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  // ---- BASE: preloader, navbar, scroll suave, imagenes y animaciones ----
  function initBase() {
    const hidePreloader = () => $("#preloader")?.classList.add("fade-out");
    setTimeout(hidePreloader, 700);
    window.addEventListener("load", () => setTimeout(hidePreloader, 250));

    // Navbar solida y boton "volver arriba" segun el scroll.
    const nav = $("#mainNav");
    const onScroll = () => {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 50);
      $("#scrollTop")?.classList.toggle("visible", window.scrollY > 420);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);

    // Scroll suave para los enlaces a anclas de la misma pagina.
    $$("a[href^='#']").forEach((link) => {
      link.addEventListener("click", (event) => {
        const hash = link.getAttribute("href");
        const target = hash.length > 1 ? $(hash) : null;
        if (!target) return;
        event.preventDefault();
        window.scrollTo({ top: target.offsetTop - 78, behavior: "smooth" });
        const menu = $("#navMenu");
        if (menu?.classList.contains("show") && window.bootstrap) {
          bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
      });
    });

    // Si una imagen no carga, se oculta y queda visible el fondo del contenedor.
    $$(".image-slot img").forEach((img) => {
      const markEmpty = () => img.closest(".image-slot")?.classList.add("is-empty");
      if (img.complete && img.naturalWidth === 0) markEmpty();
      img.addEventListener("error", markEmpty);
    });

    if (window.AOS) AOS.init({ duration: 650, easing: "ease-out-cubic", once: true, offset: 60 });
  }

  // ---- META PERSONAL (mental-wellness.html#my-goal) ----
  function initGoal() {
    const form = $("#goalForm");
    if (!form) return;
    const input = $("#goalInput");
    const progress = $("#goalProgress");
    const quote = $("#goalQuote");
    const label = $("#goalProgressLabel");
    const { totalDays, ...defaults } = HB_DATA.defaultGoal;
    const goal = { ...defaults };

    function render() {
      input.value = goal.text;
      progress.value = goal.progress;
      quote.textContent = `"${goal.text}"`;
      label.textContent = `Progress: ${goal.progress}/${totalDays} days`;
      $(".goal-card .progress-fill")?.style.setProperty("--progress", `${(goal.progress / totalDays) * 100}%`);
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      goal.text = input.value.trim() || defaults.text;
      goal.progress = Number(progress.value);
      render();
    });
    render();
  }

  // ---- BIBLIOTECA DE RECURSOS (mental-wellness.html#resources) ----
  function initResources() {
    $$(".resource-toggle").forEach((button) => {
      button.addEventListener("click", () => button.closest(".resource-card")?.classList.toggle("open"));
    });

    $$(".mark-complete").forEach((button) => {
      button.addEventListener("click", () => {
        button.closest(".resource-card")?.classList.add("completed");
        button.textContent = "Completed";
      });
    });
  }

  // ---- RESERVA DE SESION (mental-wellness.html#book-session) ----
  // Flujo de demostracion: tipo -> especialista -> fecha -> hora -> confirmacion.
  function initBooking() {
    const root = $("#bookingApp");
    if (!root) return;

    const { sessionDuration, sessionTypes, specialists, availableDates, availableTimes } = HB_DATA.booking;
    const state = { type: "", specialist: "", date: "", time: "" };

    // Resalta el paso actual en la columna lateral.
    function setStep(step) {
      $$(".booking-step", root).forEach((item, index) => item.classList.toggle("active", index === step));
    }

    // Marca como seleccionado un boton dentro de su grupo.
    function select(button, groupSelector, scope = root) {
      $$(groupSelector, scope).forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
    }

    function showUpcomingSession() {
      const upcoming = $("#upcomingSession");
      if (!upcoming || !state.type || !state.specialist || !state.date || !state.time) return;
      upcoming.style.display = "block";
      upcoming.innerHTML = `
        <div class="card-kicker">Your upcoming session</div>
        <h3 class="card-title" style="color:white">${sessionTypes[state.type]}</h3>
        <p>${state.date} at ${state.time}</p>
        <p>With ${state.specialist}</p>
        <div class="hero-actions">
          <button class="btn-main" type="button" data-reschedule>Reschedule</button>
          <button class="btn-ghost" type="button" data-cancel>Cancel</button>
        </div>`;
      $("[data-cancel]", upcoming).onclick = () => {
        upcoming.style.display = "none";
      };
      $("[data-reschedule]", upcoming).onclick = () => window.scrollTo({ top: root.offsetTop - 80, behavior: "smooth" });
    }

    function renderSpecialists(type) {
      const holder = $("#specialistChoices");
      holder.innerHTML = specialists[type].map((person) => `
        <button class="choice-card specialist-choice" type="button" data-name="${person.name}" data-specialty="${person.specialty}">
          <div class="photo-slot">Photo placeholder<br>${person.specialty.toLowerCase()}-photo.jpg</div>
          <strong>${person.name}</strong>
          <p class="mb-1">${person.specialty}</p>
          <small>${person.desc}</small>
        </button>`).join("");
      $$(".specialist-choice", holder).forEach((button) => {
        button.onclick = () => {
          state.specialist = `${button.dataset.name} - ${button.dataset.specialty}`;
          select(button, ".specialist-choice", holder);
          $("#dateStep").hidden = false;
          setStep(2);
        };
      });
    }

    $$(".session-type", root).forEach((button) => {
      button.onclick = () => {
        state.type = button.dataset.type;
        select(button, ".session-type");
        $("#specialistStep").hidden = false;
        renderSpecialists(state.type);
        setStep(1);
      };
    });

    $("#dateChoices").innerHTML = availableDates.map((date) => `<button class="date-option" type="button">${date}</button>`).join("");
    $$(".date-option", root).forEach((button) => {
      button.onclick = () => {
        state.date = button.textContent;
        select(button, ".date-option");
        $("#timeStep").hidden = false;
        setStep(3);
      };
    });

    $("#timeChoices").innerHTML = availableTimes.map((time) => `<button class="time-option" type="button">${time}</button>`).join("");
    $$(".time-option", root).forEach((button) => {
      button.onclick = () => {
        state.time = button.textContent;
        select(button, ".time-option");
        $("#confirmStep").hidden = false;
        $("#sessionDetails").innerHTML = `
          <li>Type: ${sessionTypes[state.type]}</li>
          <li>Professional: ${state.specialist}</li>
          <li>Date: ${state.date}</li>
          <li>Time: ${state.time}</li>
          <li>Duration: ${sessionDuration}</li>`;
      };
    });

    $("#confirmSession")?.addEventListener("click", showUpcomingSession);
  }

  // ---- CUESTIONARIO (questionnaire.html) ----
  function initQuiz() {
    const root = $("#quizApp");
    if (!root) return;

    const { questions, areaLabels, areaLinks, combinedLink, recommendations } = HB_DATA.quiz;
    let index = 0;
    const answers = [];
    const progress = $("#quizProgressFill");
    const step = $("#quizStep");
    const resultCard = $("#quizResult");
    const questionCard = $("#questionCard");

    // Pinta la pregunta actual con sus opciones y botones.
    function render() {
      const question = questions[index];
      const isLast = index === questions.length - 1;
      progress.style.setProperty("--progress", `${(index / questions.length) * 100}%`);
      step.textContent = `Question ${index + 1} of ${questions.length}`;
      questionCard.innerHTML = `
        <div class="card-kicker">${question.area}</div>
        <h1 class="question-title">${question.text}</h1>
        <div class="option-grid">
          ${question.options.map((option, optionIndex) => `
            <button class="option-card ${answers[index] === optionIndex ? "selected" : ""}" type="button" data-index="${optionIndex}">
              ${option.label}
            </button>`).join("")}
        </div>
        <div class="quiz-actions">
          <button class="btn-soft" type="button" id="quizBack" ${index === 0 ? "disabled" : ""}>Back</button>
          <button class="btn-main" type="button" id="quizNext">${isLast ? "See my result" : "Continue"}</button>
        </div>
        <p class="form-error" id="quizError"></p>`;

      $$(".option-card", questionCard).forEach((button) => {
        button.onclick = () => {
          answers[index] = Number(button.dataset.index);
          $$(".option-card", questionCard).forEach((item) => item.classList.remove("selected"));
          button.classList.add("selected");
          $("#quizError").textContent = "";
        };
      });

      $("#quizBack").onclick = () => {
        if (index > 0) {
          index -= 1;
          render();
        }
      };

      $("#quizNext").onclick = () => {
        if (answers[index] === undefined) {
          $("#quizError").textContent = "Please select one answer to continue.";
          return;
        }
        if (isLast) renderResult();
        else {
          index += 1;
          render();
        }
      };
    }

    // Suma los puntos por area y ordena las areas de mayor a menor.
    function calculateResult() {
      const scores = { nutrition: 0, mentalWellness: 0, physicalActivity: 0 };
      const reasons = [];
      answers.forEach((answerIndex, questionIndex) => {
        const option = questions[questionIndex].options[answerIndex];
        Object.entries(option.scores).forEach(([key, value]) => {
          scores[key] += value;
        });
        reasons.push(option.reason);
      });
      const ordered = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      // Si la diferencia entre la primera y la ultima es pequena, el resultado es combinado.
      const balanced = ordered[0][1] - ordered[2][1] <= 2;
      return { scores, ordered, balanced, reasons };
    }

    function renderResult() {
      const { scores, ordered, balanced, reasons } = calculateResult();
      const main = ordered[0][0];
      const title = balanced ? "Combined Wellness" : areaLabels[main];
      const cta = balanced ? combinedLink : areaLinks[main];
      const tips = balanced ? Object.values(recommendations).flat().slice(0, 5) : recommendations[main];
      const why = balanced
        ? "Your answers show that nutrition, mental wellness and physical activity are closely connected right now."
        : `This result came from patterns like ${reasons.slice(0, 3).join(", ")}.`;

      progress.style.setProperty("--progress", "100%");
      questionCard.style.display = "none";
      resultCard.style.display = "block";
      resultCard.innerHTML = `
        <div class="question-card">
          <div class="card-kicker">Your main focus</div>
          <h1 class="question-title">${title}</h1>
          <p class="card-text">${why}</p>
          <div class="score-bars">
            ${Object.entries(scores).map(([key, value]) => `
              <div>
                <div class="score-label"><span>${areaLabels[key]}</span><span>${value}</span></div>
                <div class="progress-track"><div class="progress-fill" style="--progress:${Math.min(value * 10, 100)}%"></div></div>
              </div>`).join("")}
          </div>
          <h3 class="card-title">Practical recommendations</h3>
          <ul class="clean-list">
            ${tips.map((item) => `<li>${item}</li>`).join("")}
          </ul>
          <h3 class="card-title mt-4">You may also benefit from</h3>
          <p class="card-text">${ordered.slice(1).map(([key]) => areaLabels[key]).join(" and ")}</p>
          <div class="result-actions mt-4">
            <a class="btn-main" href="${cta}">Explore your recommended plan</a>
            <button class="btn-soft" type="button" id="retakeQuiz">Retake questionnaire</button>
          </div>
        </div>`;
      $("#retakeQuiz").onclick = () => {
        index = 0;
        answers.length = 0;
        resultCard.style.display = "none";
        questionCard.style.display = "block";
        render();
      };
    }

    render();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initBase();
    initGoal();
    initResources();
    initBooking();
    initQuiz();
  });
})();

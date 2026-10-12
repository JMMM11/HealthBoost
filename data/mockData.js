/*
 * data/mockData.js
 * Datos de ejemplo fijos del sitio. No hay base de datos ni sesion de usuario:
 * todo lo que antes se guardaba o se leia del navegador sale de este archivo.
 * Se carga como script clasico y expone un unico objeto global: HB_DATA.
 */
window.HB_DATA = {
  // Meta que se muestra por defecto en "My goal" (pages/mental-wellness.html).
  defaultGoal: { text: "Reduce my stress", progress: 3, totalDays: 7 },

  // Reserva de sesiones (pages/mental-wellness.html#book-session).
  booking: {
    sessionDuration: "45 minutes",
    sessionTypes: { psychology: "Psychology Session", nutrition: "Nutrition Session" },
    specialists: {
      psychology: [
        { name: "Specialist Name", specialty: "Psychologist", desc: "Emotional well-being, stress management and personal concerns." },
        { name: "Specialist Name", specialty: "Mental Wellness Guide", desc: "Small habit changes, motivation and daily balance." }
      ],
      nutrition: [
        { name: "Specialist Name", specialty: "Nutritionist", desc: "Healthy eating, nutrition goals and meal organization." },
        { name: "Specialist Name", specialty: "Nutrition Coach", desc: "Hydration, nutrients and practical eating habits." }
      ]
    },
    availableDates: ["June 24", "June 26", "June 28", "July 2"],
    availableTimes: ["9:00 AM", "11:30 AM", "4:00 PM", "6:00 PM"]
  },

  // Cuestionario (pages/questionnaire.html).
  quiz: {
    // Nombre visible de cada area puntuada.
    areaLabels: { nutrition: "Nutrition", mentalWellness: "Mental Wellness", physicalActivity: "Physical Activity" },
    // Pagina recomendada segun el area principal (rutas relativas a pages/).
    areaLinks: { nutrition: "nutrition-plan.html", mentalWellness: "mental-wellness.html", physicalActivity: "physical-activity.html" },
    // Destino cuando las tres areas quedan equilibradas.
    combinedLink: "../index.html#services",
    recommendations: {
      nutrition: ["Plan two easy meals for the next three days.", "Add water before coffee or sweet drinks.", "Build plates around protein, fiber and color."],
      mentalWellness: ["Use a two minute breathing pause when stress rises.", "Choose one realistic goal for the week.", "Protect a short wind-down routine before sleep."],
      physicalActivity: ["Start with 20 minutes of walking or mobility.", "Schedule movement like an appointment.", "Alternate effort days with recovery days."]
    },
    questions: [
      {
        area: "Nutrition",
        text: "How organized does your eating feel during a normal week?",
        options: [
          { label: "Very disorganized. I often skip meals or improvise.", scores: { nutrition: 4 }, reason: "your meals need more structure" },
          { label: "Somewhat inconsistent, but I try to choose balanced meals.", scores: { nutrition: 2 }, reason: "your nutrition habits are close but inconsistent" },
          { label: "Mostly organized and balanced.", scores: { nutrition: 0 }, reason: "nutrition seems like a current strength" }
        ]
      },
      {
        area: "Nutrition",
        text: "What habit would help your energy most right now?",
        options: [
          { label: "Planning meals and snacks.", scores: { nutrition: 3 }, reason: "meal planning could stabilize your energy" },
          { label: "Drinking more water.", scores: { nutrition: 2 }, reason: "hydration is an easy nutrition win" },
          { label: "Reducing stress around food.", scores: { mentalWellness: 2, nutrition: 1 }, reason: "food choices are linked with stress for you" }
        ]
      },
      {
        area: "Physical Activity",
        text: "How often do you move intentionally each week?",
        options: [
          { label: "Rarely or almost never.", scores: { physicalActivity: 4 }, reason: "your body would benefit from more consistent movement" },
          { label: "One or two times.", scores: { physicalActivity: 2 }, reason: "your movement routine needs more frequency" },
          { label: "Three or more times.", scores: { physicalActivity: 0 }, reason: "movement is already present in your routine" }
        ]
      },
      {
        area: "Physical Activity",
        text: "Which physical goal feels most useful?",
        options: [
          { label: "Build a simple beginner routine.", scores: { physicalActivity: 3 }, reason: "starting small will make exercise easier to maintain" },
          { label: "Improve mobility and recovery.", scores: { physicalActivity: 2 }, reason: "recovery and mobility need attention" },
          { label: "Keep progressing in training.", scores: { physicalActivity: 1 }, reason: "you are ready for more intentional training structure" }
        ]
      },
      {
        area: "Mental Wellness",
        text: "How has your stress felt lately?",
        options: [
          { label: "High and frequent.", scores: { mentalWellness: 4 }, reason: "stress is a major signal in your answers" },
          { label: "Moderate, but manageable.", scores: { mentalWellness: 2 }, reason: "stress support could help you stay balanced" },
          { label: "Low most days.", scores: { mentalWellness: 0 }, reason: "your stress appears well managed" }
        ]
      },
      {
        area: "Mental Wellness",
        text: "What usually blocks your wellness habits?",
        options: [
          { label: "Losing motivation.", scores: { mentalWellness: 3 }, reason: "motivation and emotional consistency are key for you" },
          { label: "Not enough time.", scores: { mentalWellness: 2, physicalActivity: 1 }, reason: "time organization is affecting your routine" },
          { label: "Not knowing what to eat.", scores: { nutrition: 3 }, reason: "nutrition guidance would remove uncertainty" }
        ]
      },
      {
        area: "Daily Habits",
        text: "How is your sleep and recovery?",
        options: [
          { label: "Poor. I wake up tired often.", scores: { mentalWellness: 3, physicalActivity: 1 }, reason: "recovery is limiting your overall wellness" },
          { label: "Average. It changes by week.", scores: { mentalWellness: 2 }, reason: "sleep consistency could support your goals" },
          { label: "Good most nights.", scores: { mentalWellness: 0 }, reason: "sleep is helping your progress" }
        ]
      },
      {
        area: "Personal Goal",
        text: "What outcome matters most to you right now?",
        options: [
          { label: "Eat better and feel lighter.", scores: { nutrition: 3 }, reason: "your goal points toward nutrition support" },
          { label: "Feel calmer and more focused.", scores: { mentalWellness: 3 }, reason: "your goal points toward mental balance" },
          { label: "Move more and feel stronger.", scores: { physicalActivity: 3 }, reason: "your goal points toward movement support" }
        ]
      }
    ]
  },

  // Mapa "Explore Wellness Near You" (index.html#contact).
  map: {
    center: [8.98, -79.52],
    zoom: 10,
    // category coincide con el data-filter de los botones del mapa.
    locations: [
      // Gimnasios Smart Fit
      { name: "Smart Fit - Galerías Obarrio", category: "gym", lat: 8.9780, lng: -79.5260, icon: "fa-dumbbell", color: "#1a1a2e", desc: "Vía España y Av. República de Brasil, Obarrio." },
      { name: "Smart Fit - Megápolis", category: "gym", lat: 8.9810, lng: -79.5330, icon: "fa-dumbbell", color: "#1a1a2e", desc: "Av. Balboa, PH Megápolis Outlets, piso 3." },
      { name: "Smart Fit - Albrook Mall", category: "gym", lat: 9.0050, lng: -79.5350, icon: "fa-dumbbell", color: "#1a1a2e", desc: "Av. Roosevelt y Av. de la Amistad, Albrook Mall." },
      { name: "Smart Fit - Dorado City Center", category: "gym", lat: 9.0154, lng: -79.5350, icon: "fa-dumbbell", color: "#1a1a2e", desc: "Avenida Ricardo J. Alfaro, PH Dorado City Center." },
      { name: "Smart Fit - Costa Verde", category: "gym", lat: 8.8803, lng: -79.7835, icon: "fa-dumbbell", color: "#e8b923", desc: "C.C. Plaza Central, Vía Interamerciana. (MAIN PARTNER)" },
      { name: "Smart Fit - Los Andes Mall", category: "gym", lat: 9.0350, lng: -79.4950, icon: "fa-dumbbell", color: "#1a1a2e", desc: "Los Andes Mall, nivel 100, San Miguelito." },
      { name: "Smart Fit - Plaza El Cangrejo", category: "gym", lat: 8.9950, lng: -79.5200, icon: "fa-dumbbell", color: "#1a1a2e", desc: "Av. Manuel Espinosa Batista, Plaza El Cangrejo." },
      { name: "Smart Fit - Westland", category: "gym", lat: 8.9200, lng: -79.6800, icon: "fa-dumbbell", color: "#1a1a2e", desc: "Arraiján Town Center, Vista Alegre." },
      { name: "Smart Fit - Atlantic Plaza", category: "gym", lat: 9.3450, lng: -79.9050, icon: "fa-dumbbell", color: "#1a1a2e", desc: "Cuatro Altos, Vía Transístmica, Colón." },
      // Parques
      { name: "Parque Central La Chorrera", category: "park", lat: 8.8850, lng: -79.7850, icon: "fa-tree", color: "#2a9d8f", desc: "Parque público en La Chorrera." },
      { name: "Parque Libertador", category: "park", lat: 8.8753, lng: -79.7888, icon: "fa-tree", color: "#2a9d8f", desc: "Parque central en Barrio Balboa." },
      { name: "Parque Costa Verde", category: "park", lat: 8.8790, lng: -79.7820, icon: "fa-tree", color: "#2a9d8f", desc: "Áreas verdes y senderos en Costa Verde." },
      // Canchas y areas deportivas
      { name: "Cancha El Hatillo", category: "sports", lat: 8.8760, lng: -79.7900, icon: "fa-basketball-ball", color: "#e76f51", desc: "Cancha deportiva en Barrio Balboa." },
      { name: "Cancha Sintética Progreso #2", category: "sports", lat: 8.8840, lng: -79.7870, icon: "fa-futbol", color: "#e76f51", desc: "Cancha sintética municipal." },
      { name: "Complejo Deportivo 28 de Noviembre", category: "sports", lat: 8.8800, lng: -79.7860, icon: "fa-running", color: "#e76f51", desc: "Baloncesto, fútbol y juegos." },
      // Otros
      { name: "Área Recreativa El Guayabito", category: "other", lat: 8.8820, lng: -79.7880, icon: "fa-spa", color: "#6c757d", desc: "Área recreativa con playground." },
      { name: "Sendero El Chorro", category: "other", lat: 8.8900, lng: -79.7700, icon: "fa-hiking", color: "#6c757d", desc: "Sendero natural hacia cascada." }
    ]
  }
};

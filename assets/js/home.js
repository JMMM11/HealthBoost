/*
 * assets/js/home.js
 * Comportamiento de la pagina de Inicio (index.html).
 * Los puntos del mapa vienen de data/mockData.js (objeto global HB_DATA).
 */

// ---- ANIMACIONES AL HACER SCROLL (AOS) ----
AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });

// ---- NAVBAR Y BOTON "VOLVER ARRIBA" ----
const nav = document.getElementById('mainNav');
const scrollTopButton = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  scrollTopButton.classList.toggle('visible', window.scrollY > 400);
});

// ---- ENLACE ACTIVO DEL MENU ----
// En Inicio solo hay dos anclas en el menu: HOME (#hero) y CONTACT (#contact).
const contactSection = document.getElementById('contact');
const anchorLinks = document.querySelectorAll('.nav-link[href^="#"]');
window.addEventListener('scroll', () => {
  const activeHash = window.scrollY >= contactSection.offsetTop - 100 ? '#contact' : '#hero';
  anchorLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === activeHash));
});

// ---- SCROLL SUAVE ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      // Cierra el menu movil si estaba abierto.
      const collapse = document.getElementById('navMenu');
      if (collapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(collapse).hide();
      }
    }
  });
});

// ---- CONTADORES ----
function animateCount(el) {
  const target = +el.getAttribute('data-count');
  let count = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = Math.floor(count) + (el.closest('#stats') ? '' : '+');
    if (count >= target) clearInterval(timer);
  }, 25);
}

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      animateCount(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ---- BARRAS DE PROGRESO ----
const bars = document.querySelectorAll('.progress-bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.getAttribute('data-width') + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
bars.forEach(b => barObserver.observe(b));

// ---- CARRUSEL DE TESTIMONIOS (SWIPER) ----
new Swiper('.swiper-testimonials', {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,
  autoplay: { delay: 4000, disableOnInteraction: false },
  pagination: { el: '.swiper-pagination', clickable: true },
  breakpoints: {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 2 }
  }
});

// ---- PARALLAX DEL HERO ----
window.addEventListener('scroll', () => {
  const hero = document.getElementById('hero');
  if (hero) hero.style.backgroundPositionY = (window.scrollY * 0.4) + 'px';
});

// ---- MAPA DE LUGARES (LEAFLET) ----
function initWellnessMap() {
  const { center, zoom, locations } = HB_DATA.map;
  const map = L.map('wellnessMap').setView(center, zoom);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map);

  // Marcador redondo con un icono de Font Awesome.
  function createCustomIcon(iconClass, bgColor) {
    return L.divIcon({
      className: 'custom-map-marker',
      html: `<div style="background-color: ${bgColor}; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
               <i class="fas ${iconClass}" style="color: white; font-size: 16px;"></i>
             </div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36]
    });
  }

  // Marcadores agrupados por categoria para poder filtrarlos.
  const markers = {};
  locations.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lng], {
      icon: createCustomIcon(loc.icon, loc.color)
    }).bindPopup(`<strong>${loc.name}</strong><br>${loc.desc}`);

    if (!markers[loc.category]) markers[loc.category] = [];
    markers[loc.category].push(marker);
    marker.addTo(map);
  });

  // Filtros del mapa: muestra solo la categoria elegida (o todas).
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      for (const [category, markerArray] of Object.entries(markers)) {
        const visible = filter === 'all' || category === filter;
        markerArray.forEach(m => {
          if (visible && !map.hasLayer(m)) map.addLayer(m);
          if (!visible && map.hasLayer(m)) map.removeLayer(m);
        });
      }
    });
  });
}

// ---- FORMULARIO DE CONTACTO ----
// Solo visual: no se envia nada, se muestra el mensaje de confirmacion.
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit-custom');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
      contactForm.reset();
    }, 1500);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  // Si Leaflet no cargo (sin conexion), el resto de la pagina sigue funcionando.
  if (window.L) initWellnessMap();
});

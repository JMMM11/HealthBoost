# HealthBoostInfo
Pagina web de health boost

Sitio estático, solo visual e informativo: no tiene login, base de datos ni paso de compilación.

## Cómo verlo

Abre `index.html` en el navegador, o levanta un servidor local desde esta carpeta:

```
python -m http.server 8000
```

y entra a `http://localhost:8000`.

## Estructura

```
index.html      Inicio (incluye la sección Contact)
pages/          Páginas internas: nutrition, mental-wellness, physical-activity, about,
                nutrition-plan, questionnaire, faq, terms-and-conditions
components/     navbar.js y footer.js: menú y pie compartidos por todas las páginas
data/           mockData.js: datos de ejemplo (cuestionario, reservas, mapa)
assets/css/     home.css (Inicio), pages.css (páginas internas), icons.css
assets/js/      home.js (Inicio), main.js (páginas internas)
assets/vendor/  Bootstrap, AOS y Swiper
assets/images/  Imágenes agrupadas por página
```

## Menú

Inicio → Nutrition → Mental Wellness → Physical Activity → About Us → Contact.
El orden y los enlaces se editan en un solo lugar: `components/navbar.js`.

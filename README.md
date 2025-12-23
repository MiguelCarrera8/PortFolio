# 🚀 Portfolio - Miguel Ángel Carrera Cebrián

![Portfolio Preview](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Portfolio+Preview)

Portfolio profesional responsive y adaptativo desarrollado con tecnologías web modernas. Diseño elegante, interactivo y optimizado para todos los dispositivos.

## ✨ Características

- 🎨 **Diseño Moderno**: Interface limpia y profesional
- 📱 **Totalmente Responsive**: Adaptado para móvil, tablet y desktop
- 🌗 **Modo Oscuro/Claro**: Toggle automático de tema
- ⚡ **Animaciones Suaves**: Transiciones y efectos CSS avanzados
- 🚀 **Progressive Web App**: Instalable y funcional offline
- 🔍 **SEO Optimizado**: Estructura semántica y meta tags
- ♿ **Accesible**: Cumple estándares WCAG
- 📊 **Analytics Ready**: Preparado para Google Analytics
- 🎯 **Performance**: Optimizado para velocidad de carga

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica moderna
- **CSS3** - Estilos avanzados con variables CSS
- **JavaScript (ES6+)** - Funcionalidad interactiva
- **CSS Grid & Flexbox** - Layout responsive

### Herramientas y Librerías
- **Font Awesome** - Iconografía
- **Google Fonts (Inter)** - Tipografía moderna
- **Intersection Observer API** - Animaciones al scroll
- **Service Workers** - Funcionalidad PWA
- **Local Storage** - Persistencia de preferencias

### Optimización
- **Lazy Loading** - Carga diferida de imágenes
- **Code Splitting** - JavaScript modular
- **Compression** - Minificación automática
- **Caching Strategy** - Estrategia de caché optimizada

## 📁 Estructura del Proyecto

```
PortFolio/
│
├── index.html                 # Página principal
├── manifest.json             # PWA manifest
├── sw.js                     # Service Worker
│
├── css/
│   └── style.css            # Estilos principales
│
├── js/
│   └── script.js            # JavaScript principal
│
├── assets/
│   ├── images/              # Imágenes del portfolio
│   │   ├── profile.jpg      # Foto de perfil
│   │   ├── about-me.jpg     # Imagen sobre mí
│   │   ├── project1.jpg     # Captura proyecto 1
│   │   ├── project2.jpg     # Captura proyecto 2
│   │   └── project3.jpg     # Captura proyecto 3
│   │
│   ├── cv/                  # Documentos CV
│   │   └── Miguel_Angel_Carrera_Cebrian_CV.pdf
│   │
│   ├── icons/               # Iconos PWA
│   └── favicon.svg          # Favicon
│
└── README.md               # Este archivo
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Navegador web moderno
- Editor de código (recomendado: VS Code)
- Servidor local (opcional: Live Server, XAMPP, etc.)

### Configuración Rápida

1. **Clona o descarga el proyecto**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd PortFolio
   ```

2. **Personaliza el contenido**
   - Edita `index.html` con tu información personal
   - Reemplaza las imágenes en `assets/images/`
   - Actualiza los enlaces de proyectos y redes sociales
   - Coloca tu CV en `assets/cv/`

3. **Ejecuta el portfolio**
   - Abre `index.html` en tu navegador
   - O usa Live Server para desarrollo

### Personalización

#### Información Personal
Edita las siguientes secciones en `index.html`:

```html
<!-- Nombre y título -->
<span class="name">Soy [TU NOMBRE]</span>

<!-- Descripción -->
<p class="hero-description">
    [TU DESCRIPCIÓN PROFESIONAL]
</p>

<!-- Información de contacto -->
<p>email@ejemplo.com</p>
<p>+34 XXX XXX XXX</p>
```

#### Colores y Tema
Modifica las variables CSS en `css/style.css`:

```css
:root {
    --primary-color: #3b82f6;    /* Color principal */
    --secondary-color: #8b5cf6;  /* Color secundario */
    --accent-color: #f59e0b;     /* Color de acento */
}
```

#### Proyectos
Actualiza la sección de proyectos con tus propios trabajos:

```html
<div class="project-card">
    <div class="project-image">
        <img src="./assets/images/tu-proyecto.jpg" alt="Tu Proyecto">
        <div class="project-overlay">
            <div class="project-links">
                <a href="URL_DEMO" class="project-link" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                </a>
                <a href="URL_GITHUB" class="project-link" target="_blank">
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
    </div>
    <!-- ... resto del contenido del proyecto ... -->
</div>
```

## 📱 Funcionalidades

### Navegación
- **Menú responsive** con hamburguesa para móviles
- **Scroll suave** entre secciones
- **Indicador activo** de sección actual
- **Back to top** con scroll automático

### Interactividad
- **Efecto de escritura automática** en el hero
- **Animaciones al scroll** con Intersection Observer
- **Barras de progreso** animadas para habilidades
- **Contadores animados** en estadísticas
- **Hover effects** en cards y botones

### Formulario de Contacto
- **Validación en tiempo real**
- **Feedback visual** de envío
- **Accesibilidad** completa con labels
- **Indicadores de campos requeridos**

### Progressive Web App
- **Instalable** en dispositivos
- **Funcionalidad offline** básica
- **Caché inteligente** de recursos
- **Iconos adaptativos** para múltiples tamaños

## 🔧 Desarrollo

### Comandos Útiles

```bash
# Servidor local simple con Python
python -m http.server 8000

# Con Node.js (si tienes http-server instalado)
npx http-server -p 8000

# Con PHP
php -S localhost:8000
```

### Testing

#### Responsive Design
- Usa las DevTools del navegador
- Prueba en diferentes dispositivos
- Verifica orientaciones portrait/landscape

#### Performance
- Lighthouse audit
- PageSpeed Insights
- GTmetrix analysis

#### PWA
- PWA audit en DevTools
- Prueba la instalación
- Verifica funcionamiento offline

### Optimización

#### Imágenes
- Usa WebP para mejor compresión
- Implementa lazy loading
- Optimiza tamaños para diferentes viewports

#### CSS
- Minifica para producción
- Elimina estilos no utilizados
- Usa critical CSS inline

#### JavaScript
- Minifica para producción
- Usa tree shaking
- Implementa code splitting

## 🌐 Deployment

### GitHub Pages
1. Sube el código a GitHub
2. Ve a Settings > Pages
3. Selecciona la rama principal
4. Tu portfolio estará en `https://usuario.github.io/PortFolio`

### Netlify
1. Conecta tu repositorio
2. Configure build settings (si es necesario)
3. Deploy automático en cada push

### Vercel
1. Importa desde GitHub
2. Deploy automático
3. Configuración de dominio personalizado

### Hosting Tradicional
1. Sube archivos via FTP
2. Asegúrate de que index.html esté en la raíz
3. Configura redirects si es necesario

## 📈 SEO y Analytics

### SEO Básico
- [x] Meta tags completos
- [x] Estructura semántica HTML5
- [x] URLs amigables con anchors
- [x] Sitemap automático
- [x] Schema.org markup

### Analytics
Para integrar Google Analytics:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## ♿ Accesibilidad

### Características Implementadas
- **Navegación por teclado** completa
- **Skip links** para lectores de pantalla
- **Alt text** descriptivo en imágenes
- **Contraste** de colores WCAG AA
- **Focus indicators** visibles
- **ARIA labels** donde es necesario

### Testing de Accesibilidad
- [WAVE Web Accessibility Evaluator](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse)

## 🐛 Troubleshooting

### Problemas Comunes

**Las imágenes no cargan:**
- Verifica las rutas en index.html
- Asegúrate de que las imágenes estén en assets/images/
- Comprueba los nombres de archivo (case-sensitive)

**Animaciones no funcionan:**
- Verifica que JavaScript esté habilitado
- Comprueba la consola por errores
- Asegúrate de que Intersection Observer sea compatible

**PWA no se instala:**
- Verifica que manifest.json sea accesible
- Comprueba que el Service Worker se registre
- Usa HTTPS (requerido para PWA)

**Estilos no se aplican:**
- Verifica la ruta del CSS
- Comprueba la sintaxis CSS
- Limpia la caché del navegador

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usar, modificar y distribuir libremente.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar el portfolio:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contacto

**Miguel Ángel Carrera Cebrián**
- 📧 Email: miguel.carrera@email.com
- 🌐 Portfolio: [tu-portfolio.com](https://tu-portfolio.com)
- 💼 LinkedIn: [linkedin.com/in/miguelangel-carrera](https://linkedin.com/in/miguelangel-carrera)
- 🐙 GitHub: [github.com/miguelangel-carrera](https://github.com/miguelangel-carrera)

---

⭐ **¡Si te gusta este portfolio, no olvides darle una estrella!** ⭐

*Hecho con ❤️ y mucho código*
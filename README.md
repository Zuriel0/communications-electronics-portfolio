# Mi Portafolio Personal 🚀

Este es mi portafolio personal, creado para mostrar mis proyectos, experiencias y las tecnologías que domino, incluyendo programación, sistemas embebidos, electrónica, bases de datos y arquitecturas concurrentes.

## 🛠️ Tecnologías Utilizadas

Este proyecto fue desarrollado utilizando las siguientes tecnologías:

- **[React 19](https://react.dev/)**: Librería principal para construir la interfaz de usuario de manera declarativa.
- **[React Router DOM](https://reactrouter.com/)**: Para el sistema de enrutamiento del Single Page Application (SPA), permitiendo transiciones fluidas entre el Home y las páginas de detalles. 
- **[React Flow (@xyflow/react)](https://reactflow.dev/)**: Para la creación de componentes visuales y diagramas vectoriales interactivos sobre arquitectura y lógica de sistemas.
- **[Vite](https://vitejs.dev/)**: Herramienta de compilación súper rápida y empaquetador para desarrollo.
- **[React Icons](https://react-icons.github.io/react-icons/)**: Para íconos limpios y modernos.
- **CSS3 Avanzado**: Animaciones personalizadas inspiradas en el ecosistema Apple, *Glassmorphism*, transiciones cúbicas (cubic-bezier) y escalabilidad *responsive* total en cualquier entorno móvil o escritorio.

## 📂 Características Principales

- **Diseño Premium & Glassmorphism:** Interfaz de estética oscura (Dark Theme) pulida y elegante enfocada en animaciones flotantes al interactuar con el *scroll* y el *hover*.
- **Sección de Habilidades (Skills):** Tarjetas técnicas dinámicas que destacan mis competencias en áreas como C/C++, Python, ensamblado, instrumentación, servidores web, concurrencia, Arduino y bases de datos.
- **Detalle de Proyectos (Ej. Concurrencia):** Presentaciones inmersivas y visuales de cada desarrollo. Incluye flujos estructurados que explican lógicas de red o software paso a paso (ej: Trazabilidad de Logs por SSH concurrente) utilizando diagramas totalmente interactivos y ajustables tanto en Desktop como en Smartphone.
- **Contacto:** Enlaces a mis perfiles sociales (LinkedIn, GitHub, etc.) listos para conectar.

## ⚙️ Instalación y Configuración

Si deseas clonar o correr este proyecto localmente, sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   cd portafoli_vite_appl
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Arrancar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   El proyecto estará disponible localmente, usualmente en `http://localhost:5173`.

4. **Construir para producción (Build):**
   ```bash
   npm run build
   ```
   Esto generará una carpeta `dist` lista para ser desplegada en cualquier servicio de hosting estático (como Vercel, Netlify, Hostinger, etc).

---

## 🧭 Despliegue y Resolución de Error 404 (Enrutamiento SPA)

Al usar herramientas modernas como `react-router-dom` dentro de un Single Page Application (SPA), todo el tráfico pasa lógicamente por el `index.html`. 

Si despliegas tu código y al recargar la página manualmente en una ruta (como `/projects/concurrencia`) obtienes un **Error 404**, significa que tu Proveedor Hosting está intentando buscar esa carpeta física en su disco en lugar de servir el `index.html`. 

Para solucionar esto de manera automatizada en cada `build`, debes asegurar que tu carpeta raíz `public/` tenga el archivo correcto según tu proveedor **antes de subirlo**. 

### 1. Hostinger / Apache / LiteSpeed (Configuración Actual del Proyecto)
Se requiere un archivo oculto `.htaccess` en tu carpeta `public/` o apuntado directamente dentro de la carpeta a desplegar. (Actualmente ya está configurado). 
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### 2. Netlify o Cloudflare Pages
Crear un archivo llamado **`_redirects`** sin extensión en tu carpeta `public/`:
```text
/*    /index.html   200
```

### 3. Vercel
En este caso **no** va en public, va en la **raíz de tu proyecto** (fuera de src), debes agregar o nombrar un archivo **`vercel.json`**:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 4. GitHub Pages
Debido a la forma en que GH Pages procesa los errores, la forma más utilizada es configurar Vite o un script en el `package.json` param que al finalizar tu `npm run build` simplemente copie tu archivo `dist/index.html` a un nuevo archivo idéntico llamado **`dist/404.html`**. 

## 📝 Autor

Desarrollado con mucha dedicación. ¡Sientete libre de contactarme a través de la sección de contacto en la página!

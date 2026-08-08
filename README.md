# 🐾 Bastet UI

Librería de componentes UI temáticos construida con **Bun, React 18, TypeScript, Vite (Library Mode), Storybook 10 y Ant Design Tokens**.

---

## 🛠️ Comandos del Proyecto

### 1. Instalar dependencias
```bash
bun install
```

### 2. Entorno de Desarrollo (Storybook)
Inicia Storybook en `http://localhost:6006` con la previsualización interactiva del catálogo de componentes y selector dinámico de los 5 temas (Light, Dark, Oriental, Black Metal, Barbie):
```bash
bun run dev
# o también:
bun run storybook
```

### 3. Compilar la Librería (`dist/`)
Genera los bundles de producción en formatos ESM, CJS, tipos TypeScript (`.d.ts`) y estilos en la carpeta `dist/`:
```bash
bun run build
```

### 4. Validar Tipos TypeScript
Verifica que no existan errores de compilación de TypeScript en el proyecto:
```bash
bun run lint
```

### 5. Compilar Storybook Estático
Genera los archivos estáticos de Storybook en `storybook-static/` (listos para desplegar en GitHub Pages, Vercel, Netlify):
```bash
bun run build-storybook
```

---

## 🎨 Temas Disponibles (`BstThemeProvider`)

- `light`: Tema claro limpio por defecto
- `dark`: Tema oscuro elegante
- `oriental`: Fondos cálidos estilo papel de arroz y acentos terracota
- `black-metal`: Fondos ultra negros `#000000` y acentos rojo/ceniza
- `barbie`: Fondos blush `#FFF5F8`, acentos hot pink y detalles magenta

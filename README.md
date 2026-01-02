# Sistema de Registro de Tiempo Profesional

Aplicación web moderna para llevar un registro preciso y ordenado del tiempo trabajado con cada cliente durante los sprints.

## 🚀 Tecnologías

- **React 19** - Biblioteca para construir la interfaz de usuario
- **TypeScript** - Lenguaje de programación para tipado estático
- **Vite** - Herramienta de construcción y desarrollo
- **Date-fns** - Para manejo de fechas y horas
- **Zod** - Para validación de datos

## 📋 Características

- ⏱️ Cronómetro para registrar tiempo trabajado
- 👥 Gestión de clientes y proyectos
- 📊 Dashboard con estadísticas y métricas
- 📝 Registros manuales de tiempo
- 🔍 Filtros avanzados para búsqueda de registros
- 💾 Persistencia local de datos (LocalStorage)
- 📤 Exportación de reportes (CSV/PDF)

## 🏗️ Estructura del Proyecto

```
project_timer/
├── src/
│   ├── components/      # Componentes React
│   │   ├── common/     # Componentes reutilizables
│   │   ├── timer/      # Componentes del cronómetro
│   │   ├── clients/    # Componentes de clientes
│   │   ├── projects/   # Componentes de proyectos
│   │   ├── records/    # Componentes de registros
│   │   └── dashboard/  # Componentes del dashboard
│   ├── contexts/       # Context API para estado global
│   ├── hooks/          # Hooks personalizados
│   ├── services/       # Servicios (storage, time, export)
│   ├── types/          # Tipos TypeScript
│   ├── utils/          # Utilidades y helpers
│   └── styles/         # Estilos globales
├── public/             # Archivos estáticos
└── PROYECTO.md        # Documentación detallada del proyecto
```

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 📜 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza el build de producción
- `npm run lint` - Ejecuta el linter
- `npm run lint:fix` - Ejecuta el linter y corrige errores automáticamente
- `npm run format` - Formatea el código con Prettier
- `npm run format:check` - Verifica el formato del código

## 📖 Documentación

Para más detalles sobre el proyecto, consulta el archivo [PROYECTO.md](./PROYECTO.md) que contiene:
- Descripción completa del proyecto
- Requisitos funcionales
- Arquitectura técnica
- Plan de implementación
- Modelo de datos
- Y mucho más...

## 🎯 Estado del Proyecto

**Estado Actual**: Estructura base creada - Listo para implementar lógica

- ✅ Estructura de carpetas completa
- ✅ Tipos TypeScript definidos
- ✅ Componentes base creados (sin lógica)
- ✅ Contexts, hooks y services estructurados
- ✅ Configuración de herramientas de desarrollo
- ⏳ Pendiente: Implementar lógica de negocio

## 📝 Próximos Pasos

1. Implementar lógica en los Contexts
2. Conectar componentes con el estado global
3. Implementar persistencia de datos
4. Agregar validaciones y manejo de errores
5. Implementar exportación de reportes
6. Agregar gráficos al dashboard

## 🤝 Contribución

Este es un proyecto interno. Para contribuir:

1. Crear una rama para la nueva funcionalidad
2. Implementar los cambios
3. Asegurar que el código pase el linter y formateador
4. Crear un pull request

## 📄 Licencia

Proyecto interno de la empresa.

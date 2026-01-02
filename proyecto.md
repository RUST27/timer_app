# Sistema de Registro de Tiempo Profesional

## 📋 Descripción del Proyecto

### Contexto
Este proyecto surge de la necesidad de mejorar el proceso de registro de horas trabajadas en una empresa que adapta modelos de negocio para compañías utilizando Monday.com. Actualmente, el registro de tiempo se realiza de manera manual utilizando el reloj de la computadora, lo cual resulta impreciso y poco profesional.

### Objetivo
Desarrollar una aplicación web moderna y profesional para llevar un registro preciso y ordenado del tiempo trabajado con cada cliente durante los sprints, permitiendo un seguimiento más exacto y una mejor gestión del tiempo de trabajo.

### Alcance
La aplicación permitirá:
- Registrar tiempo trabajado por cliente/proyecto
- Iniciar y detener cronómetros para diferentes tareas
- Visualizar el tiempo acumulado por cliente, proyecto y período
- Exportar reportes de tiempo trabajado
- Mantener un historial completo de registros
- Integración futura con Monday.com (opcional)

---

## 🎯 Requisitos Funcionales

### RF-01: Gestión de Clientes
- **Descripción**: El sistema debe permitir crear, editar y eliminar clientes.
- **Prioridad**: Alta
- **Criterios de aceptación**:
  - Crear nuevo cliente con nombre y descripción opcional
  - Editar información de clientes existentes
  - Eliminar clientes (con validación de registros asociados)
  - Listar todos los clientes registrados

### RF-02: Gestión de Proyectos/Tareas
- **Descripción**: Asociar proyectos o tareas específicas a cada cliente.
- **Prioridad**: Alta
- **Criterios de aceptación**:
  - Crear proyectos asociados a un cliente
  - Editar y eliminar proyectos
  - Cada proyecto puede tener múltiples tareas
  - Asignar categorías o etiquetas a proyectos

### RF-03: Cronómetro de Tiempo
- **Descripción**: Sistema de cronómetro para registrar tiempo trabajado.
- **Prioridad**: Crítica
- **Criterios de aceptación**:
  - Iniciar cronómetro para un cliente/proyecto específico
  - Pausar y reanudar el cronómetro
  - Detener el cronómetro y guardar el tiempo registrado
  - Solo un cronómetro activo a la vez
  - Mostrar tiempo transcurrido en tiempo real
  - Guardar automáticamente el tiempo cada minuto (opcional)

### RF-04: Registro Manual de Tiempo
- **Descripción**: Permitir agregar tiempo trabajado manualmente.
- **Prioridad**: Media
- **Criterios de aceptación**:
  - Ingresar fecha, hora de inicio, hora de fin y duración
  - Validar que la hora de fin sea posterior a la de inicio
  - Agregar descripción/notas al registro
  - Calcular automáticamente la duración basada en horas de inicio y fin

### RF-05: Visualización de Registros
- **Descripción**: Mostrar todos los registros de tiempo de manera organizada.
- **Prioridad**: Alta
- **Criterios de aceptación**:
  - Listar registros ordenados por fecha (más recientes primero)
  - Filtrar por cliente, proyecto, fecha o rango de fechas
  - Mostrar duración total por cliente/proyecto
  - Vista de calendario o timeline (opcional)
  - Resumen diario, semanal y mensual

### RF-06: Dashboard y Estadísticas
- **Descripción**: Panel de control con métricas y estadísticas de tiempo.
- **Prioridad**: Media
- **Criterios de aceptación**:
  - Tiempo total trabajado hoy, esta semana, este mes
  - Tiempo por cliente (gráfico de barras o pie chart)
  - Tiempo por proyecto
  - Comparativa entre períodos
  - Promedio de horas diarias

### RF-07: Exportación de Reportes
- **Descripción**: Generar y exportar reportes de tiempo trabajado.
- **Prioridad**: Media
- **Criterios de aceptación**:
  - Exportar a CSV
  - Exportar a PDF (opcional)
  - Filtrar por rango de fechas antes de exportar
  - Incluir resumen y detalles en el reporte

### RF-08: Persistencia de Datos
- **Descripción**: Almacenar todos los datos localmente.
- **Prioridad**: Crítica
- **Criterios de aceptación**:
  - Usar LocalStorage o IndexedDB para persistencia
  - Los datos deben persistir entre sesiones
  - Backup automático de datos (opcional)
  - Exportar/importar datos completos

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico

#### Frontend
- **React 18+**: Biblioteca para construir la interfaz de usuario
- **TypeScript**: Lenguaje de programación para tipado estático
- **Vite**: Herramienta de construcción y desarrollo
- **CSS Modules o Styled Components**: Para estilos modulares
- **Date-fns o Day.js**: Para manejo de fechas y horas

#### Estado y Datos
- **React Context API + useReducer**: Para gestión de estado global
- **LocalStorage/IndexedDB**: Para persistencia de datos
- **Zod o Yup**: Para validación de datos (opcional)

#### Herramientas de Desarrollo
- **ESLint**: Linter para mantener calidad de código
- **Prettier**: Formateador de código
- **TypeScript Strict Mode**: Para máxima seguridad de tipos

### Estructura del Proyecto

```
project_timer/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   └── Card/
│   │   ├── timer/
│   │   │   ├── TimerDisplay/
│   │   │   ├── TimerControls/
│   │   │   └── ActiveTimer/
│   │   ├── clients/
│   │   │   ├── ClientList/
│   │   │   ├── ClientForm/
│   │   │   └── ClientCard/
│   │   ├── projects/
│   │   │   ├── ProjectList/
│   │   │   ├── ProjectForm/
│   │   │   └── ProjectCard/
│   │   ├── records/
│   │   │   ├── RecordList/
│   │   │   ├── RecordForm/
│   │   │   ├── RecordCard/
│   │   │   └── RecordFilters/
│   │   └── dashboard/
│   │       ├── StatsCards/
│   │       ├── TimeChart/
│   │       └── SummaryTable/
│   ├── contexts/
│   │   ├── TimerContext.tsx
│   │   ├── ClientContext.tsx
│   │   ├── ProjectContext.tsx
│   │   └── RecordContext.tsx
│   ├── hooks/
│   │   ├── useTimer.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useTimeFormat.ts
│   │   └── useRecords.ts
│   ├── services/
│   │   ├── storage/
│   │   │   ├── localStorage.ts
│   │   │   └── indexedDB.ts
│   │   ├── time/
│   │   │   ├── timeCalculations.ts
│   │   │   └── timeFormatting.ts
│   │   └── export/
│   │       ├── csvExport.ts
│   │       └── pdfExport.ts
│   ├── types/
│   │   ├── Client.ts
│   │   ├── Project.ts
│   │   ├── TimeRecord.ts
│   │   └── Timer.ts
│   ├── utils/
│   │   ├── validators.ts
│   │   ├── dateHelpers.ts
│   │   └── constants.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 📊 Modelo de Datos

### Cliente (Client)
```typescript
interface Client {
  id: string;
  name: string;
  description?: string;
  color?: string; // Para identificación visual
  createdAt: Date;
  updatedAt: Date;
}
```

### Proyecto (Project)
```typescript
interface Project {
  id: string;
  clientId: string;
  name: string;
  description?: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Registro de Tiempo (TimeRecord)
```typescript
interface TimeRecord {
  id: string;
  clientId: string;
  projectId?: string;
  startTime: Date;
  endTime: Date;
  duration: number; // en milisegundos
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Cronómetro Activo (ActiveTimer)
```typescript
interface ActiveTimer {
  id: string;
  clientId: string;
  projectId?: string;
  startTime: Date;
  pausedTime?: number; // tiempo acumulado en pausa
  isPaused: boolean;
}
```

---

## 🎨 Diseño de Interfaz

### Principios de Diseño
- **Simplicidad**: Interfaz limpia y fácil de usar
- **Claridad**: Información visible y fácil de entender
- **Responsive**: Adaptable a diferentes tamaños de pantalla
- **Accesibilidad**: Cumplir con estándares WCAG básicos

### Pantallas Principales

#### 1. Dashboard
- Resumen de tiempo trabajado (hoy, semana, mes)
- Gráficos de distribución de tiempo
- Lista de clientes más activos
- Cronómetro rápido si no hay uno activo

#### 2. Cronómetro
- Display grande del tiempo transcurrido
- Selector de cliente y proyecto
- Botones: Iniciar, Pausar, Detener, Cancelar
- Indicador visual del cronómetro activo

#### 3. Registros
- Tabla/listado de todos los registros
- Filtros por cliente, proyecto, fecha
- Botón para agregar registro manual
- Acciones: Editar, Eliminar, Duplicar

#### 4. Clientes
- Lista de clientes con tarjetas
- Botón para crear nuevo cliente
- Acciones: Editar, Eliminar, Ver estadísticas

#### 5. Proyectos
- Lista de proyectos agrupados por cliente
- Crear/editar proyectos
- Asociar proyectos a clientes

---

## ⚙️ Funcionalidades Detalladas

### Cronómetro

#### Flujo de Uso
1. Usuario selecciona cliente (y opcionalmente proyecto)
2. Presiona "Iniciar" para comenzar el cronómetro
3. El cronómetro muestra tiempo transcurrido en formato HH:MM:SS
4. Usuario puede pausar y reanudar
5. Al detener, se muestra modal para agregar descripción
6. El registro se guarda automáticamente

#### Características Técnicas
- Usar `requestAnimationFrame` o `setInterval` para actualización suave
- Guardar estado del cronómetro en localStorage (por si se cierra la app)
- Notificación visual/sonora opcional al alcanzar ciertos tiempos
- Prevención de múltiples cronómetros simultáneos

### Gestión de Registros

#### Validaciones
- No permitir registros con duración cero
- No permitir registros futuros
- Validar que no haya solapamiento de tiempos (opcional)
- Validar formato de fechas y horas

#### Operaciones
- Crear: Desde cronómetro o manualmente
- Leer: Listar con filtros y paginación
- Actualizar: Editar registros existentes
- Eliminar: Con confirmación

### Persistencia

#### Estrategia de Almacenamiento
- **LocalStorage**: Para datos pequeños y configuración
- **IndexedDB**: Para grandes volúmenes de registros (escalable)
- **Sincronización**: Guardar cambios inmediatamente
- **Backup**: Exportar datos periódicamente

#### Esquema de Almacenamiento
```typescript
// Estructura en LocalStorage/IndexedDB
{
  clients: Client[];
  projects: Project[];
  records: TimeRecord[];
  settings: {
    theme: 'light' | 'dark';
    defaultClient?: string;
    autoSave: boolean;
    notifications: boolean;
  };
}
```

---

## 🔄 Flujos de Usuario

### Flujo 1: Registrar Tiempo con Cronómetro
```
1. Usuario abre la aplicación
2. Navega a la sección "Cronómetro"
3. Selecciona cliente del dropdown
4. (Opcional) Selecciona proyecto
5. Presiona "Iniciar"
6. Trabaja en la tarea
7. Presiona "Detener" cuando termina
8. Agrega descripción en el modal
9. Confirma y guarda
10. El registro aparece en la lista de registros
```

### Flujo 2: Agregar Registro Manual
```
1. Usuario navega a "Registros"
2. Presiona "Agregar Registro"
3. Completa el formulario:
   - Cliente (requerido)
   - Proyecto (opcional)
   - Fecha
   - Hora de inicio
   - Hora de fin
   - Descripción (opcional)
4. El sistema calcula la duración automáticamente
5. Usuario confirma y guarda
6. El registro se agrega a la lista
```

### Flujo 3: Ver Estadísticas
```
1. Usuario navega a "Dashboard"
2. Ve resumen de tiempo trabajado
3. Selecciona período (día, semana, mes)
4. Ve gráficos de distribución
5. Puede filtrar por cliente
6. Exporta reporte si lo necesita
```

---

## 🚀 Plan de Implementación

### Fase 1: Configuración y Estructura Base (Semana 1)
- [ ] Configurar proyecto con Vite + React + TypeScript
- [ ] Configurar ESLint y Prettier
- [ ] Crear estructura de carpetas
- [ ] Definir tipos TypeScript
- [ ] Configurar sistema de estilos
- [ ] Crear componentes base (Button, Input, Card)

### Fase 2: Gestión de Datos (Semana 1-2)
- [ ] Implementar servicios de almacenamiento (LocalStorage/IndexedDB)
- [ ] Crear Context API para estado global
- [ ] Implementar hooks personalizados
- [ ] Crear funciones de validación
- [ ] Implementar helpers de fecha/hora

### Fase 3: Gestión de Clientes y Proyectos (Semana 2)
- [ ] Crear componentes de lista de clientes
- [ ] Implementar formulario de cliente
- [ ] Crear componentes de proyectos
- [ ] Implementar CRUD completo para clientes
- [ ] Implementar CRUD completo para proyectos

### Fase 4: Cronómetro (Semana 2-3)
- [ ] Crear componente de display del cronómetro
- [ ] Implementar lógica de cronómetro (iniciar, pausar, detener)
- [ ] Crear selector de cliente/proyecto
- [ ] Implementar guardado automático del estado
- [ ] Agregar validaciones y manejo de errores

### Fase 5: Registros de Tiempo (Semana 3)
- [ ] Crear componente de lista de registros
- [ ] Implementar formulario de registro manual
- [ ] Crear sistema de filtros
- [ ] Implementar edición y eliminación
- [ ] Agregar validaciones

### Fase 6: Dashboard y Estadísticas (Semana 4)
- [ ] Crear componentes de estadísticas
- [ ] Implementar cálculos de tiempo (día, semana, mes)
- [ ] Crear gráficos (usar librería como Recharts o Chart.js)
- [ ] Implementar resúmenes y comparativas

### Fase 7: Exportación y Reportes (Semana 4)
- [ ] Implementar exportación a CSV
- [ ] Implementar exportación a PDF (opcional)
- [ ] Crear plantillas de reportes
- [ ] Agregar filtros para exportación

### Fase 8: Pulido y Optimización (Semana 5)
- [ ] Mejorar UI/UX
- [ ] Optimizar rendimiento
- [ ] Agregar animaciones y transiciones
- [ ] Implementar modo oscuro (opcional)
- [ ] Testing manual completo
- [ ] Documentación de usuario

---

## 🧪 Testing

### Estrategia de Testing
- **Testing Manual**: Pruebas funcionales de cada feature
- **Testing de Integración**: Verificar flujos completos
- **Testing de Usabilidad**: Validar experiencia de usuario

### Casos de Prueba Críticos
1. Cronómetro: Iniciar, pausar, reanudar, detener
2. Persistencia: Datos se guardan correctamente
3. Validaciones: Formularios rechazan datos inválidos
4. Filtros: Funcionan correctamente en registros
5. Exportación: CSV contiene datos correctos
6. Cálculos: Tiempos se calculan correctamente

---

## 📦 Dependencias Principales

### Producción
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "date-fns": "^2.30.0",
  "zod": "^3.22.0"
}
```

### Desarrollo
```json
{
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0",
  "@typescript-eslint/eslint-plugin": "^6.0.0",
  "@typescript-eslint/parser": "^6.0.0",
  "@vitejs/plugin-react": "^4.0.0",
  "eslint": "^8.45.0",
  "prettier": "^3.0.0",
  "typescript": "^5.0.0",
  "vite": "^4.4.0"
}
```

### Opcionales
```json
{
  "recharts": "^2.8.0", // Para gráficos
  "jspdf": "^2.5.0", // Para exportación PDF
  "react-router-dom": "^6.15.0" // Para navegación (si se necesita)
}
```

---

## 🔐 Consideraciones de Seguridad y Privacidad

### Datos Locales
- Todos los datos se almacenan localmente en el navegador
- No se envían datos a servidores externos
- El usuario tiene control total sobre sus datos
- Implementar opción de exportar/importar para backup

### Validación
- Validar todos los inputs del usuario
- Sanitizar datos antes de guardar
- Prevenir inyección de código en descripciones

---

## 🎯 Métricas de Éxito

### Objetivos Cuantitativos
- Precisión del tiempo registrado: ±1 minuto
- Tiempo de carga inicial: < 2 segundos
- Tiempo de respuesta de acciones: < 100ms
- Disponibilidad: 100% (aplicación offline)

### Objetivos Cualitativos
- Interfaz intuitiva y fácil de usar
- Reducción del tiempo de registro vs método manual
- Mejora en la precisión del registro de tiempo
- Satisfacción del usuario con la herramienta

---

## 🔮 Mejoras Futuras (Roadmap)

### Versión 2.0
- [ ] Integración con Monday.com API
- [ ] Sincronización en la nube (Firebase/Supabase)
- [ ] Aplicación móvil (React Native)
- [ ] Notificaciones push
- [ ] Recordatorios de registro de tiempo
- [ ] Análisis avanzado y reportes personalizados

### Versión 3.0
- [ ] Colaboración en equipo
- [ ] Asignación de tareas
- [ ] Integración con más herramientas (Slack, Jira, etc.)
- [ ] IA para categorización automática de tiempo
- [ ] Predicción de tiempo de proyectos

---

## 📝 Notas de Desarrollo

### Convenciones de Código
- Usar TypeScript estricto
- Componentes funcionales con hooks
- Nombres descriptivos en inglés para código
- Comentarios en español para documentación
- Formato consistente con Prettier

### Git Workflow
- Branch principal: `main`
- Branches de feature: `feature/nombre-feature`
- Commits descriptivos en español
- Pull requests para revisión

### Performance
- Lazy loading de componentes pesados
- Memoización de cálculos costosos
- Virtualización de listas largas
- Optimización de re-renders

---

## 👥 Roles y Responsabilidades

### Desarrollador
- Implementar todas las funcionalidades
- Mantener calidad de código
- Documentar el código
- Realizar testing

### Usuario Final
- Proporcionar feedback
- Reportar bugs
- Sugerir mejoras

---

## 📚 Recursos y Referencias

### Documentación
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Date-fns Documentation](https://date-fns.org/)

### Inspiración
- Toggl Track
- Clockify
- RescueTime
- Harvest

---

## ✅ Checklist de Lanzamiento

### Pre-lanzamiento
- [ ] Todas las funcionalidades core implementadas
- [ ] Testing completo realizado
- [ ] Documentación de usuario creada
- [ ] UI/UX pulida y consistente
- [ ] Performance optimizada
- [ ] Datos de prueba limpiados
- [ ] README actualizado

### Post-lanzamiento
- [ ] Monitoreo de uso
- [ ] Recolección de feedback
- [ ] Corrección de bugs críticos
- [ ] Planificación de mejoras

---

## 📞 Soporte y Mantenimiento

### Mantenimiento
- Revisión mensual de bugs
- Actualización de dependencias trimestral
- Mejoras incrementales basadas en feedback

### Soporte
- Documentación de usuario
- FAQ de problemas comunes
- Canal de comunicación para reportes

---

**Versión del Documento**: 1.0  
**Última Actualización**: 2024  
**Autor**: Equipo de Desarrollo  
**Estado**: En Planificación


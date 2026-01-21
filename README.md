# Panadería App - Sistema de Gestión

Sistema completo de gestión para negocios de panadería y comidas caseras. Permite administrar clientes, cocineras, pedidos, productos e ingredientes con cálculo automático de costos.

## 🚀 Características Principales

- **Gestión de Clientes**: CRUD completo con historial de pedidos
- **Gestión de Cocineras**: Seguimiento de ventas y pedidos asignados
- **Gestión de Pedidos**: 
  - Crear pedidos con múltiples productos
  - Actualizar estados (Confirmado, En preparación, Listo, Entregado, Cancelado)
  - Asignar cocineras
  - Seguimiento de fechas de entrega
- **Gestión de Productos**:
  - CRUD de productos
  - Gestión de recetas con ingredientes
  - Cálculo automático de costos
  - Análisis de márgenes de ganancia
- **Gestión de Ingredientes**: Control de inventario con costos por kilogramo
- **Dashboard**: Resumen de pedidos y estadísticas en tiempo real

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Biblioteca UI
- **Vite** - Build tool y dev server
- **React Router v6** - Navegación
- **Tailwind CSS** - Estilos
- **React Hook Form** - Manejo de formularios
- **Zustand** - Estado global
- **Axios** - Peticiones HTTP
- **Lucide React** - Iconografía

### Backend
- **Node.js** - Runtime
- **Express** - Framework web
- **Prisma ORM** - ORM para base de datos
- **PostgreSQL** - Base de datos

### Deployment
- **Vercel** - Hosting (frontend y backend serverless)
- **Vercel Postgres** - Base de datos en producción

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- PostgreSQL (para desarrollo local)

## 🏗️ Estructura del Proyecto

```
panaderia-app/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   │   ├── Layout/
│   │   │   ├── Cocineras/
│   │   │   ├── Clientes/
│   │   │   ├── Pedidos/
│   │   │   ├── Productos/
│   │   │   └── Ingredientes/
│   │   ├── pages/          # Páginas de la aplicación
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API service layer
│   │   ├── store/          # Estado global (Zustand)
│   │   ├── utils/          # Funciones utilitarias
│   │   ├── App.jsx         # Componente principal
│   │   └── main.jsx        # Entry point
│   └── package.json
├── server/                 # Backend API
│   ├── src/
│   │   ├── routes/         # Rutas de la API
│   │   ├── controllers/    # Controladores
│   │   ├── middleware/     # Middleware
│   │   └── index.js        # Servidor Express
│   ├── prisma/
│   │   └── schema.prisma   # Schema de base de datos
│   └── package.json
├── .gitignore
├── .env.example
├── vercel.json             # Configuración de Vercel
└── README.md
```

## 🚀 Instalación y Configuración Local

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd panaderia-app
```

### 2. Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto basado en `.env.example`:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/panaderia"

# Server
PORT=3001
NODE_ENV=development

# Client
VITE_API_URL=http://localhost:3001/api
```

### 3. Instalar dependencias

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

### 4. Configurar la base de datos

```bash
cd server
npx prisma generate
npx prisma db push
```

### 5. Ejecutar en modo desarrollo

Abrir dos terminales:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

La aplicación estará disponible en:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001/api

## 📊 Modelo de Datos

### Entidades Principales

- **Cocinera**: Gestión de cocineras con tracking de ventas
- **Cliente**: Información de clientes y su historial
- **Pedido**: Pedidos con estados, fechas y detalles
- **Producto**: Catálogo de productos con costos y precios
- **Ingrediente**: Ingredientes con costos por kg
- **Receta**: Relación many-to-many entre Productos e Ingredientes
- **DetallePedido**: Relación many-to-many entre Pedidos y Productos

### Relaciones

- Un Cliente puede tener múltiples Pedidos
- Una Cocinera puede tener múltiples Pedidos asignados
- Un Pedido tiene múltiples DetallePedido (productos)
- Un Producto tiene múltiples Recetas (ingredientes con cantidades)

## 🎨 Paleta de Colores

El diseño utiliza tonos cálidos apropiados para una panadería:

- **Naranja**: `#FF8C42` (bakery-orange)
- **Marrón**: `#8B4513` (bakery-brown)
- **Beige**: `#F5DEB3` (bakery-beige)
- **Crema**: `#FFF8DC` (bakery-cream)

## 🔑 API Endpoints

### Cocineras
- `GET /api/cocineras` - Listar todas
- `POST /api/cocineras` - Crear nueva
- `GET /api/cocineras/:id` - Obtener por ID
- `PUT /api/cocineras/:id` - Actualizar
- `DELETE /api/cocineras/:id` - Eliminar

### Clientes
- `GET /api/clientes` - Listar todos
- `POST /api/clientes` - Crear nuevo
- `GET /api/clientes/:id` - Obtener por ID
- `PUT /api/clientes/:id` - Actualizar
- `DELETE /api/clientes/:id` - Eliminar

### Pedidos
- `GET /api/pedidos` - Listar todos
- `POST /api/pedidos` - Crear nuevo
- `GET /api/pedidos/:id` - Obtener por ID
- `PUT /api/pedidos/:id` - Actualizar
- `PATCH /api/pedidos/:id/estado` - Actualizar estado
- `DELETE /api/pedidos/:id` - Eliminar

### Productos
- `GET /api/productos` - Listar todos
- `POST /api/productos` - Crear nuevo
- `GET /api/productos/:id` - Obtener por ID
- `PUT /api/productos/:id` - Actualizar
- `DELETE /api/productos/:id` - Eliminar
- `GET /api/productos/:id/receta` - Obtener receta
- `PUT /api/productos/:id/receta` - Actualizar receta

### Ingredientes
- `GET /api/ingredientes` - Listar todos
- `POST /api/ingredientes` - Crear nuevo
- `GET /api/ingredientes/:id` - Obtener por ID
- `PUT /api/ingredientes/:id` - Actualizar
- `DELETE /api/ingredientes/:id` - Eliminar

## 🌐 Despliegue en Vercel

Para instrucciones completas de despliegue, consulta **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guía paso a paso con capturas de pantalla y solución de problemas.

### Inicio Rápido

**Opción 1: Script Automático**
```bash
./deploy-vercel.sh
```

**Opción 2: Manual**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

### Requisitos
- Cuenta de Vercel (gratis en [vercel.com](https://vercel.com))
- Base de datos PostgreSQL (Vercel Postgres recomendado)

### Variables de Entorno Requeridas
```
DATABASE_URL=postgresql://...
NODE_ENV=production
VITE_API_URL=/api
```

Ver **[DEPLOYMENT.md](./DEPLOYMENT.md)** para configuración completa.

## 🧪 Scripts Disponibles

### Frontend (client/)
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Preview del build
- `npm run lint` - Linter

### Backend (server/)
- `npm run dev` - Servidor con nodemon
- `npm start` - Servidor en producción
- `npm run db:generate` - Generar Prisma Client
- `npm run db:push` - Push schema a la base de datos
- `npm run db:migrate` - Crear migración
- `npm run db:studio` - Abrir Prisma Studio

## 📝 Funcionalidades Clave

### Cálculo Automático de Costos

El sistema calcula automáticamente:
- Costo total de productos basado en recetas
- Margen de ganancia (absoluto y porcentaje)
- Precio total de pedidos

### Gestión de Estados de Pedidos

Los pedidos pueden tener los siguientes estados:
- **Confirmado**: Pedido recibido
- **En preparación**: En proceso de elaboración
- **Listo**: Terminado, listo para entregar
- **Entregado**: Entregado al cliente
- **Cancelado**: Pedido cancelado

### Validaciones

- Formularios con validación en tiempo real
- Confirmaciones antes de eliminar
- Mensajes de error informativos en español
- Loading states en todas las operaciones async

## 🔒 Seguridad

- Validación de datos en backend
- Manejo de errores centralizado
- CORS configurado
- Variables de entorno para datos sensibles

## 🤝 Contribuir

Este proyecto es para uso interno del negocio de panadería.

## 📄 Licencia

MIT

## 👥 Autor

Equipo de desarrollo Panadería App

## 📞 Soporte

Para soporte, contactar al administrador del sistema.
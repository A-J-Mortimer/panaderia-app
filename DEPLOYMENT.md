# Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar la aplicación Panadería en Vercel paso a paso.

## 📋 Pre-requisitos

- Cuenta de GitHub (ya tienes el código en GitHub ✅)
- Cuenta de Vercel (gratuita): [vercel.com/signup](https://vercel.com/signup)
- El código debe estar en GitHub (ya está ✅)

## 🚀 Pasos de Despliegue

### 1. Preparar Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub
2. Haz clic en "Add New Project"
3. Importa el repositorio `A-J-Mortimer/panaderia-app`
4. Vercel detectará automáticamente la configuración

### 2. Configurar Base de Datos Postgres

**Opción A: Usar Vercel Postgres (Recomendado)**

1. En tu proyecto de Vercel, ve a la pestaña **Storage**
2. Haz clic en **Create Database**
3. Selecciona **Postgres**
4. Dale un nombre (ej: `panaderia-db`)
5. Selecciona la región más cercana (ej: `us-east-1` o `sao-paulo-1` para Sudamérica)
6. Haz clic en **Create**
7. Vercel automáticamente agregará las variables de entorno necesarias

**Opción B: Usar base de datos externa**

Puedes usar cualquier proveedor de PostgreSQL como:
- [Supabase](https://supabase.com) (Gratis)
- [Neon](https://neon.tech) (Gratis)
- [Railway](https://railway.app) (Gratis con límites)

### 3. Configurar Variables de Entorno

En tu proyecto de Vercel, ve a **Settings** → **Environment Variables** y agrega:

#### Variables Requeridas:

```
DATABASE_URL=postgresql://...  (se autocompleta si usas Vercel Postgres)
NODE_ENV=production
```

#### Variables Opcionales del Cliente:

```
VITE_API_URL=/api  (usa ruta relativa para producción)
```

**Importante:** Las variables que empiezan con `VITE_` deben agregarse como **Environment Variables** visibles para el **Build**.

### 4. Configurar Build Settings

Vercel debería detectar automáticamente estas configuraciones del `vercel.json`:

- **Build Command**: `cd client && npm install && npm run build`
- **Output Directory**: `client/dist`
- **Install Command**: `npm install --prefix client && npm install --prefix server`

Si no se detectan, configúralas manualmente en **Settings** → **General** → **Build & Development Settings**.

### 5. Inicializar Base de Datos

Después del primer despliegue, necesitas inicializar el schema de Prisma:

**Opción A: Desde Vercel CLI (Recomendado)**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login a Vercel
vercel login

# Link al proyecto
vercel link

# Ejecutar comando de Prisma
vercel env pull .env.production
cd server
DATABASE_URL="tu_database_url_de_vercel" npx prisma db push
```

**Opción B: Script de deployment**

1. Crea un archivo `deploy.sh`:

```bash
#!/bin/bash
cd server
npx prisma generate
npx prisma db push --skip-generate
```

2. Agrega al `package.json` del servidor:

```json
{
  "scripts": {
    "vercel-build": "prisma generate && prisma db push --skip-generate || true"
  }
}
```

### 6. Desplegar

1. Haz clic en **Deploy** en Vercel
2. Vercel construirá y desplegará tu aplicación
3. El proceso toma aproximadamente 2-3 minutos
4. Una vez completado, recibirás una URL como: `https://panaderia-app.vercel.app`

### 7. Verificar Despliegue

1. Visita la URL de tu aplicación
2. Deberías ver el dashboard de la panadería
3. Prueba crear un cliente o ingrediente para verificar que la base de datos funciona

## 🔧 Configuración Avanzada

### Dominio Personalizado

1. Ve a **Settings** → **Domains**
2. Agrega tu dominio personalizado (ej: `panaderia.tudominio.com`)
3. Sigue las instrucciones para configurar DNS

### Reiniciar Base de Datos

Si necesitas reiniciar la base de datos:

```bash
# Conectarse con Vercel CLI
vercel env pull
cd server

# Ver estado actual
npx prisma studio

# Resetear base de datos (¡CUIDADO! Borra todos los datos)
DATABASE_URL="tu_url" npx prisma db push --force-reset
```

### Variables de Entorno por Ambiente

Puedes configurar diferentes valores para:
- **Production**: URLs de producción
- **Preview**: Para pull requests
- **Development**: Para desarrollo local

## 📊 Monitoreo

### Ver Logs

1. En Vercel, ve a tu proyecto
2. Haz clic en **Deployments**
3. Selecciona el deployment activo
4. Ve a **Functions** → **Logs** para ver logs del backend

### Analytics

Vercel incluye analytics automáticamente:
- Ve a **Analytics** en tu proyecto
- Verás visitas, performance, y más

## 🐛 Solución de Problemas

### Error: "Prisma Client not found"

**Solución:**
```bash
# Agrega a server/package.json
"scripts": {
  "postinstall": "prisma generate"
}
```

### Error: "Database connection failed"

**Solución:**
- Verifica que `DATABASE_URL` esté configurada correctamente
- Asegúrate de que la base de datos esté activa
- Verifica que la IP de Vercel esté permitida (si usas base de datos externa)

### Error: "Build failed"

**Solución:**
- Revisa los logs de build en Vercel
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que el código compile localmente con `npm run build`

### Frontend carga pero API no funciona

**Solución:**
- Verifica que `VITE_API_URL=/api` esté configurada
- Revisa los logs de las funciones en Vercel
- Verifica que las rutas de API empiecen con `/api`

### Prisma Schema no se aplica

**Solución:**
```bash
# Conecta manualmente y aplica el schema
vercel env pull .env.local
cd server
source ../.env.local  # o usa el DATABASE_URL directamente
npx prisma db push
```

## 🔄 Actualizar Aplicación

Para actualizar la aplicación:

1. Haz commit de tus cambios:
```bash
git add .
git commit -m "Tu mensaje"
git push origin main
```

2. Vercel automáticamente detectará el push y desplegará la nueva versión
3. Recibirás un email cuando el deployment esté listo

## 📱 Preview Deployments

Cada Pull Request automáticamente obtiene su propio preview deployment:
- URL única temporal
- Prueba cambios antes de mergear
- Comparte con equipo para revisión

## 💡 Consejos

1. **Usa Vercel Postgres** para simplicidad - todo en un solo lugar
2. **Configura dominios** para URLs profesionales
3. **Revisa Analytics** regularmente para entender uso
4. **Mantén backups** de la base de datos regularmente
5. **Usa Preview Deployments** para probar cambios

## 🔐 Seguridad

- ✅ Nunca commitas archivos `.env` al repositorio
- ✅ Usa variables de entorno de Vercel
- ✅ Mantén `DATABASE_URL` privada
- ✅ Revisa los logs regularmente

## 📞 Soporte

- [Documentación de Vercel](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- [Prisma Docs](https://www.prisma.io/docs)

---

¡Tu aplicación de panadería ahora está lista para producción! 🎉🥖

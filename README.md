# Matrix Stats Node.js API

Esta API procesa los resultados de una factorización QR (matrices Q y R) obtenidos desde una API en Go, calcula estadísticas avanzadas y proporciona autenticación segura.

## Características

- **Arquitectura en Capas**: Controllers, Routes, Middlewares, Services, Repositories.
- **SQL Puro**: Interacción con PostgreSQL utilizando el driver nativo `pg` (sin ORM).
- **Autenticación**: JWT y Bcrypt para registro e inicio de sesión.
- **Estadísticas**: Valor Máximo, Mínimo, Promedio, Suma Total y Verificación de Matriz Diagonal.
- **Documentación**: Swagger/Scalar interactivo en `/docs`.
- **Containerización**: Docker con soporte para Desarrollo (Hot-reload) y Producción.
- **Serverless Ready**: Preparado para desplegar en AWS Lambda con el Framework Serverless.
- **Testing**: Pruebas unitarias e integración con Jest y Supertest.

## Requisitos

- [Bun](https://bun.sh/) (Recomendado) o Node.js.
- Docker & Docker Compose.

## Configuración

1. Clonar el repositorio y crear un archivo `.env`:
   ```bash
   cp .env.example .env # O crear uno basado en la sección de variables de entorno
   ```

2. Variables de entorno necesarias:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=user_admin
   DB_PASSWORD=password123
   DB_NAME=matrices_node_db
   JWT_SECRET=tu_secreto_super_seguro
   JWT_EXPIRES_IN=1h
   DB_SSL=false
   ```

## Desarrollo Local

### Con Docker (Recomendado)
Levanta la API y la base de datos con un solo comando (incluye Hot-reload):
```bash
docker-compose up --build
```

### Manual (Con Bun)
1. Instalar dependencias:
   ```bash
   bun install
   ```
2. Levantar solo la base de datos:
   ```bash
   docker-compose up -d db
   ```
3. Ejecutar la API:
   ```bash
   bun run dev
   ```

## Pruebas

Ejecutar la suite de pruebas unitarias y de integración:
```bash
bun test
```

## Despliegue

### Docker (Producción)
Para construir la imagen optimizada de producción:
```bash
docker build --target production -t matrix-api:prod .
```

### AWS Lambda (Serverless)
1. Instalar plugins necesarios:
   ```bash
   bun add serverless-http && bun add -D serverless serverless-offline serverless-plugin-typescript
   ```
2. Probar localmente como Lambda:
   ```bash
   bun run sls:offline
   ```
3. Desplegar a AWS:
   ```bash
   bun run sls:deploy
   ```

## Documentación

Accede a la documentación interactiva en: `http://localhost:3000/docs`

## Endpoints

- `POST /api/auth/register`: Registro de usuario.
- `POST /api/auth/login`: Login y obtención de JWT.
- `POST /api/matrix/stats`: Estadísticas de matrices (Requiere Bearer Token).

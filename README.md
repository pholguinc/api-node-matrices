# Matrix Stats Node.js API

Esta API procesa los resultados de una factorización QR (matrices Q y R) obtenidos desde una API en Go, calcula estadísticas avanzadas y proporciona autenticación segura.

## Características

- **Arquitectura en Capas**: Controllers, Routes, Middlewares, Services, Repositories.
- **Autenticación**: JWT y Bcrypt para registro e inicio de sesión.
- **Estadísticas**:
  - Valor Máximo.
  - Valor Mínimo.
  - Promedio.
  - Suma Total.
  - Verificación de Matriz Diagonal.
- **Documentación**: Swagger/Scalar interactivo.
- **Base de Datos**: PostgreSQL con Docker.
- **Lenguaje**: TypeScript.

## Requisitos

- Node.js (v16+)
- Docker & Docker Compose

## Instalación

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Levantar la base de datos:
   ```bash
   docker compose up -d
   ```

3. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```

## Documentación

Una vez iniciada la API, accede a la documentación interactiva en:
`http://localhost:3000/docs`

## Endpoints Principales

- `POST /api/auth/register`: Registrar un usuario.
- `POST /api/auth/login`: Obtener token JWT.
- `POST /api/matrix/stats`: Calcular estadísticas (Requiere Bearer Token).

### Ejemplo de entrada para /matrix/stats
```json
{
  "status": 200,
  "message": "Factorización QR completada",
  "data": {
    "q": [[0.894427, -0.447213], [0.447213, 0.894427]],
    "r": [[13.416407, 29.069155], [0, 172.177234]]
  }
}
```

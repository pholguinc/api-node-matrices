import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { AppDataSource } from "./config/database";
import { apiReference } from "@scalar/express-api-reference";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Matrix Stats API",
      version: "1.0.0",
      description: "API for calculating statistics on QR factorization matrices",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Scalar Documentation
app.use(
  "/docs",
  apiReference({
    spec: {
      content: swaggerSpec,
    },
  })
);

app.use("/api", routes);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Documentation available on http://localhost:${PORT}/docs`);
    });
  })
  .catch((error: unknown) => console.log("Database connection error:", error));

export default app;

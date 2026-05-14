import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { pool } from "./config/database";
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
      description:
        "API for calculating statistics on QR factorization matrices",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        RegisterRequest: {
          type: "object",
          properties: {
            username: { type: "string" },
            password: { type: "string" },
          },
        },
        LoginRequest: {
          type: "object",
          properties: {
            username: { type: "string" },
            password: { type: "string" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            message: { type: "string" },
            token: { type: "string" },
            user: {
              type: "object",
              properties: {
                id: { type: "string" },
                username: { type: "string" },
              },
            },
          },
        },
        MatrixStatsRequest: {
          type: "object",
          properties: {
            status: { type: "integer" },
            message: { type: "string" },
            data: {
              type: "object",
              properties: {
                q: {
                  type: "array",
                  items: { type: "array", items: { type: "number" } },
                },
                r: {
                  type: "array",
                  items: { type: "array", items: { type: "number" } },
                },
              },
            },
          },
        },
        MatrixStatsResponse: {
          type: "object",
          properties: {
            status: { type: "integer" },
            message: { type: "string" },
            data: {
              type: "object",
              properties: {
                max: { type: "number" },
                min: { type: "number" },
                avg: { type: "number" },
                sum: { type: "number" },
                isDiagonal: { type: "boolean" },
              },
            },
          },
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
  }),
);

app.use("/api", routes);

export default app;

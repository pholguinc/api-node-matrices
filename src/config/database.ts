import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "user_admin",
  password: process.env.DB_PASSWORD || "password123",
  database: process.env.DB_NAME || "matrices_db",
  synchronize: true, // Only for development
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});

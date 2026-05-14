import serverless from "serverless-http";
import app from "./app";

/**
 * Handler Lambda para despliegue en AWS.
 * Envuelve la aplicación Express usando serverless-http.
 */
export const handler = serverless(app);

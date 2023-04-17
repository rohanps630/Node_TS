import swaggerJSDoc, { SwaggerDefinition } from "swagger-jsdoc";
import express from "express";
import swaggerUi, { JsonObject } from "swagger-ui-express";

const swaggerDefinition: SwaggerDefinition = {
  swagger: "2.0",
  info: {
    title: "Node JS Documentation",
    version: "1.0.0",
  },
  host: "localhost:5001",
  basePath: "/",
  schemes: ["http"],
  securityDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  apis: ["../routes/*.ts"],
};

export const swaggerSpec: JsonObject = swaggerJSDoc({
  swaggerDefinition,
  apis: swaggerDefinition.apis,
});

export const swaggerRoutes = express.Router();

swaggerRoutes.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

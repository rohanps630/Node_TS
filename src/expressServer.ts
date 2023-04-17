import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import { responseFormatMiddleware } from "./middleware/response.middleware";
import { swaggerRoutes } from "./swagger";
import { routes } from "./routes";

interface IServer {
  start(port: number): void;
  connectToDatabase(connectionString: string): Promise<void>;
}

interface IExpressServer extends IServer {
  app: express.Application;
  enableMiddlewares(): void;
  enableRoutes(): void;
  enableSwagger(): void;
}

export class ExpressServer implements IExpressServer {
  app: express.Application;

  constructor() {
    this.app = express();
  }

  start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }

  async connectToDatabase(connectionString: string): Promise<void> {
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB");
  }

  enableMiddlewares(): void {
    this.app.use(json());
    this.app.use(responseFormatMiddleware);
  }

  enableRoutes(): void {
    this.app.use("/api/", routes);
  }

  enableSwagger(): void {
    this.app.use("/api-docs", swaggerRoutes);
  }
}

export class ServerFactory {
  static createServer(): IExpressServer {
    return new ExpressServer();
  }
}

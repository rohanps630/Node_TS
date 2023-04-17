import { ServerFactory } from "./expressServer";
import config from "./config";

config.require(["PORT", "MONGO_URL", "JWT_SECRET", "JWT_EXPIRATION"]);
const server = ServerFactory.createServer();

const PORT = config.getOrDefault("PORT", "3000");
const MONGO_URL = config.get("MONGO_URL");
server.connectToDatabase(MONGO_URL).then(() => {
  server.enableMiddlewares();
  server.enableRoutes();
  server.enableSwagger();
  server.start(Number(PORT));
});

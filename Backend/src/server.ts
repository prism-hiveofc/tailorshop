import app from "./app";
import { ENV } from "./config/env";
import { connectDatabase } from "./database/database";

const startServer = async () => {
  await connectDatabase();

  app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`);
  });
};

startServer();
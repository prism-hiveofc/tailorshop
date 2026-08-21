import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const allowedOrigins = [
  "http://localhost:5173",
  "https://tailorshop-2.onrender.com",
];

export const initApp = (app: express.Application) => {
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests without Origin (Postman, server-to-server, etc.)
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`));
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(express.json());
  app.use(cookieParser());
  app.use(helmet());
  app.use(morgan("dev"));
};
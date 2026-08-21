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
        // Browser requests from allowed frontend
        if (origin && allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        // Allow Postman / server-to-server requests without Origin
        if (!origin) {
          return callback(null, true);
        }

        return callback(
          new Error(`Not allowed by CORS: ${origin}`)
        );
      },

      credentials: true,

      methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS",
      ],

      allowedHeaders: [
        "Content-Type",
        "Authorization",
      ],
    })
  );

  app.use(express.json());
  app.use(cookieParser());
  app.use(helmet());
  app.use(morgan("dev"));
};
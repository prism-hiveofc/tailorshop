import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

export const initApp = (app: express.Application) => {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(cookieParser());
  app.use(helmet());
  app.use(morgan("dev"));
};
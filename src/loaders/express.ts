import express from "express";
import cors from "cors";

export default async ({ app }: { app: express.Application }) => {
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.use(cors());
  app.use(express.json());
};

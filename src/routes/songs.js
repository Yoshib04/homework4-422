import { Router } from "express";
import { prisma } from "../db.js";

export const songRouter = Router();

songRouter.get("/", async (req, res) => {
  const { artist } = req.query;

  const songs = await prisma.song.findMany({
    where: artist ? { artist: String(artist) } : {}
  });

  res.json(songs);
});
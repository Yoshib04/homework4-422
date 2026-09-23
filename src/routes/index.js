import { Router } from "express";
import { playlistRouter } from "./playlists.js";
import { songRouter } from "./songs.js";

export const routes = Router();

routes.use("/playlists", playlistRouter);
routes.use("/songs", songRouter);
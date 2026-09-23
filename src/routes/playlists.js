import { Router } from "express";
import { prisma } from "../db.js";

export const playlistRouter = Router();

// 2. create a new playlist
playlistRouter.post("/", async (req, res) => {
  const { name } = req.body;

  const playlist = await prisma.playlist.create({
    data: { name }
  });

  res.status(201).json(playlist);
});

// 3. add an existing song to a playlist
playlistRouter.post("/:id/songs", async (req, res) => {
  const playlistId = Number(req.params.id);
  const songId = Number(req.body.songId);

  const playlist = await prisma.playlist.findUnique({
    where: { id: playlistId }
  });

  const song = await prisma.song.findUnique({
    where: { id: songId }
  });

  // Return 404 JSON error 
  if (!playlist || !song) {
    return res.status(404).json({ error: "Playlist or Song not found" });
  }

  const playlistSong = await prisma.playlistSong.create({
    data: {
      playlistId,
      songId
    }
  });

  res.status(201).json(playlistSong);
});

// 4. return playlist with all songs using include
playlistRouter.get("/:id", async (req, res) => {
  const playlist = await prisma.playlist.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      songs: {
        include: {
          song: true
        }
      }
    }
  });

  if (!playlist) {
    return res.status(404).json({ error: "Playlist not found" });
  }

  res.json(playlist);
});

// 6. remove song from a playlist
playlistRouter.delete("/:id/songs/:songId", async (req, res) => {
  const playlistId = Number(req.params.id);
  const songId = Number(req.params.songId);

  const record = await prisma.playlistSong.findFirst({
    where: {
      playlistId,
      songId
    }
  });

  if (!record) {
    return res.status(404).json({ error: "Song is not on this playlist" });
  }

  await prisma.playlistSong.delete({
    where: { id: record.id }
  });

  res.json({ message: "Song removed from playlist successfully" });
});
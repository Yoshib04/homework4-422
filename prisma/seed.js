import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import songs from "./songs.json" with { type: "json" };

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.playlistSong.deleteMany();
  await prisma.song.deleteMany();
  await prisma.playlist.deleteMany();

  for (const song of songs) {
    await prisma.song.create({
      data: {
        title: song.title,
        artist: song.artist,
        durationSeconds: song.durationSeconds
      }
    });
  }

  console.log("Database seeded successfully with 20 songs");
}

main();
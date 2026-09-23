import express from "express";
import "dotenv/config";
import { routes } from "./routes/index.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", routes);

app.get("/", (req, res) => {
  res.json({ message: "Playlist Builder API" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
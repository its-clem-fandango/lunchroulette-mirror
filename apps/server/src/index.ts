import express, { Request, Response } from "express";
import { getAllUsers } from "./db/db-api";

const app = express();
const PORT = 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/users", async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`🥗 Server is running at http://localhost:${PORT}`);
});

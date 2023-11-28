import express, { Request, Response } from "express";

const app = express();
const PORT = 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
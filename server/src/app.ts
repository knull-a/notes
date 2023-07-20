import express, { Application, Request, Response } from "express";

const app: Application = express();

const port: number = 3001;

app.get("/greetings", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.listen(port, function () {
  console.log(`App is listening on http://localhost:${port} !`);
});
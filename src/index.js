import express from "express";
import todoRouter from "./routes/todo.routes.js";
import { config } from "dotenv";
config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use("/", express.static("public"));
app.use("/todo", todoRouter);

// Start my server
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});

/// <reference path="../types/express/index.d.ts" />


import express from "express";
import usuarios from "./routes/usuarios.routes";
import pecas from "./routes/pecas.routes";
import montagens from "./routes/montagem.routes"; 
import cpu from "./routes/cpu.routes";

const env = require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use("/user", usuarios);
app.use("/pecas", pecas); 
app.use("/montagens", montagens);
app.use("/cpu", cpu)

// Inicia o servidor
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
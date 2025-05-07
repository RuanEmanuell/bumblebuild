/// <reference path="../types/express/index.d.ts" />


import express from "express";
import usuarios from "./routes/usuarios.routes";
import pecas from "./routes/pecas.routes";
import cpu from "./routes/cpu.routes";
import gpu from "./routes/gpu.routes";
import ram from "./routes/ram.routes";
import placaMae from "./routes/placaMae.routes";
import fonte from "./routes/fonte.routes";
import ssd from "./routes/ssd.routes";
import cooler from "./routes/cooler.routes";
import "./utils/cron";
import path from "path";
// import montagens from "./routes/montagem.routes"; 

const env = require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use("/user", usuarios);
app.use("/pecas", pecas); 
app.use("/cpu", cpu);
app.use("/gpu", gpu);
app.use("/ram", ram);
app.use("/placaMae", placaMae);
app.use("/fonte", fonte);
app.use("/ssd", ssd);
app.use("/cooler", cooler);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));
// app.use("/montagens", montagens);

// Inicia o servidor
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
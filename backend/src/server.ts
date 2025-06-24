/// <reference path="../types/express/index.d.ts" />

import express from "express";
import users from "./routes/users.routes";
import parts from "./routes/part.routes";
import cpu from "./routes/cpu.routes";
import gpu from "./routes/gpu.routes";
import ram from "./routes/ram.routes";
import motherboard from "./routes/motherboard.routes";
import psu from "./routes/psu.routes";
import ssd from "./routes/ssd.routes";
import cooler from "./routes/cooler.routes";
import "./utils/cron";
import path from "path";
// import builds from "./routes/build.routes"; 

const env = require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = 3000;


app.use(cors({
  origin: 'http://bumblebuild.com.br',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());

// Rotas
app.use("/user", users);
app.use("/parts", parts); 
app.use("/cpu", cpu);
app.use("/gpu", gpu);
app.use("/ram", ram);
app.use("/motherboard", motherboard);
app.use("/psu", psu);
app.use("/ssd", ssd);
app.use("/cooler", cooler);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));
// app.use("/builds", builds);

// Inicia o servidor
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});

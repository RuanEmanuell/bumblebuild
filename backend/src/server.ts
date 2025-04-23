import express from "express";
import usuarios from "./routes/usuarios.routes";
import pecas from "./routes/pecas.routes";
import montagens from "./routes/montagem.routes"; 

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

// Inicia o servidor
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
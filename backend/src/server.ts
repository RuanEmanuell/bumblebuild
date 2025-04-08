import express from "express";
import usuarios from "./routes/usuarios.routes";
import pecas from "./routes/pecas.routes"; 

const env = require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use("/usuarios", usuarios);
app.use("/pecas", pecas); 

// Inicia o servidor
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});

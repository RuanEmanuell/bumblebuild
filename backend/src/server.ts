import express from "express";
import usuarios from "./routes/usuarios.routes";

const env = require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(cors());
const PORT = 3000

app.use(express.json());

// Importando as nossas rotas


// Usa as rotas com um prefixo

app.use('/', usuarios)

// Inicia o nosso server

app.listen(PORT, '0.0.0.0',() => {
    console.log("Servidor rodando na porta " + PORT);
});
import express from "express";
const env = require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(cors());
const PORT = 3000

app.use(express.json());

// Importando as nossas rotas

const usuarios = require('./routes/usuarios');

// Usa as rotas com um prefixo

app.use('/usuarios', usuarios)

// Inicia o nosso server

app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT);
});
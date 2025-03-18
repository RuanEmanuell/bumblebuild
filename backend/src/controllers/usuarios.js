const express = require("express")
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {blackListToken, verifyToken} = require("../authMiddleware")

const prisma = new PrismaClient();

router.use(express.json());

async function criaUsuario(req, res) {
    const { tipo_usuario, nome, email, senha } = req.body;

    try {
        // Verificar se o email já está registrado
        const usuarioExistente = await prisma.usuario.findUnique({
            where: {
                email: email
            }
        });

        if (usuarioExistente) {
            return res.status(400).json({
                error: "Email já cadastrado."
            });
        }

        // Criptografando a senha
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        // Criando o novo usuário
        const novoUsuario = await prisma.usuario.create({
            data: {
                tipo_usuario,
                nome,
                email,
                senha: senhaCriptografada,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        return res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erro ao criar usuário.",
            details: error.message,
        });
    }
}


module.exports = {
    criaUsuario,
};


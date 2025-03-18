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

async function loginUsuario(req, res){
    const { email, senha } = req.body
    try {
        const usuario = await prisma.usuario.findUnique({
            where : {email : email},
        });
        console.log("Usuario encontrado : ", usuario);

        if(!usuario){
            return res.status(401).json({message : "Credenciais invalidas"})
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
        console.log("Senha correta : ", senhaCorreta)

        if(!senhaCorreta){
            return res.status(401).json({message : "Credenciais invalidas"})
        }

        if(!process.env.SECRET_JWT){
            console.error("SECRET_JWT nao definido!");
            return res
                .status(500)
                .json({ message : "Erro no servidor : SECRET_JWT nao definido"})
        }

        const token = jwt.sign(
            {id : usuario.id, email : usuario.email},
            process.env.SECRET_JWT,
            {
                expiresIn : "1h",
            }
        );
        res.status(200).json({message : "Login bem-sucedido!", token})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Erro ao autenticar usuario."});
    }
}

async function logout(req, res){
    const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
        try {
            if(token){
                blackListToken(token);
                res.status(200).json({message : "Logout realizado com sucesso"})
            }
            else{
                res.status(400).json({ Message : "Token nao fornecido"})
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ Message : "Erro ao deslogar"})
        }
}

module.exports = {
    criaUsuario,
    loginUsuario,
    logout,
};


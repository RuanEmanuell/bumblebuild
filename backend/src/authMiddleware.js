const jwt = require("jsonwebtoken");

const blacklist = [];

// Funcao para verificar o token

const verifyToken = (token) =>{
    if(blacklist.includes(token)){
        throw new Error("Token Invalido");
    }
    return jwt.verify(token, process.env.SECRET_JWT);
};


// Funcao para adicionar o token a Black List (Evitar acesso nao autorizado)
const blackListToken = (token) => {
    blacklist.push(token);
};

// Middleware para autenticar token
function autenticarToken(req, res, next){
    
    // Tentando obter o token do cabeçalho Authorization
    const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

    if(!token){
        return res.status(401).json({message : "Token nao fornecido"});
    }

    try{
        
        const user = verifyToken(token); // Verificando se o token eh valido
        req.userId = user.userId // Adiciona o ID do user na requisicao
        next() // Chama o proximo middleware ou rota
    } catch(error){
        return res.status(401).json({message : "Token invalido"}); // Retorna o erro especifico em caso de erro
    }

    module.exports = {
        autenticarToken,
        blackListToken,
        verifyToken,
    };
}

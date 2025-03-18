import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Olá, BumbleBuild!");
})

app.get("/users", (req, res) => {
    res.send({
        user: "Test"
    });
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
    console.log("teste");
});
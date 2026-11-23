const express = require("express");
const app = express();
app.use(express.json())
app.use(express.static(__dirname + "/public"));
const PORT = process.env.port || 3000;

app.get("/", (req, res) => {
    res.send("Servidor Singularity Funcionando");
});

app.post("/contato", (req, res) => {
    const { nome, email, mensagem } = req.body ?? {};
    if (
        typeof nome !== "string" ||
        typeof email !== "string" ||
        typeof mensagem !== "string" 
    ){
        return res.status(400).send("Envie nome, e-mail e mensagem como texto.");
    }
    if (
        nome.trim() === "" ||
        email.trim() === "" ||
        mensagem.trim() === ""
    ){
        return res.status(400).send("Preencha todos os campos");
    }

    if (nome.length > 100) {
        return res.status(400).send("O nome deve ter no máximo 100 caracteres.")
    }
    if(email.length > 254) {
        return res.status(400).send("O E-mail deve ter no máximo 254 caracteres.")
    }
    if (mensagem.length > 2000) {
        return res.status(400).send("A mensagem deve ter no máximo 2000 caracteres.")
    }
    
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoEmail.test(email)) {
        return res.status(400).send("Informe um e-mail em formato válido.");
    }

    console.log(nome);
    console.log(email);
    console.log(mensagem);

    res.send("Mensagem recebida!")
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
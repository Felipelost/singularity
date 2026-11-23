
const retorno = document.querySelector("#retorno-contato");
const formulario = document.querySelector(".formulario-contato");
const botaoEnviar = formulario.querySelector('button[type="submit"]')
formulario.addEventListener("submit", function(evento){
    evento.preventDefault();
    const nome = document.querySelector("#nome").value.trim();
    const email = document.querySelector("#email").value.trim();
    const mensagem = document.querySelector("#mensagem").value.trim();
    if (nome === ""){
        retorno.textContent = "Por favor, preencha seu nome."
        document.querySelector("#nome").focus();
        return;
    }
    if(email === "") {
        retorno.textContent = "Por favor, preencha seu e-mail.";
        document.querySelector("#email").focus();
        return;
    }

    if (mensagem === ""){
        retorno.textContent = "Por favor, escreva sua mensagem."
        document.querySelector("#mensagem").focus();
        return;
    }
    botaoEnviar.disabled = true;
    botaoEnviar.textContent = "Enviando...";
    fetch("/contato", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, email, mensagem })
    })
    .then(async function(resposta) {
        const texto = await resposta.text();
        if (!resposta.ok) {
            throw new Error(texto);
        }
        return texto;
    })
    .then(function(texto) {
        retorno.textContent = texto;
        formulario.reset();
    })
    .catch(function(erro) {
        if (erro instanceof TypeError) {
        retorno.textContent = "Não foi possível enviar. Tente novamente.";
        } else {
            retorno.textContent = erro.message;
        }
        console.error(erro) ;
    })
    .finally(function(){
        botaoEnviar.disabled = false;
        botaoEnviar.textContent = "Enviar mensagem";
    });
});
formulario.addEventListener("input", function(){
    retorno.textContent = "";
});
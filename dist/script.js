import getPalavra from "./palavras.js";
// Tipagem dos elementos do DOM
const contentBtnsLetras = document.querySelector(".btn-letras");
const contentAdivinheLetras = document.querySelector(".adivinhe-letras");
const img = document.querySelector("img");
const contentDicaLetras = document.querySelector(".dica-letras");
const btnNovoJogo = document.querySelector(".btn-novo-jogo");
btnNovoJogo.onclick = () => padraoTelaInicial(img);
let indexImg;
const InicioAlfabetoTabelaAscii = 97; // 97 = A
const FinalAlfabetoTabelaAscii = 123; // 123 = Z
const numeroMaximoDeIndexImagem = 7;
padraoTelaInicial(img);
// Funções que interagem com a tela do usuário
function padraoTelaInicial(img) {
    const imagemInicial = 1;
    indexImg = imagemInicial;
    img.src = "./assets/img1.png";
    gerarCampoAdivinheAPalavra(contentAdivinheLetras);
    criarBotoesParaDigitarAsLetras();
}
function zerarValorAdivinheLetras(contentAdivinheLetras) {
    contentAdivinheLetras.textContent = "";
}
function gerarCampoAdivinheAPalavra(contentAdivinheLetras) {
    zerarValorAdivinheLetras(contentAdivinheLetras);
    const { palavra, dica } = getPalavra();
    const palavraSemAcento = removerAcentos(palavra);
    Array.from(palavraSemAcento).forEach((letra) => {
        const span = document.createElement("span");
        span.textContent = "_";
        span.setAttribute("palavra", letra.toUpperCase());
        contentAdivinheLetras.appendChild(span);
    });
    contentDicaLetras.textContent = `Dica: ${dica}`;
}
// Função para remover acentos de uma palavra
function removerAcentos(texto) {
    return texto
        .normalize("NFD") // Separa os caracteres com acento em dois 
        .replace(/[\u0300-\u836f]/g, ""); // Identifica e "apaga" os acentos
}
function adicionarImagemForca(img) {
    indexImg++;
    img.src = `./assets/img${indexImg}.png`; // As imagens são registradas da img1 a img7
}
function alertPerdeu() {
    setTimeout(() => {
        alert("Perdeu! Tente novamente :p");
        padraoTelaInicial(img);
    }, 100);
}
function alertGanhou() {
    setTimeout(() => {
        alert("Ganhou! Parabéns :)");
        padraoTelaInicial(img);
    }, 100);
}
function limparValorBtnsLetras(contentBtnsLetras) {
    contentBtnsLetras.textContent = "";
}
function criarBotoesParaDigitarAsLetras() {
    limparValorBtnsLetras(contentBtnsLetras);
    for (let contador = InicioAlfabetoTabelaAscii; contador < FinalAlfabetoTabelaAscii; contador++) {
        const letra = String.fromCharCode(contador).toUpperCase();
        const btn = criarBotaoLetra(letra);
        contentBtnsLetras.appendChild(btn);
    }
}
// Função para criar botões de letras
function criarBotaoLetra(letra) {
    const btn = document.createElement("button");
    btn.textContent = letra;
    btn.onclick = () => {
        btn.disabled = true;
        btn.style.backgroundColor = "#8C8C88";
        verificarSeALetraEstaNaPalavra(letra);
    };
    return btn;
}
// Funções de verificação
function verificarSeALetraEstaNaPalavra(letra) {
    const arr = document.querySelectorAll(`[palavra="${letra}"]`);
    if (!arr.length)
        verificarSePerdeu(indexImg);
    arr.forEach((e) => {
        e.textContent = letra;
    });
    verificarSeGanhou();
}
function verificarSeGanhou() {
    const spans = document.querySelectorAll(`.adivinhe-letras span`);
    const ganhou = !Array.from(spans).find((span) => span.textContent === "_");
    if (ganhou) {
        alertGanhou();
    }
}
function verificarSePerdeu(indexImg) {
    adicionarImagemForca(img);
    if (indexImg === numeroMaximoDeIndexImagem) {
        alertPerdeu();
    }
}

import getPalavra from "./palavras.js";

// Tipagem dos elementos do DOM
const contentBtnsLetras = document.querySelector(".btn-letras") as HTMLDivElement;
const contentAdivinheLetras = document.querySelector(".adivinhe-letras") as HTMLDivElement;
const img = document.querySelector("img") as HTMLImageElement;
const contentDicaLetras = document.querySelector(".dica-letras") as HTMLDivElement;
const btnNovoJogo = document.querySelector(".btn-novo-jogo") as HTMLButtonElement;
btnNovoJogo.onclick = () => padraoTelaInicial(img);

let indexImg: number;
const InicioAlfabetoTabelaAscii: number = 97 // 97 = A
const FinalAlfabetoTabelaAscii: number = 123 // 123 = Z
const numeroMaximoDeIndexImagem : number = 7;

padraoTelaInicial(img);

// Interfaces para as funções
interface Palavra {
    palavra: string;
    dica: string;
}

// Funções que interagem com a tela do usuário

function padraoTelaInicial(img:HTMLImageElement): void {
    const imagemInicial: number = 1

    indexImg = imagemInicial
    img.src = "./assets/img1.png";

    gerarCampoAdivinheAPalavra(contentAdivinheLetras);
    criarBotoesParaDigitarAsLetras();
}

function zerarValorAdivinheLetras(contentAdivinheLetras:HTMLDivElement): void {
    contentAdivinheLetras.textContent = "";
}

function gerarCampoAdivinheAPalavra(contentAdivinheLetras:HTMLDivElement): void {
    zerarValorAdivinheLetras(contentAdivinheLetras);

    const { palavra, dica }: Palavra = getPalavra();
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
function removerAcentos(texto: string): string {
    return texto
        .normalize("NFD") // Separa os caracteres com acento em dois 
        .replace(/[\u0300-\u836f]/g, ""); // Identifica e "apaga" os acentos
}

function adicionarImagemForca(img:HTMLImageElement): void {
    indexImg++;
    img.src = `./assets/img${indexImg}.png`;  // As imagens são registradas da img1 a img7
}

function alertPerdeu(): void {
    setTimeout(() => {
        alert("Perdeu! Tente novamente :p");
        padraoTelaInicial(img);
    }, 100);
}

function alertGanhou(): void {
    setTimeout(() => {
        alert("Ganhou! Parabéns :)");
        padraoTelaInicial(img);
    }, 100);
}

function limparValorBtnsLetras(contentBtnsLetras : HTMLDivElement): void {
    contentBtnsLetras.textContent = "";
}

function criarBotoesParaDigitarAsLetras(): void {
    limparValorBtnsLetras(contentBtnsLetras);

    for (let contador = InicioAlfabetoTabelaAscii; contador < FinalAlfabetoTabelaAscii; contador++) {
        const letra = String.fromCharCode(contador).toUpperCase();
        const btn = criarBotaoLetra(letra);

        contentBtnsLetras.appendChild(btn);
    }
}

// Função para criar botões de letras
function criarBotaoLetra(letra: string): HTMLButtonElement {
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

function verificarSeALetraEstaNaPalavra(letra: string): void {
    const arr = document.querySelectorAll(`[palavra="${letra}"]`);

    if (!arr.length) verificarSePerdeu(indexImg);

    arr.forEach((e) => {
        (e as HTMLSpanElement).textContent = letra;
    });

    verificarSeGanhou();
}

function verificarSeGanhou(): void {
    const spans = document.querySelectorAll(`.adivinhe-letras span`);
    const ganhou = !Array.from(spans).find((span) => (span as HTMLSpanElement).textContent === "_");

    if (ganhou) {
        alertGanhou();
    }
}

function verificarSePerdeu(indexImg : number): void {
    adicionarImagemForca(img);

    if (indexImg === numeroMaximoDeIndexImagem) {
        alertPerdeu();
    }
}

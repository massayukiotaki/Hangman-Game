// Definindo a interface para o objeto palavra
interface Palavra {
    palavra: string;
    dica: string;
}

// Array de palavras e dicas com tipagem
const palavras: Palavra[] = [
    { palavra: "Inglaterra", dica: "País que tem a Libra como sua moeda" },
    { palavra: "Baleia", dica: "Mamífero aquático" },
    { palavra: "Interestelar", dica: "Filme feito por Christopher Nolan" },
    { palavra: "Shrek", dica: "Melhor animação da Dreamworks" },
    { palavra: "Ornitorrinco", dica: "Um animal, personagem da Disney" },
    { palavra: "Polvo", dica: "Animal que se camufla" },
    { palavra: "Vaticano", dica: "Menor país do mundo" },
    { palavra: "Itlab", dica: "Melhor empresa de tecnologia" },
    { palavra: "SteveJobs", dica: "Criador e idealizador do Macintosh" },
    { palavra: "BillGates", dica: "Bilionário, filantropo e nerd" },
    { palavra: "Maracujá", dica: "Fruta amarela" },
    { palavra: "Laranja", dica: "Tem um gosto ácido" },
    { palavra: "Cachorro", dica: "Animal doméstico" },
    { palavra: "Gato", dica: "Animal doméstico" },
    { palavra: "Bicicleta", dica: "Meio de locomoção sem motor" },
    { palavra: "Sorvete", dica: "Comida popularizada na Itália" },
    { palavra: "Chocolate", dica: "Doce derivado de uma fruta" },
    { palavra: "Sal", dica: "Tempero" },
    { palavra: "Pimenta", dica: "Tempero" },
    { palavra: "Árvore", dica: "Realiza a fotossíntese" },
    { palavra: "Celular", dica: "Aparelho tecnológico" },
    { palavra: "Java", dica: "Linguagem de programação do Satanás" },
    { palavra: "Futebol", dica: "Esporte inglês" },
    { palavra: "Minecraft", dica: "Jogo muito popular" },
    { palavra: "Sheldon", dica: "Personagem da serie The Big Bang Theory" },
    { palavra: "Tailândia", dica: "País oriental" },
];

// Função para obter uma palavra aleatória
export default function getPalavra(): Palavra {
    const index = Math.floor(Math.random() * palavras.length);
    return palavras[index];
}

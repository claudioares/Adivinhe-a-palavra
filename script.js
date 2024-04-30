import words from "./words.js";


// Escolhendo uma palavra aleatoriamente
let word = words[Math.floor(Math.random() * words.length)];

let displayWord = "";
let guessedLetters = [];
let guessedErros = [];

// Inicializa o display da palavra
for (let i = 0; i < word.length; i++) {
    displayWord += "_ ";
}
document.getElementById("word-display").innerText = displayWord;
const button = document.querySelector("#button_run");


button.addEventListener("click", ()=>{
    guessLetter();
});


function guessLetter() {
    let guess = document.getElementById("guess").value.toLowerCase();

    // Verifica se a letra já foi adivinhada
    if (guessedLetters.includes(guess)) {
        alert("Você já tentou esta letra!");
        clearInput();
        return;
    }

    guessedLetters.push(guess);

    let wordDisplayArray = displayWord.split(" ");
    let correctGuess = false;

    // Verifica se a letra adivinhada está na palavra
    for (let i = 0; i < word.length; i++) {
        if (word[i] === guess) {
            wordDisplayArray[i] = guess;
            correctGuess = true;
        }
    }

    displayWord = wordDisplayArray.join(" ");
    document.getElementById("word-display").innerText = displayWord;


    // Atualiza a lista de letras adivinhadas
    document.getElementById("letters-guessed").innerText = "Letras Adivinhadas: " + guessedLetters.join(", ");

    // Verifica se o jogador ganhou
    if (!displayWord.includes("_")) {
        modalCongractulation();
        return;
    }

    // Verifica se o jogador errou
    const errorAttempts = document.getElementById("error_Attempts");
    if (!correctGuess) {
        // Aqui você pode adicionar a lógica para desenhar a forca
        guessedErros.push(guess);
        alert("Letra incorreta! Tente novamente.");
        errorAttempts.innerText = String(guessedErros.length);
        errorAttempts.style.color = "red";
        clearInput();
        return;
    }

    
    clearInput();
    manageAttempts();
    // Verificar se o jogador quer adivinhar a palavra
    guessWord();
}

function reloadPage () {
    window.location.reload(true);
}
function clearInput() {
    document.getElementById("guess").value = "";
}
function manageAttempts () {
    if(guessedErros.length === 5) {
        alert("Você ultrapassou a quantidade de tentativas. Lamento, você perdeu!");
        reloadPage();
        return
    }
}
function guessWord () {
    const wordDisplay = document.getElementById("word-display").innerText;
    const correctLetters = wordDisplay.split(' ').filter(strings => strings !== "_").length;
    const wordLength = word.length;
    if(Number(wordLength) - Number(correctLetters) < 3) {
        const modalGuessWord = document.querySelector(".modal__guessWord");
        const modalWord = document.querySelector(".modal_words");

        modalGuessWord.style.display = "flex";
        modalWord.innerText = wordDisplay;
    }
}

const button_N = document.querySelector(".b__n");
button_N.addEventListener("click", ()=>{
    const modalGuessWord = document.querySelector(".modal__guessWord");
    modalGuessWord.style.display = "none";
});

const button_R = document.querySelector(".b__r");
button_R.addEventListener("click", ()=>{
    const modalInputGuessWord = document.getElementById("input_modal_guess_word").value;
    if(modalInputGuessWord === word){
        const modalGuessWord = document.querySelector(".modal__guessWord");
        modalGuessWord.style.display = "none";
        modalCongractulation();
        return;
    }
})

function modalCongractulation () {
    const modalCongractulation = document.querySelector(".modal_congratulations");
    modalCongractulation.style.display = "flex";
    let messege = document.querySelector(".modal_word_congractulation").innerText;
    messege = "Parabéns, você ganhou! A palavra era: " + word;
}
const wordList = ['Lurifax', 'Krumelur', 'Grunka', 'Slägga', 'Blasfemi']
const imgList = ['images/h0.png', 'images/h1.png', 'images/h2.png', 'images/h3.png', 'images/h4.png', 'images/h5.png', 'images/h6.png']


let selectedWord; // Sträng: ett av orden valt av en slumpgenerator från areyen ovan

let guesses = 0;     // Number: håller antalet gissningar som gjorts
let hangmanImg;      // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`
let guessedLetterCount;
let msgHolderEl = document.querySelector('#message');    // DOM-nod: Ger meddelande när spelet är över
let startGameBtnEl = document.querySelector('#startGameBtn'); // DOM-nod: knappen som du startar spelet med
let letterButtonEls = document.querySelectorAll('#letterButtons button'); // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls = document.querySelectorAll('#letterBoxes ul li');   // Array av DOM-noder: Rutorna där bokstäverna ska stå
let letterBoxContainerEl = document.querySelector('#letterBoxes ul');
let letterButtonContainerEl = document.querySelector('ul#letterButtons');
let hangmanImgEl = document.querySelector('#hangman');

startGameBtnEl.addEventListener('click', initiateGame);

letterButtonContainerEl.addEventListener('click', guessLetter);



//Funktion som meddelar användaren någonting.
function informUser (message) {
    msgHolderEl.innerText = message;
    
}
//Funktion som håller reda ifall spelaren vunnit / förlorat
function checkGameState (lastGuessCorrect) {
if ((hangmanImgEl.src.slice(-6)) === 'h6.png' && !lastGuessCorrect) {
gameOver();

    }
    if (lastGuessCorrect && (selectedWord.length === guessedLetterCount)) {
    gameWon();

    }
}
// Funktion som meddelar spelaren när spelet är över (vinst)
function gameWon () {
informUser("CONGRATS YOU'VE WON! Wanna try again? no cheating this time :)")
deactivate();
}

// Funktion som meddelar spelaren när spelet är över (förlust)
function gameOver () {
    informUser("OhMyGod, you're DEAD! Better luck next time :)")
    deactivate();

}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav
function guessLetter(e) {
    let lastGuessCorrect;

    if (e.target.tagName !== "BUTTON") {
        return;
    }
    console.log(e.target.value)  
    let guessedLetter = e.target.value;
    deactivateLetter(guessedLetter);     // Avaktiverar bokstaven spelaren tryckt på

    const indexOfFirst = selectedWord.indexOf(guessedLetter); 
    console.log("first occurence at " + indexOfFirst)
    if (indexOfFirst < 0) {    // Spelaren gissade fel
        lastGuessCorrect = false;   
        guesses = guesses + 1;
       setHangManImg(guesses)
       checkGameState(lastGuessCorrect)
        return;
    } else {       // Bokstav hittad
        lastGuessCorrect = true;
        letterBoxEls[indexOfFirst].firstElementChild.value = guessedLetter;
        guessedLetterCount++;
        checkGameState(lastGuessCorrect)
    }

    const indexOfSecond = selectedWord.indexOf(guessedLetter, indexOfFirst + 1);
    if (indexOfSecond < 0) {
        return;
    } else {
        letterBoxEls[indexOfSecond].firstElementChild.value = guessedLetter;
        guessedLetterCount++;
        checkGameState(lastGuessCorrect)
    }
    console.log("second occurence at " + indexOfSecond)
    // vad händer om det finns fler av samma bokstav i ordet?

}

//funktion som uppdaterar bilden som visas

function setHangManImg (index) {
    hangmanImg = imgList[index];
    hangmanImgEl.setAttribute('src', hangmanImg);

}

// Funktion som slumpar fram ett ord
function randomWord (arr) {

    const randomNumber = Math.floor(Math.random() * arr.length)
    return arr[randomNumber]
}

//Funktion som tar rensar bokstavsrutorna 
function removeLB () {
    letterBoxContainerEl.innerHTML = ""

}


// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
function generateLB (amount) {                                   
for (let i = 0; i < amount; i++) {
let newLi = document.createElement('li');
newLi.innerHTML = '<input type="text" disabled value="&nbsp;"/>';
letterBoxContainerEl.appendChild(newLi);
    }
    letterBoxEls = document.querySelectorAll('#letterBoxes ul li');
}

//Funktion som aktiverar bokstavsknapparna
function activate () {                                          

for (let i = 0; i < letterButtonEls.length; i++) {
 
    letterButtonEls[i].disabled = false
    }

}
// Funktion som inaktiverar bokstavsnknapparna när spelet är över
function deactivate () {                                      
     
    for (let i = 0; i < letterButtonEls.length; i++) {
        letterButtonEls[i].disabled = true
    }       
}
// Funktion som avaktiverar de bokstavsknappar spelaren har gissat på
    function deactivateLetter(letter) {                         
     
        for (let i = 0; i < letterButtonEls.length; i++) { 
            if (letter === letterButtonEls[i].value) {
                letterButtonEls[i].disabled = true
            }
        }       
    }

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
function initiateGame () {                                     
guesses = 0;
guessedLetterCount = 0;
selectedWord = randomWord(wordList).toUpperCase();
let wordLenght = selectedWord.length;
removeLB();
activate();
generateLB(wordLenght);
setHangManImg(0);
informUser("");


}

// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
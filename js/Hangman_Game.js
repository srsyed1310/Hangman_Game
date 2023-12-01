const  keyboard_buttons = document.querySelector('.buttons');
let hint_word = document.querySelector('.hint b');
let wordDisplay = document.querySelector('#word_display');
const incorrect_gussess = document.querySelector('.incorrect_gussess b');

let hangmanImage = document.querySelector('.image_section img');

let GameModel = document.querySelector('.try_again_container')

let playGame = document.querySelector('#play_again')

let currentWord,correctLength = [], wordGuessCount = 0;

let maxGuess = 6;


// Create a Random word and hint for a wordList


const getRandomWord = () => {

    const { word, hint} = wordList[Math.floor(Math.random() * wordList.length)];

    currentWord = word;
    console.log(word);

    document.querySelector(".hint b").innerText = hint;

    wordDisplay.innerHTML = word.split("")
    .map (() => `<li class="letter"></li>`)
    .join("");
    }

getRandomWord();



const gameOver = (isVictory)=>{

    setTimeout(()=>{

        const modelText = isVictory ? 'You found the word' : 'The correct word is: ';

        GameModel.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;

        GameModel.querySelector("h2").innerText = `${isVictory ? 'Congrats' : 'Game Over'}`;

        GameModel.querySelector("p").innerHTML = `${modelText} <b> ${currentWord} </b>`;


        GameModel.classList.add('show');
    },1000)

}



const initGame = (button, clickedLetter) =>{
    // console.log(button, clickedLetter);


    if(currentWord.includes(clickedLetter)){

        // Show all correct Letters on the word display

        [...currentWord].forEach((letter, index) => {

            if(letter === clickedLetter){

                correctLength.push(letter);

            wordDisplay.querySelectorAll('li')[index].innerHTML= letter;

            wordDisplay.querySelectorAll('li')[index].classList.add('gussed');
        }

    });


    }
    else{

        // if clicked letter is not exist then update the hangman image

        wordGuessCount++;

        hangmanImage.src = `images/hangman-${wordGuessCount}.svg`;
    }

    button.disabled = true;

    incorrect_gussess.innerHTML = `${wordGuessCount} / ${maxGuess}`


    // Calling game Over function if any of these condition meet


    if(wordGuessCount === maxGuess) return gameOver(false);

    if(correctLength.length === currentWord.length) return gameOver(true);



}



//  Create Keyboard Button
for (let i = 97; i <= 122; i++) {

    let button = document.createElement('button')

    button.innerHTML = String.fromCharCode(i)

    keyboard_buttons.appendChild(button)

    button.addEventListener('click', (e)=>
     initGame (e.target, String.fromCharCode(i)))

}

playGame.addEventListener('click', ()=>{

    location.reload()


})
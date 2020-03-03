// console.log("Howdy, from game.js");

const questionEl = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
// console.log(choices)

const TEST_API = 'https://opentdb.com/api.php?amount=10'


let currentQuestion = {};
let acceptingAnswer = true;
let score = 0;
let questionCounter = 0 
let availableQuestions = [];

function htmlDecode(encoded)
{
    var elem = document.createElement('textarea');
    elem.innerHTML = encoded;
    var decoded = elem.value;
  return decoded;
}

const decodeValues = object => {

    const isArray = Array.isArray(object)

    return Object.keys(object).reduce((decodedObject, key) => {
        const newValue = typeof object[key] === "string" ? htmlDecode(object[key]) : 
            (typeof object[key] === "object" ? decodeValues(object[key]) : object[key])
        if (isArray) {
            const newArray = [...decodedObject]
            newArray.push(newValue)
            return newArray
        } else {
            return {
                ...decodedObject,
                [key]: newValue
            }
        }
    },  isArray ? [] : {})
}

const API_Questions = {
    getQuestions: () => fetch(TEST_API)
    .then(response => response.json())
    .then(data => decodeValues(data))
}

let questions = [];

API_Questions.getQuestions()
.then(loadedQuestions => {
    console.log(loadedQuestions.results)
    questions = loadedQuestions.results.map(loadedQuestion => {
        const formattedQuestion = { 
            question: loadedQuestion.question
        };
        
        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 3 ) + 1;
        answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

        answerChoices.forEach((choice, index) => {
            formattedQuestion['choice' + (index + 1)] = choice;
        })
        // console.log(formattedQuestion)
        return formattedQuestion
    })
    startGame();
})


startGame = () => {
    questionCounter = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
   
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questionEl.innerText = currentQuestion.question;


    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswer = true; 
};

choices.forEach(choice => {
    choice.addEventListener('click', event => {
        if (!acceptingAnswer) return;

        acceptingAnswer = false; 
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        // console.log(selectedAnswer == currentQuestion.answer);
        
        // const classToApply = 'incorrect';
        // if(selectedAnswer == currentQuestion.answer) {
        //     classToApply = 'correct';
        // }

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
          selectedChoice.parentElement.classList.remove(classToApply)
          getNewQuestion();

        }, 1000);
    });
})


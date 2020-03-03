// console.log("Howdy, from game.js");

const questionEl = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
// console.log(choices)

const TEST_API = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple'


let currentQuestion = {};
let acceptingAnswer = true;
let score = 0;
let questionCounter = 0 
let availableQuestions = [];

const API_Questions = {
    getQuestions: () => fetch(TEST_API)
    .then(response => response.json()).then(question => console.log(question.results))
}

API_Questions.getQuestions()
.then(questions => renderQuestions(questions))

const renderQuestions = questions => {
    questions.forEach(question => {
        getNewQuestion(question)
    });

};

let questions = [];

startGame = () => {
    questionCounter = 0;
    score = 0;
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

startGame();
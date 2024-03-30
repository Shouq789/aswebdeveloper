var questionBank = [
    {
        question: 'You have the responsibility to keep:',
        option: ['Yourself safe', 'Your stuff safe', 'Your cookies safe', 'All the Above'],
        answer: 'Yourself safe'
    },
    {
        question: 'Who do you tell if you see something harmful online?',
        option: ['Your Parents', 'Your Teachers', 'A Trusted Adult', 'All the Above'],
        answer: 'All the Above'
    },
    {
        question: 'What do you do if someone is bullying you online?',
        option: ['Ask them to please stop', 'Say you will tell on them', 'Stop block, tell the adult', 'All of the above'],
        answer: 'Stop block, tell the adult'
    },
    {
        question: 'Which of the following is an online threat?',
        option: ['Identity theft', 'Phishing', 'Surfing', 'Both A & B'],
        answer: 'Both A & B'
    },
    {
        question: 'If a stranger online tells you he/she had a gift for you, and asks your location, what will you do?',
        option: ['Give my address', 'Give my friend\'s address', 'Do not give the address and block', 'All the above'],
        answer: 'Do not give the address and block'
    }
];

var question = document.getElementById('question');
var quizContainer = document.getElementById('quiz-container');
var scoreboard = document.getElementById('scoreboard');
var option0 = document.getElementById('option0');
var option1 = document.getElementById('option1');
var option2 = document.getElementById('option2');
var option3 = document.getElementById('option3');
var next = document.querySelector('.next');
var points = document.getElementById('score');
var stat = document.getElementById('stat');
var span = document.querySelectorAll('span');
var i = 0;
var score = 0;

//function to display questions
function displayQuestion() {
    for (var a = 0; a < span.length; a++) {
        span[a].style.background = 'none';
    }
    question.innerHTML = 'Q.' + (i + 1) + ' ' + questionBank[i].question;
    option0.innerHTML = questionBank[i].option[0];
    option1.innerHTML = questionBank[i].option[1];
    option2.innerHTML = questionBank[i].option[2];
    option3.innerHTML = questionBank[i].option[3];
    stat.innerHTML = 'Question ' + (i + 1) + ' of ' + questionBank.length;
}

function calcScore(e) {
    var selectedAnswer = e.textContent.trim(); // Get the text content of the span element
    var correctAnswer = questionBank[i].answer.trim(); // Get the correct answer
    
    console.log("Selected answer:", selectedAnswer);
    console.log("Correct answer:", correctAnswer);
    
    if (selectedAnswer === correctAnswer && score < questionBank.length) {
        score = score + 1;
        console.log("Score incremented. New score:", score);
        document.getElementById(e.id).style.background = 'green';
    } else {
        console.log("Score not incremented. Current score:", score);
        document.getElementById(e.id).style.background = 'tomato';
    }
    setTimeout(nextQuestion, 300);
}






//function to display next question
function nextQuestion() {
    if (i < questionBank.length - 1) {
        i = i + 1;
        displayQuestion();
    } else {
        points.innerHTML = score + '/' + questionBank.length;
        if (score === questionBank.length) {
            points.innerHTML = 'Excellent! ' + points.innerHTML;
        }
        quizContainer.style.display = 'none';
        scoreboard.style.display = 'block';
    }
}

//click events to next button
next.addEventListener('click', nextQuestion);

//Back to Quiz button event
function backToQuiz() {
    location.reload();
}

//function to check Answers
function checkAnswer() {
    var answerBank = document.getElementById('answerBank');
    var answers = document.getElementById('answers');
    answerBank.style.display = 'block';
    scoreboard.style.display = 'none';
    for (var a = 0; a < questionBank.length; a++) {
        var list = document.createElement('li');
        list.innerHTML = questionBank[a].answer;
        answers.appendChild(list);
    }
}

displayQuestion();

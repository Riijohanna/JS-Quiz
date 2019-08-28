function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function askQuestion() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("lang");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        // var images = quiz.getQuestionIndex().images;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        askQuestion();
    }
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// creating questions
var questions = [
    new Question("...in Finnish?", ["Ciao", "Bye","Moi"], "Moi"),
    new Question("...in Spanish?", ["Marhaba", "Hola", "Ahoj"], "Hola"),
    new Question("...in Russian?", ["Zdravo", "Hujambo","Zdravstvuyte"], "Zdravstvuyte"),
    new Question("...in Bengali?", ["God dag", "Namaskar", "Bonjour"], "Namaskar"),
    new Question("...in Swahili", ["Hujambo", "Hallå", "Merhaba"], "Hujambo")
];

// creating quiz
var quiz = new Quiz(questions);

// displaying the quiz
askQuestion();

let rightQuestions = 0;
let currentQuestion = 0;
let audioSuccess = new Audio('./audio/correct.mp3')
let audioFail = new Audio('./audio/wrong.mp3')
let audioFinsh = new Audio('./audio/end-sound.mp3');




function init() {
    document.getElementById('all-questions').innerHTML = questions.length;

    showQuestion();
}



function showQuestion() {
        if (gameIsOver()) {
        showEndScreen();
    } else { 
        updateProgressBar();
        updateToNextQuestion();
    }
}



function gameIsOver() {
    return currentQuestion >= questions.length;
}



function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('question-body').style = 'display:none';
    document.getElementById('amount-Of-Questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-image').src = 'img/trophy.png';
    audioFinsh.play();
}



function updateToNextQuestion() {
    let question = questions[currentQuestion];   

    document.getElementById('current-question').innerHTML = currentQuestion +1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}



function updateProgressBar() {
    let perrcent = (currentQuestion +1) / questions.length;
    perrcent = Math.round(perrcent * 100);
    document.getElementById('progress-bar').innerHTML = `${perrcent} %`;
    document.getElementById('progress-bar').style = ` width: ${perrcent}%;`
}



function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = +selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (correctAnswerSelected(selectedQuestionNumber, question)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        audioSuccess.play();
        rightQuestions++;        
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        audioFail.play();
    }
    document.getElementById('next-button').disabled = false;
    document.getElementById('question-container').classList.add('pointer-events-none');
}


function correctAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer']
}



function nextQuestion() {
    currentQuestion++;
    
    resetAnswerButton()
    showQuestion();

    document.getElementById('next-button').disabled = true;   
}



function resetAnswerButton() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}



function restartGame() {
    document.getElementById('header-image').src = './img/Stadion.jpg';
    document.getElementById('question-body').style = ''; //question-body wieder anzeigen 
    document.getElementById('endScreen').style = 'display:none'; // EndScreen ausblenden
    rightQuestions = 0;
    currentQuestion = 0;
    init();    
}

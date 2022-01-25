import generateCsv from "./csvGenerator.js";

var jsonData, allQuestionCounter, questionsPerGroupCounter, selectedQuestionsPerGroupCounter, questionFieldCounter,
diseaseTemplate, diseasesUsed, currentQuestionField, currentQuestion,
questionText, answerInput, nextButton, answerArray;

const delimiter = ";";

function init(){
    diseaseTemplate = ["appendicitis","wrist_bones","cyanate_cyanide","nerves","achilles","lumbago","cataract","anesthesia","depression","physical_assessment"];
    
    fetch('./resources/questions.json').then(response => {
        return response.json();
     }).then(jsondata => initQuestions(jsondata));

    answerArray = [];
    allQuestionCounter = 0;
    questionsPerGroupCounter = 0;

    questionText = document.getElementById("question");
    answerInput = document.getElementById("inputAnswer");
    nextButton = document.getElementById("nextButton");
}

function initQuestions(jsonDatas) {
    console.log("Questions loaded!");
    //console.log(jsonData);

    jsonData = jsonDatas;
    loadNextQuestion();
    document.getElementById("nextButton").addEventListener("click", function() {
        if(answerInput.value != "") {
            if(allQuestionCounter<21) {
                saveAnswer();
                loadNextQuestion();
            } else {
                document.getElementById("nextButton").disabled = true;
                document.getElementById("nextButton").classList.add("btnDisable");
                questionText.innerHTML = "Thanks for participating in this study. Your file should start downloading automatically";
                saveAnswer();
                makeCSV();
            }
        } else {
            answerInput.placeholder = "You have to type in something first!";
            console.log("Type something in the text field first!")
        }
    });
}

function loadNextQuestion() {
    if(allQuestionCounter == 0) {
        currentQuestionField = "green_questions";
        questionFieldCounter = 0;
        resetQuestionArray();
    } else if(allQuestionCounter == 7) {
        currentQuestionField = "yellow_question";
        questionFieldCounter = 1;
        resetQuestionArray();
    } else if(allQuestionCounter == 14) {
        currentQuestionField = "orange_question";
        questionFieldCounter = 2;
        resetQuestionArray();
    }
    changeQuestion();
}

function changeQuestion() {
    let randNumber = getRandomNumberFrom0To1(),
    currentDisease = diseasesUsed[selectedQuestionsPerGroupCounter],
    currentDiseaseToCompare = "";

    for(let i=0; i<3; i++) {
        currentDiseaseToCompare = diseaseTemplate[questionsPerGroupCounter];
        if(currentDisease !== currentDiseaseToCompare) {
            questionsPerGroupCounter++;
        }
    }
    currentQuestion = jsonData["questions"][questionFieldCounter][currentQuestionField][questionsPerGroupCounter][currentDisease][randNumber];
    questionText.innerHTML = currentQuestion;
    answerArray.push(currentQuestion);

    allQuestionCounter++;
    questionsPerGroupCounter++;
    selectedQuestionsPerGroupCounter++;
}

function resetQuestionArray() {
    questionsPerGroupCounter = 0;
    selectedQuestionsPerGroupCounter = 0;
    diseasesUsed = diseaseTemplate.slice();
    for(let i=10; i>7; i--) {
        let randNumber = getRandomNumberFrom0ToValue(i);
        diseasesUsed.splice(randNumber, 1);
    }
}

function saveAnswer() {
    let answer = answerInput.value;
    answerArray.push(answer);

    answerInput.value = "";
    console.log("Answer saved!");
    //console.log(answerArray);
}

function makeCSV() {
    console.log("I make CSV now from:");
    console.log(answerArray);
    generateCsv(answerArray, delimiter);
}


function getRandomNumberFrom0To1() {
    let number = Math.floor(Math.random() *2)
    return number;
}

function getRandomNumberFrom0ToValue(value) {
    let number = Math.floor(Math.random() * value);
    return number;
}

init();

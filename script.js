const questions = [
    {
        question : "What is your name ?",
        answers : [
            {text : "Viral", correct : false} ,
            {text : "Anusha", correct : true},
            {text : "Kirav", correct : false},
            {text : "Teja", correct : false}        
        ]
    },
    {
        question : "What Class do you study in ?",
        answers : [
            {text : "1st ", correct : false} ,
            {text : "5th ", correct : true},
            {text : "3rd", correct : false},
            {text : "8ht", correct : false}        
        ]
    },
    {
        question : "What is your favourite game ?",
        answers : [
            {text : "chess", correct : false} ,
            {text : "table tennis", correct : true},
            {text : "football", correct : false},
            {text : "PS 5", correct : false}        
        ]
    },
]

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("ans-btns");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// function showQuestion(){
//     let question = questions[currentQuestionIndex]
//     let question_no = 1 + currentQuestionIndex  
    
//     questionElement.innerHTML = question_no + ". " + question 

// }
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex]
    let question_no = 1 + currentQuestionIndex  
    questionElement.innerHTML = question_no + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        // button.innerHTML = Currentquestion.answer
        // button.classList = "btn"
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer)
        // answerButton.addEventListener("click")
    });
}

function resetState(){
    nextButton.style.display="none"
    while(answerButton.firstChild){
        // answerButton.firstChild.removeChild
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e){
    const selectBtn = e.target
    const isCorrect = selectBtn.dataset.correct === "true"
    if(isCorrect){
        selectBtn.classList.add("correct")
        score++
    }else{
        selectBtn.classList.add("incorrect")
    }
    // Array(answerButton.correct)forEach(answerButton){
    //     if(selectBtn.dataset.correct === "true"){
    //         selectBtn.classList.add("correct")
    //     }
    // }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true ;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState()
    console.log("we are in showScore")
    questionElement.innerHTML = `You have scored ${score} out of ${questions.length}`
    nextButton.innerHTML = "Play Again!"
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        console.log("we are in handleNextButton")
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz()
    }
})

startQuiz();
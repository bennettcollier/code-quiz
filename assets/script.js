var qArray = [];

// Question object structure:
test = {q:"Which of the following functions of Array objects joins all elements of an array into a string?",
    p: ["concat()", "join()", "var()", "map()"],
    a: 1};

test2 = {q:"How do you call a function named 'myFunction'?",
    p: ["myFunction()","call function myFunction()", "call myFunction()"],
    a: 0};

test3 = {q:"How do you write 'Hello World' in an alert box?",
    p: ["('Hello World')","alert('Hello World')", "makealert('Hello World')"],
    a: 1};

test4 = {q: "How do we write an IF statement in JavaScript?",
    p: ["if i=5 then", "if i===5", "if (i==5)"],
    a: 2};

test5 = {q: "Inside which HTML element do we put the JavaScript?",
    p: ["<script>", "<scripting>", "<head>", "<java>"],
    a: 0};

test6 = {q: "The external JavaScript file must contain the <script> tag.",
    p: ["True", "False"],
    a: 1};

test7 = {q: "How do we write an IF statement if 'i' is NOT equal to 5?",
    p: ["if (i=5)", "if (i/=/5", "if (!i=5!)", "if (i != 5)"],
    a: 3};

test8 = {q: "Where do we insert a JavaScript?",
    p: ["The <footer>", "The <body> section", "The <head> section", "The <head> or the <body>"],
    a: 3}


qArray[0] = test;
qArray[1] = test2;
qArray[2] = test3;
qArray[3] = test4;
qArray[4] = test5;    
qArray[5] = test6;
qArray[6] = test7; 



var i_current = 0;
var score = 0;
var currentTime = 120;


// the body and header
var bodyEl = document.body;
bodyEl.setAttribute("style", "background-color: azure")

var headerEl = document.createElement("header");
headerEl.setAttribute("style", "height: 60px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; padding: 0 20px;font-size: 20px; background-color: lightblue");


// high scores
var highscoreLinkEl = document.createElement("div");
highscoreLinkEl.textContent = "High Scores";
highscoreLinkEl.setAttribute("id", "highscoresBtn");
highscoreLinkEl.setAttribute("style", "color: midnightblue; font-weight: bold; font-style: italic");

// timer
var timerEl = document.createElement("div");

// start button
var startButtonEl = document.createElement("button");
startButtonEl.setAttribute("id", "startbutton");
startButtonEl.setAttribute("type", "button");
startButtonEl.setAttribute("style", "width: 200px; height: 50px; color: white; font-weight:bolder; background-color: cornflowerblue");
startButtonEl.textContent = "Start Quiz!"


// header
headerEl.appendChild(highscoreLinkEl);
headerEl.appendChild(startButtonEl);
headerEl.appendChild(timerEl);
bodyEl.appendChild(headerEl);


// main section
var mainEl = document.createElement("main");


// questions 
var qContainerEl = document.createElement("div");
qContainerEl.setAttribute("id", "qContainer");
qContainerEl.setAttribute("style", "display: flex; flex-direction: column-reverse; align-items: center");


// quiz information
var readMeEL = document.createElement("div");
readMeEL.setAttribute("style", "color: darkslategray")
readMeEL.innerHTML =`<p>
Test your JavaScript skills here!<br><br>
* The quiz is timed. You will have 120 seconds.<br>
* If you answer incorrectly, 5 seconds will be deducted from your remaining time.<br>
* If you answer correctly, you will win 100 points!<br>
* You can save results in browser. <br>
* New questions are given until the timer is up or until all questions have been answered. <br>
</p>`;

qContainerEl.appendChild(readMeEL);

// main section
mainEl.appendChild(qContainerEl);
bodyEl.appendChild(mainEl);


var buildQuestionElement = function(qObj){
    var qEl = document.createElement("div");
    qEl.setAttribute("style", "display: flex; flex-direction: column; flex-wrap: wrap")
    
    var qH2El = document.createElement("h2");
    qH2El.textContent = qObj.q;
    qEl.appendChild(qH2El);

    // answer options
    possibleAnswersEl = buildAnswerbuttons(qObj);
    qEl.appendChild(possibleAnswersEl);

    return qEl;
};

var buildAnswerbuttons = function(qObj){
    var ansBtnContainer = document.createElement("div");
    ansBtnContainer.setAttribute("style", "display: flex, flex-direction: column, flex-wrap: wrap")

    for(var i=0; i<qObj.p.length;i++){
        pButtonEl = document.createElement("div");
        pButtonEl.textContent = (i+1) + ". " + qObj.p[i];
        pButtonEl.setAttribute("data-index", i);
        pButtonEl.setAttribute("class", "choiceBtn"); 
        pButtonEl.setAttribute("style", "height: 25px; width: auto; color: blue");
        
        //append button to container
        ansBtnContainer.appendChild(pButtonEl);
    } 
    return ansBtnContainer;
};

var putQuestionInDOM = function(qObj){
    qEll = buildQuestionElement(qObj);
    var id = "qElement" + i_current;
    
    qEll.setAttribute("id", id);
    qEll.setAttribute("style", "display: inline; width: 500px; padding: 20px; margin: 20px; border: 2px solid black; color: darkblue" )

    qContainer = document.getElementById("qContainer"); 
    qContainer.appendChild(qEll); 
};


// check answers
var buildReponseEl = function(qEl, answer){

    
    respEl = document.createElement("div");

    qEl.a = parseInt(qEl.a)
    answer = parseInt(answer)

    if(qEl.a === answer){
        right = "Correct ! Number " + (qEl.a+1) + " is the right answer! You get 100 points!";
        score += 100;
        

    } else {
        right = "Incorrect!" + " You answered " + (answer+1) + " The correct answer is " + (qEl.a+1) + "! 5s subtracted!";
        currentTime -= 5;       
    };
 
    respEl.textContent = "That is: " + right; 
    var id = "qElement" + i_current;
    document.getElementById(id).appendChild(respEl);
};


var startClicked = function(){

    // reset
    i_current = 0;
    score = 0; // score starts at 0
    currentTime = 120; // seconds

    document.getElementById("qContainer").innerHTML = ""
    startButtonEl.hidden = true;
    
    // start timer
    var runningTime = 120; 
    timerFunc(timeElapsed);

    // randomize question order
    qArray.sort( () => .5 - Math.random() );

    // first question
    putQuestionInDOM(qArray[0]);
};

// timed things
var updateAtTimeCycle = function(timeval){
    timerEl.textContent = "Timer: " + timeval + "s";
    timerEl.setAttribute("style", "color: darkblue");

    if(timeval <= 3){
        timerEl.setAttribute("style", "color: red")
    }
};

   
function timerFunc(tElapsedCallback){  
    var countdownInnerFunc = function(){
       
        updateAtTimeCycle(currentTime);
        currentTime --;
        
        if(currentTime <= 0){
            clearInterval(timer);
            updateAtTimeCycle("Time is up!"); 
            tElapsedCallback(); 
        };
    };
    var timer = setInterval(countdownInnerFunc,1000);    
}


// timer done
function timeElapsed(){
    console.log("Out of time");
    
    // show score
    var scoreEl = document.createElement("div");
    scoreEl.textContent = "Congratulations! Your score was: " + score;

    // show scores
    document.getElementById("qContainer").innerHTML = ""
    document.getElementById("qContainer").appendChild(scoreEl);

    // get player name
    var playerName = window.prompt("Enter your name to save your score!");   
    
    // if name is added
    if(playerName){

        scoreObj = { 
            "name": playerName,
            "score": score
        };

        // get highscores from storage
        var storageArray = localStorage.getItem("scoreArray");
        if(storageArray != null){;
            storageArray = JSON.parse(storageArray)
            storageArray.push(scoreObj);
            localStorage.setItem("scoreArray",JSON.stringify(storageArray));
        } else {
            var storageArray = [];
            storageArray.push(scoreObj);
            localStorage.setItem("scoreArray",JSON.stringify(storageArray));
        };
    };

    // start new game
    startButtonEl.textContent = "Play again!"
    startButtonEl.hidden = false;
};

    
var ansBtnClickHandler = function(event){    

    var ansIdx = event.target.getAttribute("data-index");        
    if(ansIdx){
           
        buildReponseEl(qArray[i_current], ansIdx);

        if(i_current < qArray.length-1 ) {
            i_current++
            console.log(i_current);
            putQuestionInDOM(qArray[i_current]);
           
        } else {
            alert("No more questions!");
            currentTime = 1;
        }   
    };    
};

var highScoresClicked = function(){
    // get highscores from storage    
    var highScoreEl = document.createElement("div");
    var highScoreElH2 = document.createElement("h2");
    highScoreElH2.textContent = "High Scores: ";
    highScoreEl.appendChild(highScoreElH2);

    var clearHighscoresBtn = document.createElement("button");
    clearHighscoresBtn.textContent = "Clear High Scores List?";

    var storageArray = localStorage.getItem("scoreArray");
    if(storageArray != null){;
        
        var oListEl = document.createElement("ol");
        
        // parse and sort the highscore array
        storageArray = JSON.parse(storageArray)
        storageArray = storageArray.sort((a,b)=>(a.score > b.score)?-1:1);

        for(highScore of storageArray){
            var listEl = document.createElement("li");
            listEl.textContent = "Name: " + highScore.name + " Score: " + highScore.score
            oListEl.appendChild(listEl);                 
        }; 
        highScoreEl.appendChild(oListEl);
        
    } else {
        var scoresParagraph = document.createElement("div");
        scoresParagraph.textContent = "No saved scores yet!";
        highScoreEl.appendChild(scoresParagraph);
        clearHighscoresBtn.hidden = true;
    };

    clearHighscoresBtn.addEventListener("click",clearHighscoresHandler);
       
    // show scores
    document.getElementById("qContainer").innerHTML = "";
    document.getElementById("qContainer").appendChild(clearHighscoresBtn);
    document.getElementById("qContainer").appendChild(highScoreEl);
    
};

var clearHighscoresHandler = function(){
    localStorage.removeItem("scoreArray");
    highScoresClicked();
}


// event listeners

mainEl.addEventListener("click", ansBtnClickHandler); 

// buttons
startButtonEl.addEventListener("click", startClicked);
highscoreLinkEl.addEventListener("click", highScoresClicked);
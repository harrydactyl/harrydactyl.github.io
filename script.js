//src = "jQuery.js";//import jQuery

var quiz={
    "questions": [{
        "question": "What year was Trinity founded?",
            "1": "1910",
            "2": "1709",
            "3": "1802",
            "4": "1950",
            "5": "1800",
            "correct": "1709"
    }, {
        "question": "What is Trinity's student:teacher ratio?",
            "1": "6:1",
            "2": "5:1",
            "3": "10:1",
            "correct": "6:1"
    }, {
        "question": "What are Trinity's school colors?",
            "1": "Blue and Gold",
            "2": "White and Blue",
            "3": "Green and Gold",
            "4": "Purple and White",
            "correct": "Blue and Gold"
    }, {
        "question": "How big is the Trinity senate?",
            "1": "8 students",
            "2": "4 students",
            "3": "16 students",
            "correct": "16 students"
    }, {
        "question": "How many varsity teams does the upper school have in the winter season?",
            "1": "8 teams",
            "2": "6 teams",
            "3": "4 teams",
            "4": "5 teams",
            "5": "7 teams",
            "correct": "6 teams"
    }, {
        "question": "On what street is Trinity located?",
            "1": "91st st",
            "2": "100th",
            "3": "84th",
            "correct": "91st"
    }, {
        "question": "On what floor is Trinity's math lab",
            "1": "The first floor",
            "2": "The third floor",
            "3": "The second floor",
            "4": "The basement",
            "correct": "The second floor"
    }, {
        "question": "How many semester(s) of art does the Upper School require?",
            "1": "Three semesters",
            "2": "One semester",
            "3": "Two semesters",
            "4": "No semesters of art are required",
            "correct": "Three semesters"
    }, {
        "question": "How many pool(s) does Trinity have?",
            "1": "One pool",
            "2": "Two pools",
            "3": "No pools",
            "correct": "Two pools"
    }, {
        "question": "Which Canadian province is part of Trinity's global travel program?",
            "1": "British Columbia",
            "2": "Ontario",
            "3": "Quebec",
            "correct": "Quebec"
    }]                                  

}
/*$(document).ready(function(){
        var data;
        data= $.getJSON("questions.json", function(data) {
        quiz = data;
    });
});//end jQuery
alert(quiz);
*/

var score= new Array(quiz.questions.length);
var current=-1;

function firstNext() {
    if(localStorage.getItem("accountExists")==true){
        logIn();
    }
    else{
        signUp();
    }
    var choice;
    var didTheUserCheckSomething=false;
    var radios = document.getElementsByName("choice");
    for (i = 0; i<radios.length; i++) {
        if (radios[i].checked) {
            didTheUserCheckSomething=true;
            choice=quiz.questions[current][i+1];
            correct=quiz.questions[current].correct;
            if(choice==correct){
                score[current]=1;//using an array helps with the back button
            }
            //alert("You chose "+quiz.questions[current][i+1]+"! Nice choice!");
        }
    }
    if(didTheUserCheckSomething==true || current==-1){
        //$.("entireQuiz").fadeOut("fast");//not working properly+can't fix
        current += 1;
        show();
    }
}

function next() {
    //localStorage();
    var choice;
    var didTheUserCheckSomething=false;
    var radios = document.getElementsByName("choice");
    for (i = 0; i<radios.length; i++) {
        if (radios[i].checked) {
            didTheUserCheckSomething=true;
            choice=quiz.questions[current][i+1];
            correct=quiz.questions[current].correct;
            if(choice==correct){
                score[current]=1;//using an array helps with the back button
            }
            //alert("You chose "+quiz.questions[current][i+1]+"! Nice choice!");
        }
    }
    if(didTheUserCheckSomething==true || current==-1){
        //$.("entireQuiz").fadeOut("fast");//not working properly+can't fix
        current += 1;
        show();
    }
}

function back() {
    if (current != 0) {
        score[current-1]=0;//reset the score from the last question
        current -= 1;
    }
    show();
}
    
function show() {
    if(current<quiz.questions.length){
        var html = "";
        //alert(quiz.questions[current][1]);
        //alert("working0");
        html += "<br> <b><u>" + quiz.questions[current].question + "</u></b><br><br>";
        //alert("working0");
        var size=howLong();
        //howLong();
        //alert("working1");
        for (i = 1; i <=size; i++) {
            //alert("working2");
            //alert(quiz.questions[current].length);
            var num = i.toString();
            console.log(num + ": " + quiz.questions[current][i]);
            html += "<input type=\"radio\" name=\"choice\">";
            html += quiz.questions[current][i];
            html += "<br><br>";
        }
        html += "<button type=\"button\" onclick=\"back()\">Back</button><button type=\"button\" onclick=\"next()\">Next</button><br><br>";

        document.getElementById("entireQuiz").innerHTML = html;

        document.getElementById("greeting").innerHTML= "<br>"+"You're so smart! I know you'll get a perfect score, "+document.getElementById("username").value+"."+"<br><br>";
    }
    
    else{
        document.getElementById("greeting").innerHTML="<br><br>Nice work! Here's your score!<br><br><br>";
        var totalScore=0;
        for(i=0; i<score.length; i++){
            if(score[i]==1){
                totalScore+=1;
            }
        }//total up the score
        var scorepage = "<br><br>Your final score is "+totalScore+"!<br><br>";
        scorepage+="<canvas id=\"canvas\" width=\"200\" height=\"150\"></canvas>";
        scorepage+="<br>"+100*totalScore/quiz.questions.length+"%<br><br>";
        document.getElementById("entireQuiz").innerHTML= scorepage;
        var my_canvas;
        my_canvas=document.getElementById("canvas");
        var context;
        context=my_canvas.getContext("2d");
        context.beginPath();
        context.fillStyle="#FF4000";//red
        context.beginPath();
        context.arc(100,75,60,0,2*Math.PI);//full circle/wrong/red
        context.closePath();
        context.fill();
        context.stroke();
        context.fillStyle="#00BFFF";//blue
        context.stroke();
        context.beginPath();
        context.arc(100,75,60,0,2*Math.PI*totalScore/quiz.questions.length);//correct
        context.lineTo(100,75);
        context.closePath();
        context.fill();
        context.stroke();
    }
}//end show()

function howLong(){
    var size=0;
    for (i = 0; i < 1000; i++) {//DYNAMIC!!
        if(quiz.questions[current][i+1]==undefined){
            return size;
        }
        else{
            size=size+1;
        }
    }
}

function signUp(){
    localStorage.setItem("usernamee", document.getElementById("username").value);
    localStorage.setItem("pass", document.getElementById("password").value);
    localStorage.setItem("accountExists",true);
    alert("you now have an account!");
}

function logIn(){ 
    if(document.getElementById("username").value==localStorage.getItem("usernamee")&&  document.getElementById("password").value==localStorage.getItem("pass")){
        alert("logged in");
        next();
    }
    else{//don't let them take the quiz
        alert("you didn't do it right");
    }
}
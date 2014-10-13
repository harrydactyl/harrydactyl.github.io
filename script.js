//src = "jQuery.js";//import jQuery

var quiz;

alert("working 1");
$(document).ready(function(){
    alert("working 2");
    var getData= $.getJSON("questions.json", function(data) {
        quiz = data;
    });
});//end jQuery

var score= new Array(quiz.questions.length);
var current=-1;

function next() {
    localStorage();
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

function localStorage(){
    localStorage.setItem("nombre", "Smith");
    localStorage.setItem("pass", "123");
    document.getElementById("username").innerHTML = localStorage.getItem("nombre"+"pass");
}

/*cool
<!DOCTYPE html>
<html>
<head>
<script>
function clickCounter() {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount)+1;
        } else {
            localStorage.clickcount = 1;
        }
        document.getElementById("result").innerHTML = "You have clicked the button " + localStorage.clickcount + " time(s).";
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
}
</script>
</head>
<body>
<p><button onclick="clickCounter()" type="button">Click me!</button></p>
<div id="result"></div>
<p>Click the button to see the counter increase.</p>
<p>Close the browser tab (or window), and try again, and the counter will continue to count (is not reset).</p>
</body>
</html>
*/
var hold;
var form = 1;
var current;

function loadJSON() {
    alert(1);
    hold = $.getJSON("form.json", function(data) {
        alert(2);
        form=data;
        alert(3);
    });
    alert(4);
    if(form!=1) {
        alert(5);
        generateForm();
    }
    alert(6);
}

function generateForm() {
    alert(1);
    for (i = 1; i <=3; i++) { ////change 3 to a size function
        var html;
        for (j = 1; j <=3; j++) {//form.questions[i].size
        html += "<input type="+form.questions[i].type+" name=\"choice\">";
        html+=form.questions[i][i];
        html += "<br><br>";
        }
    }
    alert("good");
}

/*
var hold;
var quiz=5;
var score;
var current = -1;

function loadJSON() {
    alert(1);
    hold=$.getJSON("questions.json", function(data) {
        alert(2);
        quiz=data;
        alert(3);
    });
    alert(4);
    if(quiz!=5){
        alert(5);
        generateForm();
    }
    alert(6);
}

function generateForm() {
    var choice;
    var didTheUserCheckSomething=false;
    var radios = document.getElementsByName("choice");
    for (i = 0; i<radios.length; i++) {
        if (radios[i].checked) {
            didTheUserCheckSomething=true;
            choice=quiz.questions[current][i+1];
            correct=quiz.questions[current].correct;
            if(choice==correct){
                score[current]=1;
            }
        }
    }
    if(didTheUserCheckSomething==true || current==-1){
        //$.("entireQuiz").fadeOut("fast");
        current += 1;
            show();
    }
}

function show(){
        var html = "";
        var size=howLong();
        for (i = 1; i <=size; i++) {////here!
            html += "<br> <b><u>" + quiz.questions[i].question + "</u></b><br><br>";
            html += "<input type="+quiz.questions[i].type+" name=\"choice\">";
            html+=quiz.questions[i][j];
            html += "<br><br>";
        }
        html += "<br>";
        document.getElementById("entireQuiz").innerHTML = html;
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
}*/
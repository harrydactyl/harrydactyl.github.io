var hold;
var quiz={
    "questions": [{
        "question": "What year was Trinity founded?",
        "1": "1910",
        "2": "1709",
        "3": "1802",
        "4": "1950",
        "5": "1800",
        "correct": "1709",
        "image": "\"old person\""
    }]
}
var score = [];
var current = -1;

function firstNext() {
   $.ajaxSetup({
        async: false
    });
    quiz=$.getJSON("questions.json", function(data) {
       alert(JSON.stringify(data)+"1");
       console.log(3);
       quiz=data;
       score=new Array(quiz.questions.length);
        //quiz=JSON.stringify(data);
       next();
    });
    /*$.getJSON("http://harrydactyl.github.io/questions.json", setData);*/
    if(localStorage.getItem("accountExists")=="true"){
        logIn();
    }
    else{
        signUp();
    }
    
}

/*function setData(data){
    alert(data);
    quiz=data;
    score=new Array(quiz.questions.length);
}*/
/*function doNext(){
    $("#entireQuiz").fadeOut("slow", next() {
    // Animation complete.
  });
}*/

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

function show(){
    if(current<quiz.questions.length){
        var html = "";
        console.log(quiz.questions[current].question);
        html += "<br> <b><u>" + quiz.questions[current].question + "</u></b><br><br>";
        var size=howLong();
        for (i = 1; i <=size-1; i++) {////here!
            var num = i.toString();
            console.log(num + ": " + quiz.questions[current][i]);
            html += "<input type=\"radio\" name=\"choice\">";
            html+=quiz.questions[current][i];
            html += "<br><br>";
        }
        getFlickr();
        html += "<br>";
        html += "<button type=\"button\" onclick=\"back()\">Back</button><button type=\"button\" onclick=\"next()\">Next</button><br><br>";
        document.getElementById("entireQuiz").innerHTML = html;
        document.getElementById("greeting").innerHTML= "<br>"+"You're so smart! I know you'll get a perfect score, "+document.getElementById("username").value+"."+"<br><br>";
    }
    
    else{
        var totalScore=0;
        for(i=0; i<score.length; i++){
            if(score[i]==1){
                totalScore+=1;
            }
        }//total up the score
        var setter=localStorage.getItem("scores")
        setter+=totalScore
        setter+=", "
        setter+=localStorage.getItem("usernamee")+"<br>";
        localStorage.setItem("scores",setter);
        document.getElementById("greeting").innerHTML="<br><br>Nice work! Here's your score!<br><br><br>";
        var scorepage = "<br><br>Your final score is "+totalScore+"!<br><br>";
        scorepage+="<canvas id=\"canvas\" width=\"200\" height=\"150\"></canvas>";
        scorepage+="<br>"+100*totalScore/quiz.questions.length+"%<br><br>";
        scorepage+="Scores:"+"<br>"
        scorepage+=localStorage.getItem("scores");
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
    localStorage.setItem("accountExists","true");
    alert("you now have your first account!");
}

function logIn(){ 
    //alert("logging in");
    if(document.getElementById("username").value==localStorage.getItem("usernamee")&&  document.getElementById("password").value==localStorage.getItem("pass")){
        //alert("logged in");
    }
    else{//don't let them take the quiz
        //alert("creating a new account");
    }
}

function getFlickr() {
    var tag=quiz.questions[current].image;
    $.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d59d33d61747a729725116118d900e94&text=" +
            tag + "&format=json&nojsoncallback=1", showPicture);
}

function showPicture(data) {
    var html;
    console.log("works");
    html+= '<a href="';
    html+="https://farm" + data.photos.photo[0].farm+".staticflickr.com/" + data.photos.photo[0].server+"/" + data.photos.photo[0].id+"_"+data.photos.photo[0].secret + ".jpg"
    html+='" target="_blank">';
    
    html += '<img title="' + data.photos.photo[0].title
    html+='" src="' + "https://farm" + data.photos.photo[0].farm + ".staticflickr.com/"
    html+=data.photos.photo[0].server + "/" + data.photos.photo[0].id
    html+="_" + data.photos.photo[0].secret+".jpg";
    html += '" alt="'+data.photos.photo[0].title + '" />'+'</a>';
    document.getElementById("entireQuiz").innerHTML+=html;
}
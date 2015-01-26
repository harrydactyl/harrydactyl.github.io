var nameHolder;
var passHolder;
var first=true;
var first2=true;

var form={
    "questions": [{
        "question": "How does your head feel?",
        "type": "radio",
        "1": "Normal",
        "2": "Poor",
        "3": "Horrendous"
    }, {
        "question": "On a scale of 1 to 10 how dizzy do you feel (10 being the dizziest)",
        "type": "number",
        "idfind": "one",
        "min": 1,
        "max": 10
    }, {
        "question": "Are you able to read anything?",
        "type": "radio",
        "1": "Easily",
        "2": "Not really",
        "3": "Not at all"
    }, {
        "question": "Anything else?",
        "idfind": "two",
        "type": "text"
    }]
}

function begin(){
    var html= "<input type=\"text\" name=\"name\" id=\"name\" placeholder=\"NAME\"";
    html+=" value="+localStorage.getItem("lastname")+">";
    html+="<br><input type=\"text\" name=\"password\" id=\"password\" placeholder=\"PASSWORD\"><br><input type=\"text\" name=\"trainer\" id=\"trainer\" placeholder=\"TRAINER NAME\"><br><br><button type=\"button\" onclick=\"logIn()\">Log in</button><button type=\"button\" onclick=\"register()\">Register</button><br><br>"
    document.getElementById("format").innerHTML = html;
}

function generateForm() {
    var html="";
    html+="<br>";
    for (i = 0; i <=3; i++) { ////change 3 to a size function
        html+="<br><br>"
        if(form.questions[i].type=="radio"){
            html+="<form>";
            html+="<font color=\"black\">"+form.questions[i].question+"</font><br>";
            for (j = 1; j <=3; j++) {//form.questions[i].size
                html += "<input type=radio name=\"choice\" value="+form.questions[i][j]+">";
                html+=form.questions[i][j];
                html+="<br>";
            }
            html+="</form>";
        }
        else{
            html+="<font color=\"black\">"+form.questions[i].question+"</font><br>";
            html += "<input type="+form.questions[i].type+" id="+form.questions[i].idfind+">";
            //html+=form.questions[i][j];
        }
    }
    html+="<br><br>";
    html+="<button type=\"button\" onclick=\"outputData()\">submit!</button>";
    html+="<br><br><br>";
    document.getElementById("format").innerHTML = html;
}


function outputData(){
    var url="https://script.google.com/macros/s/AKfycbyslCQDjkX_YM55QGK8BAckA9MehGVPNcnlJQGtmtn-SsIBXVo/exec?add&prefix=func&";
    url+="name="+encodeURI(nameHolder)+"&pass="+passHolder+"&";
    
    
    /*var radios = document.getElementsByName("choice");
    for (i = 0; i <=3; i++) {
        html+="<br><br>"
        if(form.questions[i].type=="radio"){
            for (j = 1; j <=3; j++) {
                html+=form.questions[i][j];
                html+="<br>";
            }
        }
    }*/
    
    var choice;
    var radios = document.getElementsByName("choice");
    for (i = 0; i<radios.length; i++) {
        if (radios[i].checked) {
            //choice=form.questions[i][i+1];
            choice=encodeURI(radios[i].value);
            if(first==true){
                //choice=form.questions[0][i];
                url+="q1="+choice+"&";
                first=false;
            }
            else{
                url+="q3="+choice+"&";
            }
        }
    }
    url+="q2="+encodeURI(document.getElementById("one")).value+"&";
    url+="q4="+encodeURI(document.getElementById("two").value);
    var html="<a href="+url+">complete survey</a>";
    document.getElementById("format").innerHTML = html;
}

function logIn(){
    //event.preventDefault();
    nameHolder=encodeURI(document.getElementById("name").value);
    passHolder=document.getElementById("password").value;
    localStorage.setItem("username", nameHolder);
    //localStorage.setItem("userpassword", passHolder);
    var script = document.createElement("script");
        script.src = "https://script.google.com/macros/s/AKfycbyslCQDjkX_YM55QGK8BAckA9MehGVPNcnlJQGtmtn-SsIBXVo/exec?studentLogin&prefix=func&name="+nameHolder+"&pass="+passHolder;
        document.getElementById("format").appendChild(script);
}

function func(data){
    if(data.login=="true"){
    }
    generateForm();
}

function register(){
    nameHolder=document.getElementById("name").value;
    passHolder=document.getElementById("password").value;
    var trainerHolder=document.getElementById("trainer").value;;
    var html;
    html = "https://script.google.com/macros/s/AKfycbyslCQDjkX_YM55QGK8BAckA9MehGVPNcnlJQGtmtn-SsIBXVo/exec?createStudent&prefix=func";
    html+="&name="+encodeURI(nameHolder)+"&pass="+passHolder+"&trainerName="+trainerHolder;
    var url="<a href="+html+">create account</a>";
    document.getElementById("format").innerHTML += url;
}
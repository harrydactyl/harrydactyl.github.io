/*var hold;
var form = 4;
//var current;
*/
var form={
    "questions": [{
        "question": "How does your head feel?",
        "type": "radio",
        "1": "Completely normal",
        "2": "Almost normal",
        "3": "Not great",
        "4": "Bad",
        "5": "Super bad"
    }, {
        "question": "Do you have any of these symptoms?",
        "type": "checkbox",
        "1": "Blurred vision",
        "2": "Tired",
        "3": "Cannot move"
    }, {
        "question": "Are you able to read anything?",
        "type": "radio",
        "1": "Nope",
        "2": "Yeah",
        "3": "Kind of"
    }]
}

function loadJSON() {/*
    alert(1);
    hold=$.getJSON("form.json", function(data) {
        alert(2);
        form=data;
        alert(3);
    });
    if(form!=4) {
        alert(5);*/
        generateForm();/*
    }
    alert(6);*/
}

function generateForm() {
    var html="";
    for (i = 0; i <=2; i++) { ////change 3 to a size function
        html+="<br><br>"
        html+="<font color=\"black\">"+form.questions[i].question+"</font><br>";
        for (j = 1; j <=3; j++) {//form.questions[i].size
            html += "<input type="+form.questions[i].type+" name=\"choice\">";
            //alert(form.questions[i][i]);
            html+=form.questions[i][j];
            html += "<br>";
        }
        html+="<br>"
    }
    html+="<br><input type=\"submit\" value=\"Submit\">";
    //html+=<button type="button" onclick="loadJSON()">BEGIN</button>
    html+="<br><br><br>";
    document.getElementById("format").innerHTML = html;
}

/*function outputData(){
    var d=new date;
    var dd=d.getDate();
    var password="password";
    var out;
    var pain=5;
    var happiness=3;
    var other="My life sucks";
    out={
        studentUser1{
			passwordHash: password,
            dates:[
                dd{
				pain: pain,
				happiness: happiness,
				other: other
                }
            ],
        }
    }
    alert(out);
}*/
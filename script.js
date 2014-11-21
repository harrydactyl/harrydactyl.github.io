var hold;
var form = 1;
var current;

function loadJSON() {
    hold = $.getJSON("form.json", function(data) {
        form=data;
    });
    if(form != 1) {
        //generateForm();
    }
}
/*
function generateForm() {
    for (i = 1; i <=3; i++) {////change 3 to a size function next draft
        for (j = 1; j <=3; j++) {//form.questions[i].size
        html += "<input type="+form.questions[i].type+" name=\"choice\">";
        html+=form.questions[i][i];
        html += "<br><br>";
        }
    alert("good");
}*/
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
    if(form != 1) {
        alert(5);
        //generateForm();
    }
    alert(6);
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
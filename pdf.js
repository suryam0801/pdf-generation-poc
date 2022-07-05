const { jsPDF, AcroFormCheckBox } = require("jspdf"); // will automatically load the node version

var doc = new jsPDF();
doc.text('CheckBox:', 10, 125);

var checkBox = new AcroFormCheckBox();
checkBox.fieldName = "CheckBox1";
checkBox.Rect = [50, 120, 10, 10];
checkBox.value = 'Yes'
doc.addField(checkBox);
doc.rect(50,120, 10, 10);

doc.addImage("assets/longlogo.png", "PNG", 10, 10, 50, 50);

doc.save("file.pdf"); // will save the file in the current working directory
const { jsPDF, AcroFormCheckBox, AcroFormTextField } = require("jspdf"); // will automatically load the node version
const fs = require("fs");

const tallLogo = fs.readFileSync("./src/assets/talllogo.png", "base64");
const longLogo = fs.readFileSync("./src/assets/longlogo.png", "base64");

const config = { company_name: "Uniblox", policy_number: "01-000123-00", associated_company: "" };

var doc = new jsPDF();

doc.addImage(tallLogo, "PNG", 150, 10, 35, 18);

doc.setFontSize(20);
doc.setFont("times", "normal");
doc.text("Evidence of Insurability ", 15, 105);
doc.text("for Group Coverage ", 15, 113);

//FIRST PAGE INSTRUCTIONS BLOCK
//TITLE
doc.setFontSize(15);
doc.setFont("Times", "Bold");
doc.text("Instructions", 15, 150);

//SECTION HEADERS (LEFT SIDE)
doc.setFontSize(12);
doc.text("Employer/Policyholder", 15, 160);
doc.text("Employee/Applicant", 15, 170);

//SECTION PARAGRAPHCS (RIGHT SIDE)
doc.setFont("Times", "Roman");
doc.text(
  "Please complete Page 2 and provide to the employee/applicant to complete.",
  65,
  160
);
doc.text(
  "Please complete page 3, sign and date page 4 and an Authorization for Release of Medical Information form. If applying for spouse coverage, have your spouse complete page 6, sign and date page 7 and an Authorization for Release of Medical Information form. Return to Symetra for processing.",
  65,
  170,
  { maxWidth: 130 }
);
doc.text(
  "Two copies of the 'Authorization for Release of Medical Information' form are included in the back of this packet. One for you and one for your spouse, if applicable. ",
  65,
  195,
  { maxWidth: 130 }
);

//RECTANGLES WITH TEXT
//LEFT RECTANGLE
doc.setFontSize(12);
doc.rect(15, 210, 85, 33, "S");
doc.text(17, 215, "Completed forms can be mailed or faxed to:");
doc.text(17, 220, "Symetra Life Insurance Company");
doc.text(17, 225, "PO Box 34690");
doc.text(17, 230, "Seattle, WA 98124-1690");
doc.text(17, 240, "Fax: 1-866-348-0058");

//RIGHT RECTANGLE
doc.rect(110, 210, 85, 33, "S");
doc.text(112, 215, "Comments");

//FOOTER TEXT
doc.setFontSize(10);
doc.text(
  15,
  255,
  "Symetra Life Insurance Company | Benefits Division | 777 108th Avenue NE, Suite 1200 | Bellevue, WA 98004-5135 | www.symetra.com",
  { maxWidth: 185 }
);
doc.text(
  15,
  265,
  "Mailing Address: PO Box 34690 | Seattle, WA 98124-1690 | Phone 1-800-426-7784 | TTY/TDD 1-800-833-6388 "
);

//BOTTOM DIVIDER
doc.rect(15, 268, 180, 0.5, "F");

//--------------------------------------------------------
//NEW PAGE

doc.addPage();

//HEADER
//LOGO
doc.addImage(longLogo, "PNG", 15, 10, 50, 10);
//RIGHT SIDE COMPANY BIO
doc.setFontSize(12);
doc.setFont("Times", "Bold");
doc.text("Symetra Life Insurance Company", 110, 10);
doc.setFontSize(10);
doc.setFont("Times", "Roman");
doc.text("Benefits Division", 110, 14);
doc.text("777 108th Avenue NE, Suite 1200 | Bellevue, WA 98004-5135", 110, 18);
doc.text("Mailing Address: PO Box 34690 | Seattle, WA 98124-1690", 110, 22);
doc.text("Phone 1-800-426-7784 | TTY/TDD 1-800-833-6388", 110, 26);
doc.setFont("Times", "Bold");
doc.text("Fax completed forms to: 1-866-348-0058", 110, 30);

//TITLE
doc.setFontSize(16);
doc.setFont("Times", "Roman");
doc.text("EVIDENCE OF INSURABILITY FOR GROUP COVERAGE", 15, 40);

//TITLE DIVIDER
doc.rect(15, 42, 180, 0.5, "F");

//TITLE SUB-HEADER
doc.setFontSize(10);
doc.setFont("Times", "Bold");
doc.text(
  "Policyholders: Completely fill out Sections 1 – 3 and forward to the applicant to complete, sign and return to Symetra.",
  15,
  46
);

//SECTION 1 DIVIDER
doc.rect(15, 55, 180, 0.5, "F");

//SECTION 1 HEADER
doc.setFontSize(12);
doc.setFont("Times", "Bold");
doc.text("Section 1: Group Plan Details", 15, 60);
doc.setFontSize(10);
doc.setFont("Times", "Italic");
doc.text(" (to be completed by Policyholder) ", 70, 60);

//SUBSECTION DIVIDER
//SECTION 1 CONTENT
doc.line(30, 65, 195, 65); //(leftX, leftY, rightX, rightY)

doc.setFontSize(8);
doc.setFont("Times", "Roman");
doc.text("Company name (policyholder)", 31, 68);

var company_name_textfield = new AcroFormTextField();
company_name_textfield.Rect = [30, 70, 110, 6];
company_name_textfield.textAlign = "baseline";
company_name_textfield.fontSize = 10;
company_name_textfield.multiline = true;
company_name_textfield.value =
  config["company_name"].length > 0 ? config["company_name"] : "";
  company_name_textfield.fieldName = "company_name";
doc.addField(company_name_textfield);

doc.setFontSize(8);
doc.setFont("Times", "Roman");
doc.text("Policy Number", 145, 68);

var policy_number_textfield = new AcroFormTextField();
policy_number_textfield.Rect = [145, 70, 30, 6];
policy_number_textfield.textAlign = "baseline";
policy_number_textfield.fontSize = 10;
policy_number_textfield.multiline = true;
policy_number_textfield.value =
  config["policy_number"].length > 0 ? config["policy_number"] : "";
  policy_number_textfield.fieldName = "policy_number";
doc.addField(policy_number_textfield);

doc.line(30, 76, 195, 76); //(leftX, leftY, rightX, rightY)

doc.setFontSize(8);
doc.setFont("Times", "Roman");
doc.text("Division or associated company (if applicable)", 31, 79);

var associated_company_textfield = new AcroFormTextField();
associated_company_textfield.Rect = [30, 81, 110, 6];
associated_company_textfield.textAlign = "baseline";
associated_company_textfield.fontSize = 10;
associated_company_textfield.multiline = true;
associated_company_textfield.value =
  config["associated_company"].length > 0 ? config["associated_company"] : "";
  associated_company_textfield.fieldName = "associated_company";
doc.addField(associated_company_textfield);


// var checkBox = new AcroFormCheckBox();
// checkBox.fieldName = "CheckBox1";
// checkBox.Rect = [50, 120, 10, 10];
// checkBox.value = 'Yes'
// doc.addField(checkBox);
// doc.rect(50,120, 10, 10);

doc.save("file.pdf"); // will save the file inthe current working directory

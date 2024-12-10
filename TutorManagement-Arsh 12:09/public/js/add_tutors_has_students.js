// Citation for the following CREATE Implementation:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

let addTutorsHasStudentsForm = document.getElementById('add-tutors-has-students-form-ajax');

addTutorsHasStudentsForm.addEventListener("submit", function (e) {
    
    e.preventDefault();

    // Get input fields
    let inputTutor = document.getElementById("tutor-tutorStudent-input");
    let inputStudent = document.getElementById("student-tutorStudent-input");
    let inputSatisfaction = document.getElementById("studentSatisfactionInput");
    let inputGradeImprovement = document.getElementById("studentGradeImprovementInput");

    // Retrieve values
    let tutorIDValue = inputTutor.value; 
    let studentIDValue = inputStudent.value; 
    let studentSatisfactionValue = inputSatisfaction.value;
    let studentGradeImprovementValue = inputGradeImprovement.value;

    if (!tutorIDValue || !studentIDValue || !studentSatisfactionValue || !studentGradeImprovementValue) {
        console.log("Tutor ID:", tutorIDValue);
    console.log("Student ID:", studentIDValue);
    console.log("Student Satisfaction:", studentSatisfactionValue);
    console.log("Student Grade Improvement:", studentGradeImprovementValue);
        return;
    }

    let tutorName = inputTutor.options[inputTutor.selectedIndex].text;
    let studentName = inputStudent.options[inputStudent.selectedIndex].text;

    let data = {
        tutorID: tutorIDValue,
        studentID: studentIDValue,
        studentSatisfaction: studentSatisfactionValue,
        studentGradeImprovement: studentGradeImprovementValue
    };
    console.log("Data to be sent:", data);
    
    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-tutors-has-students-form-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    console.log("Data to be sent:", data);

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            addRowToTable(data, tutorName, studentName);

            inputTutor.value = '';
            inputStudent.value = '';
            inputSatisfaction.value = '';
            inputGradeImprovement.value = '';
            window.location.reload();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    xhttp.send(JSON.stringify(data));
    setTimeout(() => {
        window.location.reload();
    }, 500);
});

addRowToTable = (data, tutorName, studentName) => {
    let currentTable = document.getElementById("tutors-has-students-table");

    let newRowIndex = currentTable.rows.length;

    // Create new row
    let row = document.createElement("TR");
    let tutorsHasStudentsIDCell = document.createElement("TD");
    let tutorIDCell = document.createElement("TD");
    let tutorNameCell = document.createElement("TD");
    let studentIDCell = document.createElement("TD");
    let studentNameCell = document.createElement("TD");
    let studentSatisfactionCell = document.createElement("TD");
    let studentGradeImprovementCell = document.createElement("TD");

    tutorsHasStudentsIDCell.innerText = "New"; 
    tutorIDCell.innerText = data.tutorID;
    tutorNameCell.innerText = tutorName;
    studentIDCell.innerText = data.studentID;
    studentNameCell.innerText = studentName;
    studentSatisfactionCell.innerText = data.studentSatisfaction;
    studentGradeImprovementCell.innerText = data.studentGradeImprovement;

    row.appendChild(tutorsHasStudentsIDCell);
    row.appendChild(tutorIDCell);
    row.appendChild(tutorNameCell);
    row.appendChild(studentIDCell);
    row.appendChild(studentNameCell);
    row.appendChild(studentSatisfactionCell);
    row.appendChild(studentGradeImprovementCell);
    
    // Append the new row to the table
    currentTable.appendChild(row);
};

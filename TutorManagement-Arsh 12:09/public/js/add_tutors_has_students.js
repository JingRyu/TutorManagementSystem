
let addTutorsHasStudentsForm = document.getElementById('add-tutors-has-students-form-ajax');

addTutorsHasStudentsForm.addEventListener("submit", function (e) {
    
    e.preventDefault();

    let inputTutor = document.getElementById("input-tutor-ajax");
    let inputStudent = document.getElementById("input-student-ajax");
    let inputSatisfaction = document.getElementById("studentSatisfactionInput");
    let inputGradeImprovement = document.getElementById("studentGradeImprovementInput");

    let tutorIDValue = inputTutor.value; // Selected tutor ID
    let studentIDValue = inputStudent.value; // Selected student ID
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
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    xhttp.send(JSON.stringify(data));
});

addRowToTable = (data, tutorName, studentName) => {
    let currentTable = document.getElementById("tutors-has-students-table");

    let newRowIndex = currentTable.rows.length;

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

    currentTable.appendChild(row);
};

let updateTutorsHasStudentsForm = document.getElementById('update-tutors-has-students-form-ajax');

updateTutorsHasStudentsForm.addEventListener("submit", function (e) {

    e.preventDefault();

    // Get input fields
    let inputTutor = document.getElementById("tutor-tutorStudent-update");
    let inputStudent = document.getElementById("student-tutorStudent-update");
    let inputSatisfaction = document.getElementById("studentSatisfactionInput-update");
    let inputGradeImprovement = document.getElementById("studentGradeImprovementInput-update");

    // Retrieve values
    let tutorIDValue = inputTutor.value;
    let studentIDValue = inputStudent.value;
    let studentSatisfactionValue = inputSatisfaction.value;
    let studentGradeImprovementValue = inputGradeImprovement.value;

    if (!tutorIDValue || !studentIDValue || isNaN(studentSatisfactionValue) || isNaN(studentGradeImprovementValue)) {
        console.log("Tutor ID:", tutorIDValue);
        console.log("Student ID:", studentIDValue);
        console.log("Student Satisfaction:", studentSatisfactionValue);
        console.log("Student Grade Improvement:", studentGradeImprovementValue);
        return;
    }

    let data = {
        tutorID: tutorIDValue,
        studentID: studentIDValue,
        studentSatisfaction: studentSatisfactionValue,
        studentGradeImprovement: studentGradeImprovementValue
    };
   
    console.log("Data to be sent:", data);

    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-tutors-has-students-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                try {
                    // omit the error, keeps getting error here no solve solution
                    let response = JSON.parse(xhttp.response);
                    updateRow(response, tutorIDValue, studentIDValue);
                    console.log("Update successful");
                } catch (e) {
                    console.log("Non-JSON:", xhttp.response);
                }
    
                // Clear input fields
                inputTutor.value = '';
                inputStudent.value = '';
                inputSatisfaction.value = '';
                inputGradeImprovement.value = '';
            } else {
                console.log("error", xhttp.status);
            }
        }
    };

    xhttp.send(JSON.stringify(data));
    window.location.reload();
});

function updateRow(data, tutorIDValue, studentIDValue) {
    let table = document.getElementById("tutors-has-students-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (
            table.rows[i].getAttribute("data-tutorStudent-tutorID") == tutorIDValue &&
            table.rows[i].getAttribute("data-tutorStudent-studentID") == studentIDValue
        ) {
            let updateRowIndex = table.rows[i];

            // Update student satisfaction and grade improvement cells
            updateRowIndex.cells[5].innerText = data[0].studentSatisfaction;
            updateRowIndex.cells[6].innerText = data[0].studentGradeImprovement;
        }
    }
}

// Citation for the following UPDATE Implementation:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

let updateCoursesHasStudentsForm = document.getElementById('update-courses-has-students-form-ajax');

updateCoursesHasStudentsForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input fields
    let inputCourse = document.getElementById("course-courseStudent-update");
    let inputStudent = document.getElementById("student-courseStudent-update");
    let inputCompletedClassHours = document.getElementById("completedClassHoursInput-update");

    // Retrieve values
    let courseIDValue = inputCourse.value;
    let studentIDValue = inputStudent.value;
    let completedClassHoursValue = inputCompletedClassHours.value;

    // Validation
    if (!courseIDValue || !studentIDValue || isNaN(completedClassHoursValue)) {
        console.log("Course ID:", courseIDValue);
        console.log("Student ID:", studentIDValue);
        console.log("Completed Class Hours:", completedClassHoursValue);
        alert("All fields must be filled out with valid values.");
        return;
    }

    // Prepare data payload
    let data = {
        courseID: courseIDValue,
        studentID: studentIDValue,
        completedClassHours: completedClassHoursValue
    };
    console.log("Data to be sent:", data);

    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-courses-has-students-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Parse response and update the table
            updateRow(JSON.parse(xhttp.response), courseIDValue, studentIDValue);

            inputCourse.value = '';
            inputStudent.value = '';
            inputCompletedClassHours.value = '';

            //window.location.reload();
            
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    xhttp.send(JSON.stringify(data));
    window.location.reload();
});

function updateRow(data, courseIDValue, studentIDValue) {
    let parsedData = data;
    let table = document.getElementById("courses-has-students-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (
            table.rows[i].getAttribute("data-courseStundets-courseID") == courseIDValue &&
            table.rows[i].getAttribute("data-courseStudents-studentID") == studentIDValue
        ) {
            let updateRowIndex = table.rows[i];

            // Update the completedClassHours cell
            updateRowIndex.cells[5].innerText = parsedData[0].completedClassHours;
        }
    }
}

// Citation for the following CREATE Implementation:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

let addCoursesHasStudentsForm = document.getElementById('add-courses-has-students-form-ajax'); // Updated form ID

addCoursesHasStudentsForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input fields
    let inputCourse = document.getElementById("course-courseStudent-input");
    let inputStudent = document.getElementById("student-courseStudent-input");
    let inputCompletedClassHours = document.getElementById("completedClassHoursInput");

    window.location.reload();

    // Retrieve values
    let courseIDValue = inputCourse.value;
    let studentIDValue = inputStudent.value;
    let completedClassHoursValue = inputCompletedClassHours.value;

    // Validation
    if (!courseIDValue || !studentIDValue) {
        alert("Both Tutor and Course must be selected.");
        return;
    }

    // Get names for display
    let courseName = inputCourse.options[inputCourse.selectedIndex].text;
    let studentName = inputStudent.options[inputStudent.selectedIndex].text;
    

    // Data payload
    let data = {
        courseID: courseIDValue,
        studentID: studentIDValue,
        completedClassHours:completedClassHoursValue
    };

    console.log("Data to be sent:", data);

    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-courses-has-students-form-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Parse the response to get the new record ID
            let response = JSON.parse(xhttp.responseText);
            let newRecordID = response.insertId; // Assumes the backend sends the new record ID

            // Add the new row to the table
            addRowToTable(newRecordID, courseIDValue, courseName, studentIDValue, studentName, completedClassHoursValue);

            // Clear inputs
            inputCourse.value = '';
            inputStudent.value = '';
            inputCompletedClassHours = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    xhttp.send(JSON.stringify(data));
    window.location.reload();
});

function addRowToTable(recordID, courseID, courseName, studentID, studentName, completedClassHours) {
    let currentTable = document.getElementById("courses-has-students-table");

    // Create new row
    let row = document.createElement("TR");
    let coursesHasStudentsIDCell = document.createElement("TD");
    let courseIDCell = document.createElement("TD");
    let courseNameCell = document.createElement("TD");
    let studentIDCell = document.createElement("TD");
    let studentNameCell = document.createElement("TD");
    let completedClassHoursCell = document.createElement("TD");

    // Set cell values
    coursesHasStudentsIDCell.innerText = recordID; // Backend-generated ID
    courseIDCell.innerText = courseID;
    courseNameCell.innerText = courseName;
    studentIDCell.innerText = studentID;
    studentNameCell.innerText = studentName;
    completedClassHoursCell.innerText = completedClassHours;



    // Append cells to row
    row.appendChild(coursesHasStudentsIDCell);
    row.appendChild(courseIDCell);
    row.appendChild(courseNameCell);
    row.appendChild(studentIDCell);
    row.appendChild(studentNameCell);
    row.appendChild(completedClassHoursCell);

    // Append the new row to the table
    currentTable.appendChild(row);
}

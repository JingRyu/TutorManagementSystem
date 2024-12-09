// Citation for the following CREATE Implementation:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
let addTutorsHasCoursesForm = document.getElementById('add-tutors-has-courses-form-ajax'); // Updated form ID

addTutorsHasCoursesForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input fields
    let inputTutor = document.getElementById("tutor-tutorCourse-input");
    let inputCourse = document.getElementById("course-tutorCourse-input");

    window.location.reload();
    
    // Retrieve values
    let tutorIDValue = inputTutor.value;
    let courseIDValue = inputCourse.value;

    // Validation
    if (!tutorIDValue || !courseIDValue) {
        alert("Both Tutor and Course must be selected.");
        return;
    }

    // Get names for display
    let tutorName = inputTutor.options[inputTutor.selectedIndex].text;
    let courseName = inputCourse.options[inputCourse.selectedIndex].text;

    // Data payload
    let data = {
        tutorID: tutorIDValue,
        courseID: courseIDValue
    };

    console.log("Data to be sent:", data);

    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-tutors-has-courses-form-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Parse the response to get the new record ID
            let response = JSON.parse(xhttp.responseText);
            let newRecordID = response.insertId; 

            // Add the new row to the table
            addRowToTable(newRecordID, tutorIDValue, tutorName, courseIDValue, courseName);

            // Clear inputs
            inputTutor.value = '';
            inputCourse.value = '';
            window.location.reload();
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    xhttp.send(JSON.stringify(data));
    window.location.reload();
});

function addRowToTable(recordID, tutorID, tutorName, courseID, courseName) {
    let currentTable = document.getElementById("tutors-has-courses-table");

    // Create new row
    let row = document.createElement("TR");
    let tutorsHasCoursesIDCell = document.createElement("TD");
    let tutorIDCell = document.createElement("TD");
    let tutorNameCell = document.createElement("TD");
    let courseIDCell = document.createElement("TD");
    let courseNameCell = document.createElement("TD");

    // Set cell values
    tutorsHasCoursesIDCell.innerText = recordID; 
    tutorIDCell.innerText = tutorID;
    tutorNameCell.innerText = tutorName;
    courseIDCell.innerText = courseID;
    courseNameCell.innerText = courseName;


    // Append cells to row
    row.appendChild(tutorsHasCoursesIDCell);
    row.appendChild(tutorIDCell);
    row.appendChild(tutorNameCell);
    row.appendChild(courseIDCell);
    row.appendChild(courseNameCell);

    // Append the new row to the table
    currentTable.appendChild(row);
}

let addTutorsHasCoursesForm = document.getElementById('add-tutors-has-courses-form-ajax'); // Updated form ID

addTutorsHasCoursesForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input fields
    let inputTutor = document.getElementById("input-tutor-ajax");
    let inputCourse = document.getElementById("input-course-ajax");

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
            let newRecordID = response.insertId; // Assumes the backend sends the new record ID

            // Add the new row to the table
            addRowToTable(newRecordID, tutorIDValue, tutorName, courseIDValue, courseName);

            // Clear inputs
            inputTutor.value = '';
            inputCourse.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    xhttp.send(JSON.stringify(data));
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
    tutorsHasCoursesIDCell.innerText = recordID; // Backend-generated ID
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

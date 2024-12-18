// Citation for the following CREATE Implementation:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
// Get the objects we need to modify
let addTutorForm = document.getElementById('add-tutor-form-ajax');

// Modify the objects we need
addTutorForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("input-fname");
    let inputLastName = document.getElementById("input-lname");
    let inputPhoneNumber = document.getElementById("input-number");
    let inputExperience = document.getElementById("input-experience");
    let inputRevenueGenerated = document.getElementById("input-revenue");
    let inputRating = document.getElementById("input-rating");
    let inputGrade = document.getElementById("input-grade");

    // Get the values from the form fields
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let phoneNumberValue = inputPhoneNumber.value;
    let experienceValue = inputExperience.value;
    let revenueValue = inputRevenueGenerated.value;
    let ratingValue = inputRating.value;
    let gradeValue = inputGrade.value;

    // Put our data we want to send in a javascript object
    let data = {
        fname: firstNameValue,
        lname: lastNameValue,
        phoneNumber: phoneNumberValue,
        experience: experienceValue,
        revenue: revenueValue,
        rating: ratingValue,
        grade: gradeValue
    }
    
    console.log("Form data to send:", data);  // Check the data being sent 
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-tutor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputPhoneNumber.value = '';
            inputExperience.value = '';
            inputRevenueGenerated.value = '';
            inputRating.value = '';
            inputGrade.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    window.location.reload();

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("tutor-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let phoneNumberCell = document.createElement("TD");
    let experienceCell = document.createElement("TD");
    let revenueCell = document.createElement("TD");
    let ratingCell = document.createElement("TD");
    let gradeCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.tutorID;
    firstNameCell.innerText = newRow.firstName;
    lastNameCell.innerText = newRow.lastName;
    phoneNumberCell.innerText = newRow.phoneNum;
    experienceCell.innerText = newRow.tutorExperience;
    revenueCell.innerText = newRow.revenueGenerated;
    ratingCell.innerText = newRow.averageStudentSatisfaction;
    gradeCell.innerText = newRow.averageStudentGradeImprovement;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteTutor(newRow.tutorID);
    };


    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(phoneNumberCell);
    row.appendChild(experienceCell);
    row.appendChild(revenueCell);
    row.appendChild(ratingCell);
    row.appendChild(gradeCell);
    row.appendChild(deleteCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.tutorID);

    // Add the row to the table
    currentTable.appendChild(row);

    // Start of new Step 8 code for adding new data to the dropdown menu for updating people
    
    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("input-name-update");
    let option = document.createElement("option");
    option.text = newRow.fname + ' ' +  newRow.lname;
    option.value = newRow.id;
    selectMenu.add(option);
    // End of new step 8 code.
}

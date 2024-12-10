// Citation for the following UPDATE Implementation:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

let updateStudentForm = document.getElementById('update-student-form-ajax');

// Modify the objects we need
updateStudentForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFullName = document.getElementById("input-name-update");
    let inputNumber = document.getElementById("input-number-update");
    let inputTuition = document.getElementById("input-tuition-update");
    

    // Get the values from the form fields
    let fullNameValue = inputFullName.value;
    let numberValue = inputNumber.value;
    let tuitionValue = inputTuition.value;
    
    
    // so we must abort if being bassed NULL for homeworld


    // Put our data we want to send in a javascript object
    let data = {
        fullname: fullNameValue,
        number: numberValue,
        tuition: tuitionValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-student-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                try {
                    // Attempt to parse JSON
                    let response = JSON.parse(xhttp.response);
                    updateRow(response, tutorIDValue, studentIDValue);
                    console.log("Update successful");
                } catch (e) {
                    // Handle non-JSON response
                    console.log("Non-JSON response:", xhttp.response);
                    alert("Update was successful but no JSON data returned.");
                }
    
                // Clear input fields
                inputTutor.value = '';
                inputStudent.value = '';
                inputSatisfaction.value = '';
                inputGradeImprovement.value = '';
            } else {
                console.log("There was an error with the input. Status:", xhttp.status);
            }
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    window.location.reload();

})


function updateRow(data, studentID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("student-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == studentID) {

            // Get the location of the row where we found the matching student ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}
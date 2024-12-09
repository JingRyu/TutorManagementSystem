
// Get the objects we need to modify
let updateTutorForm = document.getElementById('update-tutor-form-ajax');

// Modify the objects we need
updateTutorForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFullName = document.getElementById("input-name-update");
    let inputNumber = document.getElementById("input-number-update");
    let inputExperience = document.getElementById("input-experience-update");
    let inputRevenue = document.getElementById("input-revenue-update");
    let inputSatisfaction = document.getElementById("input-satisfaction-update"); // carry as a decimal
    let inputGrade = document.getElementById("input-grade-update");

    // Get the values from the form fields
    let fullNameValue = inputFullName.value;
    let numberValue = inputNumber.value;
    let experienceValue = inputExperience.value;
    let revenueValue = inputRevenue.value;
    let satisfactionValue = parseFloat(inputSatisfaction.value);// carry as a decimal
    let gradeValue = parseFloat(inputGrade.value);
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld


    // Put our data we want to send in a javascript object
    let data = {
        fullname: fullNameValue,
        number: numberValue,
        experience: experienceValue,
        revenue: revenueValue,
        satisfaction: satisfactionValue,
        grade: gradeValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-tutor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, fullNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, tutorID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("tutor-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == tutorID) {

            // Get the location of the row where we found the matching tutor ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}

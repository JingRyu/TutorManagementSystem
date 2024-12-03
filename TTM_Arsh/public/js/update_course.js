// Get the objects we need to modify
let updateCourseForm = document.getElementById('update-course-form-ajax');

// Modify the objects we need
updateCourseForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCourse = document.getElementById("input-course-update");
    let inputCost = document.getElementById("input-cost-update");
    let inputHours = document.getElementById("input-hours-update");
    

    // Get the values from the form fields
    let courseValue = inputCourse.value;
    let costValue = inputCost.value;
    let hoursValue = inputHours.value;
    
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld


    // Put our data we want to send in a javascript object
    let data = {
        course: courseValue,
        cost: costValue,
        hours: hoursValue,
       
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-course-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, courseValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, courseID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("course-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == courseID) {

            // Get the location of the row where we found the matching course ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}

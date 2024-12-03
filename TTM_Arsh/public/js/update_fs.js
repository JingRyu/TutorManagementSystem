// Get the objects we need to modify
let updateFSForm = document.getElementById('update-fs-form-ajax');

// Modify the objects we need
updateFSForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("input-fs-id-update");
    let inputTutor = document.getElementById("input-fs-update");
    let inputQuarter = document.getElementById("input-quarter-update");
    let inputRate = document.getElementById("input-rate-update");
    let inputRevenue = document.getElementById("input-revenue-update");
    let inputCommission = document.getElementById("input-commission-update");
    let inputCost = document.getElementById("input-Cost-update");
    let inputRenewal = document.getElementById("input-renewal-update");

    // Get the values from the form fields
    let idValue = inputID.value;
    let tutorValue = inputTutor.value;
    let quarterValue = inputQuarter.value;
    let rateValue = inputRate.value;
    let revenueValue = inputRevenue.value;
    let commissionValue = inputCommission.value;
    let costValue = inputCost.value;
    let renewalValue = inputRenewal.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld


    // Put our data we want to send in a javascript object
    let data = {
        id: idValue,
       tutor: tutorValue,
       quarter: quarterValue,
       rate: rateValue,
       revenue: revenueValue,
       commission: commissionValue,
       cost: costValue,
       renewal: renewalValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-fs-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, idValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, financialSummaryID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("fs-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == financialSummaryID) {

            // Get the location of the row where we found the matching tutor ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}

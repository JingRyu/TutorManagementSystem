// Citation for the following CREATE Implementation:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

let addFSForm = document.getElementById('add-fs-form-ajax');

// Modify the objects we need
addFSForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTutor = document.getElementById("input-fullname");
    let inputQuarter = document.getElementById("input-quarter");
    let inputRate = document.getElementById("input-rate");
    let inputRevenue = document.getElementById("input-revenue");
    let inputCommission = document.getElementById("input-commission");
    let inputCost = document.getElementById("input-Cost");
    let inputRenewal = document.getElementById("input-renewal");

    // Get the values from the form fields
    let tutorValue = inputTutor.value;
    let quarterValue = inputQuarter.value;
    let rateValue = inputRate.value;
    let revenueValue = inputRevenue.value;
    let commissionValue = inputCommission.value;
    let costValue = inputCost.value;
    let renewalValue = inputRenewal.value;

    // Put our data we want to send in a javascript object
    let data = {
        tutor: tutorValue,
        quarter: quarterValue,
        rate: rateValue,
        revenue: revenueValue,
        commission: commissionValue,
        cost: costValue,
        renewal: renewalValue
    }
    
    console.log("Form data to send:", data);  // Check the data being sent 
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-fs-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputTutor.value = '';
            inputQuarter.value = '';
            inputRate.value = '';
            inputRevenue.value = '';
            inputCommission.value = '';
            inputCost.value = '';
            inputRenewal.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    setTimeout(() => {
        window.location.reload();
    }, 500);

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("fs-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let tutoridCell = document.createElement("TD");
    let quarterCell = document.createElement("TD");
    let rateCell = document.createElement("TD");
    let revenueCell = document.createElement("TD");
    let commissionCell = document.createElement("TD");
    let costCell = document.createElement("TD");
    let renewalCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.financialSummaryID;
    tutoridCell.innerText = newRow.tutorID;
    quarterCell.innerText = newRow.financialPeriod;
    rateCell.innerText = newRow.contractRate;
    revenueCell.innerText = newRow.revenueGenerated;
    commissionCell.innerText = newRow.commissionDue;
    costCell.innerText = newRow.courseCost;
    renewalCell.innerText = newRow.renewalRate;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteTutor(newRow.financialSummaryID);
    };


    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(tutoridCell);
    row.appendChild(quarterCell);
    row.appendChild(ratetCell);
    row.appendChild(revenueCell);
    row.appendChild(commissionCell);
    row.appendChild(costCell);
    row.appendChild(renewalCell);
    row.appendChild(deleteCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.financialSummaryID);

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

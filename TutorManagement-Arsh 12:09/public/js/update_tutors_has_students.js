// Get the form element
let updateForm = document.getElementById('update-tutors-has-students-form-ajax');

// Add event listener to the form
updateForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields to retrieve data
    let inputRelationshipID = document.getElementById("input-relationship-id");
    let inputSatisfaction = document.getElementById("studentSatisfactionInput");
    let inputGradeImprovement = document.getElementById("studentGradeImprovementInput");

    // Retrieve values from the form fields
    let relationshipIDValue = inputRelationshipID.value;
    let satisfactionValue = inputSatisfaction.value;
    let gradeImprovementValue = inputGradeImprovement.value;

    // Debug: Log input values
    console.log("Satisfaction value:", satisfactionValue);
    console.log("Grade improvement value:", gradeImprovementValue);

    // Validate input to ensure a relationship is selected
    if (!relationshipIDValue) {
        console.log("Tutor and Student must be selected.");
        return;
    }

    // Prepare data for the AJAX request
    let data = {
        tutorsHasStudentsID: relationshipIDValue,
        studentSatisfaction: satisfactionValue || null,
        studentGradeImprovement: gradeImprovementValue || null
    };

    // Debug: Log data being sent
    console.log("Sending request to /put-tutors-has-students-ajax with data:", data);

    // Set up AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-tutors-has-students-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Handle the response
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("Update successful");
            // Optionally update the DOM
            updateRow(xhttp.response, relationshipIDValue);
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    // Send the request
    xhttp.send(JSON.stringify(data));
});

// Function to update the row in the table
function updateRow(data, relationshipID) {
    let parsedData = JSON.parse(data);

    // Get the table
    let table = document.getElementById("tutors-has-students-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // Match the row with the correct relationship ID
        if (table.rows[i].getAttribute("data-relationship-id") == relationshipID) {
            // Update the columns for satisfaction and grade improvement
            let satisfactionCell = row.getElementsByTagName("td")[5];
            let gradeImprovementCell = row.getElementsByTagName("td")[6];

            satisfactionCell.innerHTML = parsedData.studentSatisfaction || "N/A";
            gradeImprovementCell.innerHTML = parsedData.studentGradeImprovement || "N/A";

            break;
        }
    }
}

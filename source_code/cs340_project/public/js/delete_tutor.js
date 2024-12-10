// Citation for the following DELETE Implementation:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteTutor(tutorID) {
    let link = '/delete-tutor-ajax/';
    let data = {
      id: tutorID
    };
    console.log("Sending data:", data);  // Log the tutorID to verify it's correct
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(tutorID);
      }
    });
  }
  

function deleteRow(tutorID){

    let table = document.getElementById("tutor-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == tutorID) {
            table.deleteRow(i);
            break;
       }
    }
}
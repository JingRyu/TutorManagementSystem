// Citation for the following DELETE Implementation:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteTutorsHasStudents(tutorsHasStudentsID) {
    let link = '/delete-tutors-has-students-ajax/';
    let data = {
      id: tutorsHasStudentsID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(tutorsHasStudentsID);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("Error:", jqXHR.responseText);
    }
    });
  }
  
  function deleteRow(tutorsHasStudentsID){
      let table = document.getElementById("tutors-has-students-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
               //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
         if (table.rows[i].getAttribute("data-value") == tutorsHasStudentsID) {
            table.deleteRow(i);
              break;
         }
      }
    }
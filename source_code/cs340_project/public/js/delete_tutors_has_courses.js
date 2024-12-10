// Citation for the following DELETE Implementation:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteTutorsHasCourses(tutorsHasCoursesID) {
    let link = '/delete-tutors-has-courses-ajax/';
    let data = {
      id: tutorsHasCoursesID
    };
    console.log("Sending data:", data); 
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(tutorsHasCoursesID);
      }
    });
  }
  
  function deleteRow(tutorsHasCoursesID){
      let table = document.getElementById("tutors-has-courses-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
               //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
         if (table.rows[i].getAttribute("data-value") == tutorsHasCoursesID) {
            table.deleteRow(i);
              break;
         }
      }
    }
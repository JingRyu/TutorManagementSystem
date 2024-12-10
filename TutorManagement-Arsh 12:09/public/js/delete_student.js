function deleteStudent(studentID) {
    let link = '/delete-student-ajax/';
    let data = {
      id: studentID
    };
    console.log("Sending data:", data);  // Log the studentID to verify it's correct
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(studentID);
      }
    });
  }
  

function deleteRow(studentID){

    let table = document.getElementById("student-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == studentID) {
            table.deleteRow(i);
            break;
       }
    }
}
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
         if (table.rows[i].getAttribute("data-value") == tutorsHasStudentsID) {
            table.deleteRow(i);
              break;
         }
      }
    }
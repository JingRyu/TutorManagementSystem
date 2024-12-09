function deleteFS(financialSummaryID) {
    let link = '/delete-fs-ajax/';
    let data = {
      id: financialSummaryID
    };
    console.log("Sending data:", data);  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(financialSummaryID);
      }
    });
  }
  

function deleteRow(financialSummaryID){

    let table = document.getElementById("fs-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == financialSummaryID) {
            table.deleteRow(i);
            break;
       }
    }
}
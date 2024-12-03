/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

PORT = 9400;

// Database
var db = require('./database/db-connector');

// Handlebars
var exphbs = require('express-handlebars');
const { query } = require('express');
app.engine('.hbs', exphbs.engine({
    extname: ".hbs"
}));
app.set('view engine', '.hbs');
const hbs = require('hbs');

// Static Files
app.use(express.static('public'));


/*
    ROUTES
*/

// GET for index
app.get('/', function(req, res)
{
    res.render('index');  
    })

//<!--------------------------------------------- Tutors.hbs ---------------------------------------------------->//
// GET
// app.js

app.get('/tutor', function(req, res)
    {  
        let query1 = "SELECT * FROM Tutors;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('Tutors', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

// POST ROUTES
app.post('/add-tutor-ajax', function(req, res) 
{ 
    console.log("Received data:", req.body);
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let phone = parseInt(data.phoneNumber);
    if (isNaN(phone))
    {
        phone = 'NULL'
    }

    let experience = parseInt(data.experience);
    if (isNaN(experience))
    {
        experience = 'NULL'
    }

    let revenue = parseInt(data.revenue);
    if (isNaN(revenue))
    {
        revenue = 'NULL'
    }

    let rating = parseInt(data.rating);
    if (isNaN(rating))
    {
        rating = 'NULL'
    }

    let grade= parseInt(data.grade);
    if (isNaN(grade))
    {
        grade = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Tutors (firstName, lastName, phoneNum, tutorExperience, revenueGenerated, averageStudentSatisfaction, averageStudentGradeImprovement) VALUES ('${data.fname}', '${data.lname}', ${phone}, ${experience},${revenue}, ${rating}, ${grade})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Tutors;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-tutor-ajax/', function(req,res,next){
    let data = req.body;

    console.log("Received data:", data);  // Log incoming data to verify

    let tutorID = parseInt(data.id);  // Convert `id` to a number

    let delete_Tutor = `DELETE FROM Tutors WHERE tutorID = ?`;
    let deleteTutor_Course= `DELETE FROM Tutors_has_Courses WHERE tutorID = ?`;
    let deleteTutor_Student= `DELETE FROM Tutors_has_Students WHERE tutorID = ?`;
  
  
          // Run the 1st query
          db.pool.query(delete_Tutor, [tutorID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else 
              {
                  // Run the second query
                  db.pool.query(deleteTutor_Course, [tutorID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                        db.pool.query(deleteTutor_Student, [tutorID], function(error, rows, fields) {
                            if (error) {
                                console.log(error);
                                res.sendStatus(400);
                            } else {
                            res.sendStatus(204);}
                      }

                  )}

                  })
              }
  })});

app.put('/put-tutor-ajax', function(req,res,next){
    let data = req.body;
  
    let number = parseInt(data.number);
    let tutor = parseInt(data.fullname);
    let experience = parseInt(data.experience);
    let revenue = parseInt(data.revenue)
  
    let queryUpdateNumber = `UPDATE Tutors SET phoneNum = ?, tutorExperience = ?, revenueGenerated = ? WHERE Tutors.tutorID = ?`;
    
  
          // Run the 1st query
          db.pool.query(queryUpdateNumber, [number, experience, revenue, tutor], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
  })});
/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

//------------------------------------------------------Courses-----------------------------------------------------

app.get('/course', function(req, res)
    {  
        let query1 = "SELECT * FROM Courses;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('Courses', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query


// app.js - ROUTES section

app.post('/add-course-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let name = data.name;

    if (name === "") {
        name = 'NULL';  // Set to NULL if the name is empty
    }

    // Capture NULL values
    let cost = parseInt(data.cost);
    if (isNaN(cost))
    {
        cost = 'NULL'
    }

    let hour = parseInt(data.hour);
    if (isNaN(hour))
    {
        hour = 'NULL'
    }
    
    // Create the query and run it on the database
    query1 = `INSERT INTO Courses (courseName, coursePrice, totalClassHours) VALUES ('${name}', ${cost}, ${hour})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Courses;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});


app.delete('/delete-course-ajax/', function(req,res,next){
    let data = req.body;

    let courseID = parseInt(data.id);

    console.log("Received data:", data);  // Log incoming data to verify

    let delete_Course = `DELETE FROM Courses WHERE courseID = ?`;
    let deleteStudent_Course= `DELETE FROM Courses_has_Students WHERE courseID = ?`;
    let deleteTutor_Course= `DELETE FROM Tutors_has_Courses WHERE courseID = ?`;
  
  
          // Run the 1st query
          db.pool.query(delete_Course, [courseID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else 
              {
                  // Run the second query
                  db.pool.query(deleteStudent_Course, [courseID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                        db.pool.query(deleteTutor_Course, [courseID], function(error, rows, fields) {
                            if (error) {
                                console.log(error);
                                res.sendStatus(400);
                            } else {
                            res.sendStatus(204);}
                      }

                  )}

                  })
              }
  })});

  app.put('/put-course-ajax', function(req,res,next){
    let data = req.body;
    
    let course = data.course;
    let cost = parseInt(data.cost);
    let hours = parseInt(data.hours);
  
    let queryUpdateNumber = `UPDATE Courses SET coursePrice = ?, totalClassHours = ? WHERE Courses.courseID = ?`;
    
  
          // Run the 1st query
          db.pool.query(queryUpdateNumber, [cost, hours, course], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
  })});

  //<!--------------------------------------------- Students.hbs ---------------------------------------------------->//
// GET
// app.js

app.get('/student', function(req, res)
{  
    let query1 = "SELECT * FROM Students;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('Students', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

// POST ROUTES
app.post('/add-student-ajax', function(req, res) 
{ 
console.log("Received data:", req.body);
// Capture the incoming data and parse it back to a JS object
let data = req.body;

// Capture NULL values
let phone = parseInt(data.phoneNumber);
if (isNaN(phone))
{
    phone = 'NULL'
}

let tuition = parseInt(data.tuition);
if (isNaN(tuition))
{
    tuition = 'NULL'
}

// Create the query and run it on the database
query1 = `INSERT INTO Students (firstName, lastName, phoneNum, tuitionPayment) VALUES ('${data.fname}', '${data.lname}', ${phone}, ${tuition})`;
db.pool.query(query1, function(error, rows, fields){

    // Check to see if there was an error
    if (error) {

        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error)
        res.sendStatus(400);
    }
    else
    {
        // If there was no error, perform a SELECT * on bsg_people
        query2 = `SELECT * FROM Students;`;
        db.pool.query(query2, function(error, rows, fields){

            // If there was an error on the second query, send a 400
            if (error) {
                
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }
            // If all went well, send the results of the query back.
            else
            {
                res.send(rows);
            }
        })
    }
})
});

app.delete('/delete-student-ajax/', function(req,res,next){
let data = req.body;

console.log("Received data:", data);  // Log incoming data to verify

let studentID = parseInt(data.id);  // Convert `id` to a number

let delete_Student = `DELETE FROM Students WHERE studentID = ?`;
let deleteStudent_Course= `DELETE FROM Courses_has_Students WHERE studentID = ?`;
let deleteTutor_Student= `DELETE FROM Tutors_has_Students WHERE studentID = ?`;


      // Run the 1st query
      db.pool.query(delete_Student, [studentID], function(error, rows, fields){
          if (error) {

          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
          }

          else 
          {
              // Run the second query
              db.pool.query(deleteStudent_Course, [studentID], function(error, rows, fields) {

                  if (error) {
                      console.log(error);
                      res.sendStatus(400);
                  } else {
                    db.pool.query(deleteTutor_Student, [studentID], function(error, rows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                        res.sendStatus(204);}
                  }

              )}

              })
          }
})});

app.put('/put-student-ajax', function(req,res,next){
let data = req.body;

let number = parseInt(data.number);
let student = parseInt(data.fullname);
let tuition = parseInt(data.tuition);


let queryUpdateNumber = `UPDATE Students SET phoneNum = ?, tuitionPayment = ? WHERE Students.studentID = ?`;


      // Run the 1st query
      db.pool.query(queryUpdateNumber, [number, tuition, student], function(error, rows, fields){
          if (error) {

          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
          }

})});

//<!--------------------------------------------- FS.hbs ---------------------------------------------------->//
// GET
// app.js

app.get('/FS', function(req, res) {
    let query1 = "SELECT * FROM FinancialSummaries fs JOIN Tutors t ON fs.tutorID= t.tutorID";
    let query2 = 'SELECT tutorID, firstName, lastName FROM Tutors';               // Define our query

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log("Error with FinancialSummaries query: ", error);
            return res.status(500).send("Error with FinancialSummaries query");
        }

        db.pool.query(query2, function(error, tutorRows, fields) {
            if (error) {
                console.log("Error with Tutors query: ", error);
                return res.status(500).send("Error with Tutors query");
            }

            res.render('FS.hbs', {
                financialSummaries: rows,  // Financial summary data
                tutors: tutorRows 
            });
        });
    });
});


// POST ROUTES
app.post('/add-fs-ajax', function(req, res) 
{ 
    console.log("Received data:", req.body);
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO FinancialSummaries (tutorID, financialPeriod, contractRate, revenueGenerated, commissionDue, courseCost, renewalRate) VALUES (${data.tutor}, '${data.quarter}', ${data.rate}, ${data.revenue},${data.commission}, ${data.cost}, ${data.renewal})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM FinancialSummaries;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-fs-ajax/', function(req,res,next){
    let data = req.body;

    console.log("Received data:", data);  // Log incoming data to verify

    let fsID = parseInt(data.id);  // Convert `id` to a number

    let delete_FS = `DELETE FROM FinancialSummaries WHERE financialSummaryID = ?`;

          // Run the 1st query
          db.pool.query(delete_FS, [fsID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              })
  });

app.put('/put-fs-ajax', function(req,res,next){
    let data = req.body;
    
    let id = parseInt(data.id);
    let tutor = data.tutor;
    let quarter= data.quarter;
    let rate = parseInt(data.rate);
    let revenue = parseInt(data.revenue);
    let commission = parseInt(data.commission);
    let cost = parseInt(data.cost);
    let renewal = parseInt(data.renewal);
  
    let queryUpdateNumber = `UPDATE FinancialSummaries SET tutorID = ?, financialPeriod = ?, contractRate = ?, revenueGenerated=?, commissionDue = ?, courseCost = ?, renewalRate = ? WHERE FinancialSummaries.financialSummaryID = ?`;
    
  
          // Run the 1st query
          db.pool.query(queryUpdateNumber, [tutor, quarter, rate, revenue, commission, cost, renewal, id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
  })});
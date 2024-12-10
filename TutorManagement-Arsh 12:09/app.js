// App.js

/*
    SETUP
*/
// Citation for the following Set Up:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js

var express = require('express');   // We are using the express library for the web server

var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.static('public'));
app.use(express.json()); // Parse JSON body
PORT        = 43635;                 // Set a port number at the top so it's easy to change in the future

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/
app.get('/', function(req, res)
    {
        res.render('index.hbs');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });     
   
    
/*
    LISTENER
*/

//<!--------------------------------------------- Tutors.hbs Start---------------------------------------------------->//
// GET
// app.js

// Citation for the following GET:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
// GET ROUTES
app.get('/tutor', function(req, res)
    {  
        let query1 = "SELECT * FROM Tutors;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('Tutors', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

// Citation for the following POST:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
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

// Citation for the following DELETE:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
// DELETE ROUTES
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

// Citation for the following PUT:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
// PUT ROUTES
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
  
//<!--------------------------------------------- Tutors.hbs End ---------------------------------------------------->//

//------------------------------------------------------Courses.hbs Start-----------------------------------------------------
// Citation for the following GET:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
// GET ROUTES
app.get('/course', function(req, res)
    {  
        let query1 = "SELECT * FROM Courses;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('Courses', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query


// app.js - ROUTES section
// Citation for the following POST:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
// POST ROUTES
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

// Citation for the following DELETE:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
// DELETE ROUTES
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

  // Citation for the following PUT:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
// PUT ROUTES
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
//------------------------------------------------------Courses.hbs End-----------------------------------------------------
  //<!--------------------------------------------- Students.hbs Start---------------------------------------------------->//
// GET
// app.js
// Citation for the following GET:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
// GET ROUTES
app.get('/student', function(req, res)
{  
    let query1 = "SELECT * FROM Students;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('Students', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

// Citation for the following POST:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
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

// Citation for the following DELETE:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
// DELETE ROUTES
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

// Citation for the following PUT:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
// PUT ROUTES
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
  //<!--------------------------------------------- Students.hbs End---------------------------------------------------->//

//<!--------------------------------------------- FS.hbs Start ---------------------------------------------------->//
// GET
// app.js
// Citation for the following GET:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
// GET ROUTES
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


// Citation for the following POST:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
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

// Citation for the following DELETE:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
// DELETE ROUTES
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

  // Citation for the following PUT:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
// PUT ROUTES
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
//<!--------------------------------------------- FS.hbs End ---------------------------------------------------->//
//<!--------------------------------------------- Tutor-Course Start ---------------------------------------------------->//
// Citation for the following GET:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
// GET ROUTES
app.get('/tutor-course', function(req, res) 
{
    let query1;
    let queryParams = [];

    if (req.query.lastName === undefined) {
        query1 = `
        SELECT 
            Tutors_has_Courses.tutorsHasCoursesID AS tutorsHasCoursesID,
            Tutors.tutorID AS tutorID,
            CONCAT(Tutors.firstName, ' ', Tutors.lastName) AS tutorName,
            Courses.courseID AS courseID,
            Courses.courseName AS courseName
        FROM Tutors_has_Courses
        INNER JOIN Courses ON Tutors_has_Courses.courseID = Courses.courseID
        INNER JOIN Tutors ON Tutors_has_Courses.tutorID = Tutors.tutorID
        ORDER BY Tutors_has_Courses.tutorsHasCoursesID ASC;
        `;
    } else {
        let lastName = req.query.lastName;
        query1 = `
        SELECT 
            Tutors_has_Courses.tutorsHasCoursesID AS tutorsHasCoursesID,
            Tutors.tutorID AS tutorID,
            CONCAT(Tutors.firstName, ' ', Tutors.lastName) AS tutorName,
            Courses.courseID AS courseID,
            Courses.courseName AS courseName
        FROM Tutors_has_Courses
        INNER JOIN Courses ON Tutors_has_Courses.courseID = Courses.courseID
        INNER JOIN Tutors ON Tutors_has_Courses.tutorID = Tutors.tutorID
        WHERE Tutors.lastName LIKE ?
        ORDER BY Tutors_has_Courses.tutorsHasCoursesID ASC;
        `;
        queryParams.push(`${lastName}%`);
    }

    // list of tutors for the dropdown
    let tutor_query = `
        SELECT 
            Tutors.tutorID AS tutorID,
            CONCAT(Tutors.firstName, ' ', Tutors.lastName) AS tutorName
        FROM Tutors
        ORDER BY Tutors.tutorID ASC;
    `;

    let course_query = `
        SELECT 
            Courses.courseID AS courseID,
            Courses.courseName AS courseName
        FROM Courses
        ORDER BY Courses.courseID ASC;
    `;

    // Query 1
    db.pool.query(query1, queryParams, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        let data = rows; // Save table data

        //Tutor Query
        db.pool.query(tutor_query, function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            let tutors = rows; // Save tutors data

            //Course Query
            db.pool.query(course_query, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                }
                let courses = rows; // Save courses data

                // Render
                res.render('Tutor_has_Courses.hbs', { data: data, tutors: tutors, courses: courses });
            });
        });
    });
});


// Citation for the following POST:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
// POST ROUTES
app.post('/add-tutors-has-courses-form-ajax', function(req, res) 
{
    console.log("Received data:", req.body); // Log incoming data
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    query1 = `INSERT INTO Tutors_has_Courses (tutorsHasCoursesID, tutorID, courseID) VALUES ('${data.tutorsHasCoursesID}', '${data.tutorID}', ${data.courseID})`;
    db.pool.query(query1, function(error, rows, fields){

        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Tutors_has_Courses;`;
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

// Citation for the following DELETE:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
// DELETE ROUTES
app.delete('/delete-tutors-has-courses-ajax/', function(req, res, next) {
    let data = req.body;
    let tutorsHasCoursesID = parseInt(data.id);
    let deleteTutorsHasCoursesQuery = `DELETE FROM Tutors_has_Courses WHERE tutorsHasCoursesID = ?;`;

    db.pool.query(deleteTutorsHasCoursesQuery, [tutorsHasCoursesID], function(error, rows, fields) {
        if (error) {
            console.log("Error executing query:", error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

//<!--------------------------------------------- Tutor-Course End ---------------------------------------------------->//

//<!--------------------------------------------- Tutor-Student Start ---------------------------------------------------->//
// Citation for the following GET:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
// GET ROUTES
app.get('/tutor-student', function(req, res) 
{
    //  Query 1
    let query1;
    let queryParams = [];

    if (req.query.lastName === undefined) {
        query1 = `
        SELECT 
            Tutors_has_Students.tutorsHasStudentsID AS tutorsHasStudentsID,
            Tutors.tutorID AS tutorID,
            CONCAT(Tutors.firstName, ' ', Tutors.lastName) AS tutorName,
            Students.studentID AS studentID,
            CONCAT(Students.firstName, ' ', Students.lastName) AS studentName,
            Tutors_has_Students.studentSatisfaction AS studentSatisfaction,
            Tutors_has_Students.studentGradeImprovement AS studentGradeImprovement
        FROM Tutors_has_Students
        INNER JOIN Students ON Tutors_has_Students.studentID = Students.studentID
        INNER JOIN Tutors ON Tutors_has_Students.tutorID = Tutors.tutorID
        ORDER BY Tutors_has_Students.tutorsHasStudentsID ASC;
        `;
    } else {
        let lastName = req.query.lastName;
        query1 = `
        SELECT 
            Tutors_has_Students.tutorsHasStudentsID AS tutorsHasStudentsID,
            Tutors.tutorID AS tutorID,
            CONCAT(Tutors.firstName, ' ', Tutors.lastName) AS tutorName,
            Students.studentID AS studentID,
            CONCAT(Students.firstName, ' ', Students.lastName) AS studentName,
            Tutors_has_Students.studentSatisfaction AS studentSatisfaction,
            Tutors_has_Students.studentGradeImprovement AS studentGradeImprovement
        FROM Tutors_has_Students
        INNER JOIN Students ON Tutors_has_Students.studentID = Students.studentID
        INNER JOIN Tutors ON Tutors_has_Students.tutorID = Tutors.tutorID
        WHERE Tutors.lastName LIKE ?
        ORDER BY Tutors_has_Students.tutorsHasStudentsID ASC;
        `;
        queryParams.push(`${lastName}%`);
    }

    // list of tutors for the dropdown
    let tutor_query = `
        SELECT 
            Tutors.tutorID AS tutorID,
            CONCAT(Tutors.firstName, ' ', Tutors.lastName) AS tutorName
        FROM Tutors
        ORDER BY Tutors.tutorID ASC;
    `;

    let student_query = `
        SELECT 
            Students.studentID AS studentID,
            CONCAT(Students.firstName, ' ', Students.lastName) AS studentName
        FROM Students
        ORDER BY Students.studentID ASC;
    `;

    // Query 1
    db.pool.query(query1, queryParams, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        let data = rows; // Save table data

        //  Tutor Query
        db.pool.query(tutor_query, function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            let tutors = rows; // Save tutors data

            // Student Query
            db.pool.query(student_query, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                }
                let students = rows; // Save students data

                // Render 
                res.render('Tutor_has_Students.hbs', { data: data, tutors: tutors, students: students });
            });
        });
    });
});

/*
    LISTENER
*/

// Citation for the following POST:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
// POST ROUTES
app.post('/add-tutors-has-students-form-ajax', function(req, res) 
{
    console.log("Received data:", req.body); // Log incoming data
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Tutors_has_Students (tutorsHasStudentsID, tutorID, studentID, studentSatisfaction, studentGradeImprovement) VALUES ('${data.tutorsHasStudentsID}', '${data.tutorID}', ${data.studentID}, ${data.studentSatisfaction}, ${data.studentGradeImprovement})`;
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
            query2 = `SELECT * FROM Tutors_has_Students;`;
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

// Citation for the following DELETE:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
// DELETE ROUTES
app.delete('/delete-tutors-has-students-ajax/', function(req, res, next) {
    let data = req.body;
    let tutorsHasStudentsID = parseInt(data.id);
    let deleteTutorsHasStudentsQuery = `DELETE FROM Tutors_has_Students WHERE tutorsHasStudentsID = ?;`;

    db.pool.query(deleteTutorsHasStudentsQuery, [tutorsHasStudentsID], function(error, rows, fields) {
        if (error) {
            console.log("Error executing query:", error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

// Citation for the following PUT:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
// PUT ROUTES
app.put('/put-tutors-has-students-ajax', function (req, res, next) {
    let data = req.body;

    let tutorID = parseInt(data.tutorID);
    let studentID = parseInt(data.studentID);
    let studentSatisfaction = parseFloat(data.studentSatisfaction);
    let studentGradeImprovement = parseFloat(data.studentGradeImprovement);

    if (isNaN(tutorID) || isNaN(studentID) || isNaN(studentSatisfaction) || isNaN(studentGradeImprovement)) {
        console.log("Invalid input data:", data);
        return res.sendStatus(400);
    }

    let queryUpdate = `
        UPDATE Tutors_has_Students 
        SET studentSatisfaction = ?, studentGradeImprovement = ?
        WHERE tutorID = ? AND studentID = ?
    `;

    // Execute the update query
    db.pool.query(queryUpdate, [studentSatisfaction, studentGradeImprovement, tutorID, studentID], function (error, rows, fields) {
        if (error) {
            console.log("Error during update:", error);
            res.sendStatus(400);
        } else {
            console.log("Update successful for tutorID:", tutorID, "studentID:", studentID);
            res.sendStatus(200); 
        }
    });
});


//<!--------------------------------------------- Tutor-Student End ---------------------------------------------------->//

//<!--------------------------------------------- Course-Student Start ---------------------------------------------------->//
// Citation for the following GET:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
// GET ROUTES
app.get('/course-student', function(req, res) {
    let query1;
    let queryParams = [];

    //  
    if (req.query.lastName === undefined) {
        query1 = `
        SELECT 
            Courses_has_Students.coursesHasStudentsID AS coursesHasStudentsID,
            Courses_has_Students.courseID AS courseID,
            Courses.courseName AS courseName,
            Courses_has_Students.studentID AS studentID,
            CONCAT(Students.firstName, ' ', Students.lastName) AS studentName,
            Courses_has_Students.completedClassHours AS completedClassHours
        FROM Courses_has_Students
        INNER JOIN Courses ON Courses_has_Students.courseID = Courses.courseID
        INNER JOIN Students ON Courses_has_Students.studentID = Students.studentID
        ORDER BY Courses_has_Students.coursesHasStudentsID ASC;
        `;
    } else {
        let lastName = req.query.lastName;
        query1 = `
        SELECT 
            Courses_has_Students.coursesHasStudentsID AS coursesHasStudentsID,
            Courses_has_Students.courseID AS courseID,
            Courses.courseName AS courseName,
            Courses_has_Students.studentID AS studentID,
            CONCAT(Students.firstName, ' ', Students.lastName) AS studentName,
            Courses_has_Students.completedClassHours AS completedClassHours
        FROM Courses_has_Students
        INNER JOIN Courses ON Courses_has_Students.courseID = Courses.courseID
        INNER JOIN Students ON Courses_has_Students.studentID = Students.studentID
        WHERE Students.lastName LIKE ?
        ORDER BY Courses_has_Students.coursesHasStudentsID ASC;
        `;
        queryParams.push(`${lastName}%`);
    }

    //  fetch courses for dropdown
    let course_query = `
        SELECT 
            Courses.courseID AS courseID,
            Courses.courseName AS courseName
        FROM Courses
        ORDER BY Courses.courseID ASC;
    `;

    //  fetch students for dropdown
    let student_query = `
        SELECT 
            Students.studentID AS studentID,
            CONCAT(Students.firstName, ' ', Students.lastName) AS studentName
        FROM Students
        ORDER BY Students.studentID ASC;
    `;
    //query 1
    db.pool.query(query1, queryParams, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        let data = rows; // Save main table data

        //  course query
        db.pool.query(course_query, function(error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            let courses = rows; // Save courses data

            //  student query
            db.pool.query(student_query, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                }
                let students = rows; // Save students data

                // Render 
                res.render('Course_has_Students.hbs', { data: data, courses: courses, students: students });
            });
        });
    });
});


// Citation for the following POST:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
// POST ROUTES
app.post('/add-courses-has-students-form-ajax', function(req, res) 
{
    console.log("Received data:", req.body); // Log incoming data
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Courses_has_Students (coursesHasStudentsID, courseID, studentID, completedClassHours) VALUES ('${data.coursesHasStudentsID}', '${data.courseID}', ${data.studentID}, ${data.completedClassHours})`;
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
            query2 = `SELECT * FROM Courses_has_Students;`;
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

// Citation for the following DELETE:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
// DELETE ROUTES
app.delete('/delete-courses-has-students-ajax/', function(req, res, next) {
    let data = req.body;
    let coursesHasStudentsID = parseInt(data.id);
    let deleteCoursesHasStudentsQuery = `DELETE FROM Courses_has_Students WHERE coursesHasStudentsID = ?;`;

    db.pool.query(deleteCoursesHasStudentsQuery, [coursesHasStudentsID], function(error, rows, fields) {
        if (error) {
            console.log("Error executing query:", error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

// Citation for the following PUT:
// Date: 12/10/2024
// Adapted from:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
// PUT ROUTES
app.put('/put-courses-has-students-ajax', function (req, res, next) {
    let data = req.body;

    let courseID = parseInt(data.courseID);
    let studentID = parseInt(data.studentID);
    let completedClassHours = parseFloat(data.completedClassHours);

    if (isNaN(courseID) || isNaN(studentID) || isNaN(completedClassHours)) {
        console.log("Invalid input data:", data);
        return res.sendStatus(400); 
    }

    let queryUpdate = `
        UPDATE Courses_has_Students 
        SET completedClassHours = ?
        WHERE courseID = ? AND studentID = ?
    `;

    db.pool.query(queryUpdate, [completedClassHours, courseID, studentID], function (error, rows, fields) {
        if (error) {
            console.log("Error during update:", error);
            return res.sendStatus(400);
        } else {
            console.log(`Update successful for courseID: ${courseID}, studentID: ${studentID}`);
            
            let selectUpdatedRow = `
                SELECT * 
                FROM Courses_has_Students 
                WHERE courseID = ? AND studentID = ?
            `;

            db.pool.query(selectUpdatedRow, [courseID, studentID], function (error, rows, fields) {
                if (error) {
                    console.log("Error during select:", error);
                    return res.sendStatus(400);
                } else {
                    res.json(rows);
                }
            });
        }
    });
});


//<!--------------------------------------------- Course-Student End ---------------------------------------------------->//


app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
//  All code is based on the CS 340 starter code--no exceptions
// App.js
/*
    SETUP
*/

var express = require('express');   // express library for the web server

var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.static('public'));
app.use(express.json()); 
PORT        = 43000;                 // Set a port number at the top so it's easy to change in the future

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
   

//<!--------------------------------------------- Tutors.hbs Start---------------------------------------------------->//
// For entity Tutors
// Citation for the entity Adapted from the CS 340 starter code, changes made as appropriate for our project 
// URL : https://github.com/osu-cs340-ecampus/nodejs-starter-app 

// Route allows READ ability for Tutor entity

app.get('/tutor', function(req, res)
    {  
        let query1 = "SELECT * FROM Tutors;";                       // Define our query

        db.pool.query(query1, function(error, rows, fields){        // Execute the query

            res.render('Tutors', {data: rows});                  
        })                                                      
    });                                                         

// Route allows CREATE ability
app.post('/add-tutor-ajax', function(req, res) 
{ 
    console.log("Received data:", req.body); // for trouble-shooting purposes; prints incoming data
   
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

    let rating = parseFloat(data.rating);
    if (isNaN(rating))
    {
        rating = 'NULL'
    }

    let grade= parseFloat(data.grade);
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
            // If there was no error, perform a SELECT * on Tutors
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

// Route allows DELETE ability
app.delete('/delete-tutor-ajax/', function(req,res,next){
    let data = req.body;

    console.log("Received data:", data);  

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

//Route handles Update functions 
app.put('/put-tutor-ajax', function(req,res,next){
    let data = req.body;
  
    let number = parseInt(data.number);
    let tutor = parseInt(data.fullname);
    let experience = parseInt(data.experience);
    let revenue = parseInt(data.revenue);
    let satisfaction = parseFloat(data.satisfaction);
    let grade = parseFloat(data.grade);
    console.log("data:" , data);
    let queryUpdateNumber = `UPDATE Tutors SET phoneNum = ?, tutorExperience = ?, revenueGenerated = ?, averageStudentSatisfaction = ? , averageStudentGradeImprovement = ? WHERE Tutors.tutorID = ?`;
    
  
          // Run the 1st query
          db.pool.query(queryUpdateNumber, [number, experience, revenue, satisfaction, grade, tutor], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
  })});
  
//<!--------------------------------------------- Tutors.hbs End ---------------------------------------------------->//

//------------------------------------------------------Courses.hbs Start-----------------------------------------------------//

// For entity Courses
// Citation for the entity Adapted from the CS 340 starter code, changes made as appropriate for our project 
// URL : https://github.com/osu-cs340-ecampus/nodejs-starter-app 

//  READ ability for Courses
app.get('/course', function(req, res)
    {  
        let query1 = "SELECT * FROM Courses;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('Courses', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query


//  CREATE ability for Courses

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
            // If there was no error, perform a SELECT * on Courses
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

//  DELETE ability for Courses

app.delete('/delete-course-ajax/', function(req,res,next){
    let data = req.body;

    let courseID = parseInt(data.id);

    console.log("Received data:", data);  

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

  //  UPDATE ability for Courses
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
// For entity Students
// Citation for the entity Adapted from the CS 340 starter code, changes made as appropriate for our project 
// URL : https://github.com/osu-cs340-ecampus/nodejs-starter-app 

//  READ ability for Students
app.get('/student', function(req, res)
{  
    let query1 = "SELECT * FROM Students;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('Students', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

/// CREATE ability for Courses
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

//  DELETE ability for Courses
app.delete('/delete-student-ajax/', function(req,res,next){
let data = req.body;

console.log("Received data:", data);  

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

//  UPDATE ability for Courses
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
// For entity Financial  Summaries
// Citation for the entity Adapted from the CS 340 starter code, changes made as appropriate for our project 
// URL : https://github.com/osu-cs340-ecampus/nodejs-starter-app 

//  READ ability for Financial Summaries

app.get('/FS', function(req, res) {
    let query1 = "SELECT * FROM FinancialSummaries fs JOIN Tutors t ON fs.tutorID= t.tutorID";
    let query2 = 'SELECT tutorID, firstName, lastName FROM Tutors';               

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
                tutors: tutorRows          // data from Tutors table 
            });
        });
    });
});


// CREATE ability for Financial Summaries
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
            // If there was no error, perform a SELECT * on FS
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

// DELETE ability for Financial Summaries
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

// UPDATE ability for Financial Summaries
app.put('/put-fs-ajax', function(req,res,next){
    let data = req.body;
    
    let id = parseInt(data.id);
    let tutor = data.tutor;
    let quarter= data.quarter;
    let rate = parseInt(data.rate);
    let revenue = parseInt(data.revenue);
    let commission = parseInt(data.commission);
    let cost = parseInt(data.cost);
    let renewal = parseFloat(data.renewal);
  
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

    // Query 2: Fetch the list of tutors for the dropdown
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

    // Execute Query 1
    db.pool.query(query1, queryParams, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        let data = rows; // Save table data

        // Execute Tutor Query
        db.pool.query(tutor_query, function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            let tutors = rows; // Save tutors data

            // Execute Course Query
            db.pool.query(course_query, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                }
                let courses = rows; // Save courses data

                // Render the page with all data
                res.render('Tutor_has_Courses', { data: data, tutors: tutors, courses: courses });
            });
        });
    });
});

app.post('/add-tutors-has-courses-form-ajax', function(req, res) 
{
    console.log("Received data:", req.body); // Log incoming data
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Tutors_has_Courses (tutorsHasCoursesID, tutorID, courseID) VALUES ('${data.tutorsHasCoursesID}', '${data.tutorID}', ${data.courseID})`;
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

// Delete a Tutors-Has-Courses relationship
app.delete('/delete-tutors-has-courses-ajax/', function(req, res) {
    let data = req.body;

    console.log("Received DELETE request for ID:", data.id);

    let tutorsHasCoursesID = parseInt(data.id);

    if (isNaN(tutorsHasCoursesID)) {
        console.log("Invalid ID received");
        res.sendStatus(400);
        return;
    }

    let deleteTutorsHasCoursesQuery = `DELETE FROM Tutors_has_Courses WHERE tutorsHasCoursesID = ?`;

    db.pool.query(deleteTutorsHasCoursesQuery, [tutorsHasCoursesID], function(error, rows, fields) {
        if (error) {
            console.log("Error executing query:", error);
            res.sendStatus(400);
        } else {
            console.log("Successfully deleted record with ID:", tutorsHasCoursesID);
            res.sendStatus(204);
        }
    });
});



//<!--------------------------------------------- Tutor-Course End ---------------------------------------------------->//

//<!--------------------------------------------- Tutor-Student Start ---------------------------------------------------->//
app.get('/tutor-student', function(req, res) 
{
    // Define Query 1
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

    // Query 2: Fetch the list of tutors for the dropdown
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

    // Execute Query 1
    db.pool.query(query1, queryParams, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        let data = rows; // Save table data

        // Execute Tutor Query
        db.pool.query(tutor_query, function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            let tutors = rows; // Save tutors data

            // Execute Student Query
            db.pool.query(student_query, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                }
                let students = rows; // Save students data

                // Render the index page with all data
                res.render('Tutor_has_Students', { data: data, tutors: tutors, students: students });
            });
        });
    });
});

/*
    LISTENER
*/

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

app.put('/put-tutors-has-students-ajax', function (req, res, next) {
    let data = req.body;

    console.log("Data received:", data); // Debug: Log incoming data

    let query = `
        UPDATE Tutors_has_Students 
        SET studentSatisfaction = ?, studentGradeImprovement = ? 
        WHERE tutorsHasStudentsID = ?;
    `;

    db.pool.query(query, [data.studentSatisfaction, data.studentGradeImprovement, data.tutorsHasStudentsID], function (error, rows, fields) {
        if (error) {
            console.log("Database Error:", error); // Debug: Log database error
            res.sendStatus(400);
        } else {
            res.status(200).json({
                studentSatisfaction: data.studentSatisfaction,
                studentGradeImprovement: data.studentGradeImprovement
            });
        }
    });
});
//<!--------------------------------------------- Tutor-Student End ---------------------------------------------------->//


app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
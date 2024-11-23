/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

PORT = 8400;

// Database
var db = require('./database/db-connector');

// Handlebars
var exphbs = require('express-handlebars');
const { query } = require('express');
app.engine('.hbs', exphbs.engine({
    extname: ".hbs"
}));
app.set('view engine', '.hbs');

// Static Files
app.use(express.static('public'));


/*
    ROUTES
*/

// GET for index
app.get('/', function(req, res)
{
    res.render('index.hbs');  
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
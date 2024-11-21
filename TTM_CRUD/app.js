/*
    SETUP
*/

// Express
var express = require('express');
var app = express();

// enabling express to handle JSON data, as well as form data
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT = 9964;

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/
app.get('/', function(req, res)
{
    let query1 = "SELECT * FROM Tutors;";
    db.pool.query(query1, function(error, rows, fields){
        res.render('index', {data: rows});
    })
});

// app.js - ROUTES section

app.post('/add-tutor', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let phoneNum = parseInt(data.phoneNum);
    if (isNaN(phoneNum))
    {
        phoneNum = 'NULL'
    }

    let revenueGenerated = parseInt(data.revenueGenerated);
    if (isNaN(revenueGenerated))
    {
        revenueGenerated = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Tutors (firstName, lastName, phoneNum, tutorExperience, revenueGenerated , averageStudentSatisfaction, averageStudentGradeImprovement) VALUES ('${data.firstName}', '${data.lastName}',${phoneNum}, ${data.tutorExperience},${revenueGenerated}, ${data.averageStudentSatisfaction}, ${data.averageStudentGradeImprovement})`;
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

/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
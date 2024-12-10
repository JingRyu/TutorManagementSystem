/* 
    CS340 PROJECT GROUP 46
        Tutor Management System
    TEAM MEMBERS
        Jing Liu and Kaur Arshdeep

    These are the queries that Tutor Management System users 
    interact with data.

    LAST UPDATED: 11/15/2024
*/

--- * Tutors * ---
-- Select all tutor records.
SELECT tutorID, firstName, lastName, phoneNum, tutorExperience, revenueGenerated, averageStudentSatisfaction, averageStudentGradeImprovement 
FROM Tutors;

-- Insert a new tutor.
INSERT INTO Tutors (firstName, lastName, phoneNum, tutorExperience, revenueGenerated, averageStudentSatisfaction, averageStudentGradeImprovement) 
VALUES (
    :firstNameInput, 
    :lastNameInput, 
    :phoneNumInput, 
    :tutorExperienceInput, 
    :revenueGeneratedInput, 
    :averageStudentSatisfactionInput, 
    :averageStudentGradeImprovementInput
);

-- Update a tutor's with ID
UPDATE Tutors 
SET firstName = :firstNameInput, 
    lastName = :lastNameInput, 
    phoneNum = :phoneNumInput, 
    tutorExperience = :tutorExperienceInput, 
    revenueGenerated = :revenueGeneratedInput, 
    averageStudentSatisfaction = :averageStudentSatisfactionInput, 
    averageStudentGradeImprovement = :averageStudentGradeImprovementInput 
WHERE tutorID = :tutorID;

-- Delete a tutor with ID
DELETE FROM Tutors 
WHERE tutorID = :tutorID;

--- * END Tutors QUERIES * ---


--- *Students* ---
-- Select all student records.
SELECT studentID, firstName, lastName, phoneNum, tuitionPayment 
FROM Students;

-- Insert a new student.
INSERT INTO Students (firstName, lastName, phoneNum, tuitionPayment) 
VALUES (
    :firstNameInput, 
    :lastNameInput, 
    :phoneNumInput, 
    :tuitionPaymentInput
);

-- Update a student with ID
UPDATE Students 
SET firstName = :firstNameInput, 
    lastName = :lastNameInput, 
    phoneNum = :phoneNumInput, 
    tuitionPayment = :tuitionPaymentInput 
WHERE studentID = :studentID;

-- Delete a student with ID
DELETE FROM Students 
WHERE studentID = :studentID;
--- * END Students QUERIES * ---


--- *Courses* ---
-- Select all course records.
SELECT courseID, courseName, coursePrice, totalClassHours 
FROM Courses;

-- Get a specific course information for selling purpose with courseID.
SELECT courseID, courseName, coursePrice, totalClassHours 
FROM Courses 
WHERE courseID = :courseID;

-- Insert a new course.
INSERT INTO Courses (courseName, coursePrice, totalClassHours) 
VALUES (
    :courseNameInput, 
    :coursePriceInput, 
    :totalClassHoursInput
);

-- Update a course with courseID.
UPDATE Courses 
SET courseName = :courseNameInput, 
    coursePrice = :coursePriceInput, 
    totalClassHours = :totalClassHoursInput 
WHERE courseID = :courseID;

-- Delete a course with course ID
DELETE FROM Courses 
WHERE courseID = :courseID;
--- * END Courses QUERIES * ---


--- *FinancialSummaries* ---
-- Get all financial summaries.
SELECT financialSummaryID, tutorID, financialPeriod, contractRate, revenueGenerated, commissionDue, courseCost, renewalRate 
FROM FinancialSummaries;

-- Get financial summary for a specific tutor with tutor ID.
SELECT financialSummaryID, financialPeriod, contractRate, revenueGenerated, commissionDue, courseCost, renewalRate 
FROM FinancialSummaries 
WHERE tutorID = :tutorID 
ORDER BY financialPeriod;

-- Get all financial summaries for a specific period for reporting.
SELECT financialSummaryID, tutorID, contractRate, revenueGenerated, commissionDue, courseCost, renewalRate 
FROM FinancialSummaries 
WHERE financialPeriod = :financialPeriod;

-- Insert a new financial summary.
INSERT INTO FinancialSummaries (tutorID, financialPeriod, contractRate, revenueGenerated, commissionDue, courseCost, renewalRate) 
VALUES (
    :tutorIDInput, 
    :financialPeriodInput, 
    :contractRateInput, 
    :revenueGeneratedInput, 
    :commissionDueInput, 
    :courseCostInput, 
    :renewalRateInput
);

-- Update a financial summary.
UPDATE FinancialSummaries 
SET financialPeriod = :financialPeriodInput, 
    contractRate = :contractRateInput, 
    revenueGenerated = :revenueGeneratedInput, 
    commissionDue = :commissionDueInput, 
    courseCost = :courseCostInput, 
    renewalRate = :renewalRateInput 
WHERE financialSummaryID = :financialSummaryID;

-- Delete a financial summary.
DELETE FROM FinancialSummaries 
WHERE financialSummaryID = :financialSummaryID;
--- * END FinancialSummaries QUERIES * ---



--- *Tutors_has_Students* ---
-- Get all students assigned to a specific tutor.
SELECT Students.studentID, CONCAT(Students.firstName, ' ', Students.lastName) AS studentName, Tutors_has_Students.studentSatisfaction, Tutors_has_Students.studentGradeImprovement
FROM Tutors_has_Students
INNER JOIN Students ON Tutors_has_Students.studentID = Students.studentID
WHERE Tutors_has_Students.tutorID = :tutorID;


-- Get all tutors assigned with a specific student.
SELECT Tutors.tutorID, CONCAT(Tutors.firstName, ' ', Tutors.lastName) AS tutorName, Tutors_has_Students.studentSatisfaction, Tutors_has_Students.studentGradeImprovement
FROM Tutors_has_Students
INNER JOIN Tutors ON Tutors_has_Students.tutorID = Tutors.tutorID
WHERE Tutors_has_Students.studentID = :studentID;

-- Insert a new record into Tutors_has_Students for linking reason.
INSERT INTO Tutors_has_Students (tutorID, studentID, studentSatisfaction, studentGradeImprovement) 
VALUES (:tutorIDInput, 
    :studentIDInput, 
    :studentSatisfactionInput, 
    :studentGradeImprovementInput
);

-- Update satisfaction and grade improvement.
UPDATE Tutors_has_Students 
SET studentSatisfaction = :studentSatisfactionInput, 
    studentGradeImprovement = :studentGradeImprovementInput 
WHERE tutorID = :tutorID AND studentID = :studentID;

-- Delete a tutor-student relationship.
DELETE FROM Tutors_has_Students 
WHERE tutorsHasStudentsID = :tutorsHasStudentsID;
--- * END Tutors_has_Students QUERIES * ---


--- *Courses_has_students* ---
-- Get all students assigned for a specific course.
SELECT Students.studentID, CONCAT(Students.firstName, ' ', Students.lastName) AS studentName, 
       Courses_has_Students.completedClassHours
FROM Courses_has_Students
INNER JOIN Students ON Courses_has_Students.studentID = Students.studentID
WHERE Courses_has_Students.courseID = :courseID;

-- Get all tutors, students, and their satisfaction and grade improvement for a specific course
SELECT 
    Tutors.tutorID AS `Tutor ID`,
    CONCAT(Tutors.firstName, ' ', Tutors.lastName) AS `Tutor's Name`,
    Students.studentID AS `Student ID`,
    CONCAT(Students.firstName, ' ', Students.lastName) AS `Student's Name`,
    Tutors_has_Students.studentSatisfaction AS `Student Satisfaction`,
    Tutors_has_Students.studentGradeImprovement AS `Student Grade Improvement`
FROM Courses_has_Students
INNER JOIN Students ON Courses_has_Students.studentID = Students.studentID
INNER JOIN Tutors_has_Students ON Tutors_has_Students.studentID = Students.studentID
INNER JOIN Tutors ON Tutors.tutorID = Tutors_has_Students.tutorID
WHERE Courses_has_Students.courseID = :courseID;

-- Get all courses assigned for a specific student.
SELECT Courses.courseID, Courses.courseName, 
       Courses_has_Students.completedClassHours
FROM Courses_has_Students
INNER JOIN Courses ON Courses_has_Students.courseID = Courses.courseID
WHERE Courses_has_Students.studentID = :studentID;

-- Insert a new record into Courses_has_students for linking reason.
INSERT INTO Courses_has_students (courseID, studentID, completedClassHours) 
VALUES (:courseIDInput, 
        :studentIDInput, 
        :completedClassHoursInput
);

-- Update completed class hours.
UPDATE Courses_has_students 
SET completedClassHours = :completedClassHoursInput 
WHERE courseID = :courseID AND studentID = :studentID;

-- Delete a course-student relationship.
DELETE FROM Courses_has_students 
WHERE courseID = :courseID AND studentID = :studentID;
--- * END Courses_has_students QUERIES * ---



--- *Tutors_has_Courses ---
-- Get all courses assigned to a specific tutor
SELECT Courses.courseID, Courses.courseName
FROM Tutors_has_Courses
INNER JOIN Courses ON Tutors_has_Courses.courseID = Courses.courseID
WHERE Tutors_has_Courses.tutorID = :tutorID;

-- Get all tutors assigned to a specific course
SELECT Tutors.tutorID, CONCAT(Tutors.firstName, ' ', Tutors.lastName) AS tutorName
FROM Tutors_has_Courses
INNER JOIN Tutors ON Tutors_has_Courses.tutorID = Tutors.tutorID
WHERE Tutors_has_Courses.courseID = :courseID;

-- Insert a new record into Tutors_has_Courses for linking reason
INSERT INTO Tutors_has_Courses (tutorID, courseID) 
VALUES (:tutorIDInput, :courseIDInput);

-- Delete a tutor-course relationship.
DELETE FROM Tutors_has_Courses 
WHERE tutorsHasCoursesID = :tutorsHasCoursesID;
--- * END Tutors_has_Courses QUERIES * ---

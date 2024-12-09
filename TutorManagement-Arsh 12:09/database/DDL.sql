/* 
    Group 46
    Group Name: Team Target Grade  4.0 
    -- Member 1: Jing Liu  
    -- Member 2: Arshdeep Kaur  
    -- Project Title: Tutor Management System 

    LAST UPDATED: 11/15/2024
*/

SET FOREIGN_KEY_CHECKS=0; 
SET AUTOCOMMIT = 0; 

-- Create table for Tutors entity
CREATE OR REPLACE TABLE `Tutors` (
    `tutorID` INT PRIMARY KEY AUTO_INCREMENT,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `phoneNum` INT,
    `tutorExperience` VARCHAR(255),
    `revenueGenerated` INT,
    `averageStudentSatisfaction` DECIMAL(3, 2),
    `averageStudentGradeImprovement` DECIMAL(3, 2)
);
-- Reset the AUTO_INCREMENT to continue from the last ID + 1
ALTER TABLE `Tutors` AUTO_INCREMENT = (SELECT MAX(tutorID) + 1 FROM `Tutors`);

-- Create table for Students entity
CREATE OR REPLACE TABLE `Students` (
    `studentID` INT PRIMARY KEY AUTO_INCREMENT,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `phoneNum` INT NOT NULL,
    `tuitionPayment` INT
);

-- Create table for Courses entity
CREATE OR REPLACE TABLE `Courses` (
    `courseID` INT PRIMARY KEY AUTO_INCREMENT,
    `courseName` VARCHAR(255),
    `coursePrice` INT NOT NULL,
    `totalClassHours` INT NOT NULL
);

-- Create table for FinancialSummaries entity
CREATE OR REPLACE TABLE `FinancialSummaries` (
    `financialSummaryID` INT PRIMARY KEY AUTO_INCREMENT,
    `tutorID` INT NOT NULL,
    `financialPeriod` VARCHAR(50) NOT NULL,
    `contractRate` INT NOT NULL,
    `revenueGenerated` INT NOT NULL,
    `commissionDue` INT NOT NULL,
    `courseCost` INT NOT NULL,
    `renewalRate` DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (`tutorID`) REFERENCES `Tutors`(`tutorID`) ON DELETE CASCADE
);

-- Create table for Tutors_has_Students entity
CREATE OR REPLACE TABLE `Tutors_has_Students` (
    `tutorsHasStudentsID`INT AUTO_INCREMENT PRIMARY KEY,
    `tutorID` INT NOT NULL,
    `studentID` INT,
    `studentSatisfaction` DECIMAL(3, 2),
    `studentGradeImprovement` DECIMAL(3, 2),
    FOREIGN KEY (`tutorID`) REFERENCES `Tutors`(`tutorID`) ON DELETE CASCADE,
    FOREIGN KEY (`studentID`) REFERENCES `Students`(`studentID`) ON DELETE SET NULL
);

-- Create table for Tutors_has_Courses entity
CREATE OR REPLACE TABLE `Tutors_has_Courses` (
    `tutorsHasCoursesID`INT AUTO_INCREMENT PRIMARY KEY,
    `tutorID` INT NOT NULL,
    `courseID` INT ,
    FOREIGN KEY (`tutorID`) REFERENCES `Tutors`(`tutorID`) ON DELETE CASCADE,
    FOREIGN KEY (`courseID`) REFERENCES `Courses`(`courseID`) ON DELETE SET NULL
);

-- Create table for Courses_has_Students entity
CREATE OR REPLACE TABLE `Courses_has_Students` (
    `courseID` INT NOT NULL,
    `studentID` INT NOT NULL,
    `completedClassHours` INT NOT NULL,
    PRIMARY KEY (`courseID`, `studentID`),
    FOREIGN KEY (`courseID`) REFERENCES `Courses`(`courseID`) ON DELETE CASCADE,
    FOREIGN KEY (`studentID`) REFERENCES `Students`(`studentID`) ON DELETE CASCADE
);

-- Adding sample Tutors data
INSERT INTO `Tutors` (`firstName`, `lastName`, `phoneNum`, `tutorExperience`, `revenueGenerated`, `averageStudentSatisfaction`, `averageStudentGradeImprovement`)
VALUES
('Jane', 'Doe', 1914567890, '5 years', 540000, 3.75, 0.25),
('Mary', 'Jenkins', 1995678901, '3 years', 320000, 4.50, 0.10),
('Hannibal', 'Lecter', 1966789012, '10 years', 80000, 4.90, 0.50),
('Will', 'Graham', 1927890123, '7 years', 70000, 4.80, 0.35);

-- Adding sample Students data
INSERT INTO `Students` (`firstName`, `lastName`, `phoneNum`, `tuitionPayment`)
VALUES
('Martin', 'Smith', 1916543210, 14000),
('Etta', 'Eaton', 1975432109, 12000),
('Salem', 'Warner', 1984321098, 9000),
('Alondra', 'Gross', 1873210987, 7400);

-- Adding sample Courses data
INSERT INTO `Courses` (`courseName`, `coursePrice`, `totalClassHours`)
VALUES
('Algebra I', 5000, 40),
('Biology', 6000, 60),
('US History', 5500, 30),
('Geometry', 4500, 40);

-- Adding sample FinancialSummaries data
INSERT INTO `FinancialSummaries` (`tutorID`, `financialPeriod`, `contractRate`, `revenueGenerated`, `commissionDue`, `courseCost`, `renewalRate`)
VALUES
((SELECT tutorID FROM Tutors WHERE firstName = 'Jane' AND lastName = 'Doe'), 'Q1 2024', 30, 5000, 500, 2000, 0.85),
((SELECT tutorID FROM Tutors WHERE firstName = 'Jane' AND lastName = 'Doe'), 'Q1 2024', 25, 6000, 600, 3000, 0.75),
((SELECT tutorID FROM Tutors WHERE firstName = 'Mary' AND lastName = 'Jenkins'), 'Q2 2024', 35, 5000, 500, 3000, 0.90),
((SELECT tutorID FROM Tutors WHERE firstName = 'Hannibal' AND lastName = 'Lecter'), 'Q2 2024', 28, 6000, 600, 2000, 0.80);

-- Adding sample Tutors_has_Students data
INSERT INTO `Tutors_has_Students` (`tutorID`, `studentID`, `studentSatisfaction`, `studentGradeImprovement`)
VALUES
((SELECT tutorID FROM Tutors WHERE firstName = 'Jane' AND lastName = 'Doe'), (SELECT studentID FROM Students WHERE firstName = 'Martin' AND lastName = 'Smith'), 4.7, 0.2),
((SELECT tutorID FROM Tutors WHERE firstName = 'Jane' AND lastName = 'Doe'), (SELECT studentID FROM Students WHERE firstName = 'Etta' AND lastName = 'Eaton'), 4.5, 0.1),
((SELECT tutorID FROM Tutors WHERE firstName = 'Mary' AND lastName = 'Jenkins'), (SELECT studentID FROM Students WHERE firstName = 'Martin' AND lastName = 'Smith'), 4.4, 0.3),
((SELECT tutorID FROM Tutors WHERE firstName = 'Mary' AND lastName = 'Jenkins'), (SELECT studentID FROM Students WHERE firstName = 'Salem' AND lastName = 'Warner'), 4.8, 0.3),
((SELECT tutorID FROM Tutors WHERE firstName = 'Hannibal' AND lastName = 'Lecter'), (SELECT studentID FROM Students WHERE firstName = 'Salem' AND lastName = 'Warner'), 4.9, 0.4),
((SELECT tutorID FROM Tutors WHERE firstName = 'Will' AND lastName = 'Graham'), (SELECT studentID FROM Students WHERE firstName = 'Alondra' AND lastName = 'Gross'), 4.6, 0.1);

-- Adding sample Tutors_has_Courses data
INSERT INTO `Tutors_has_Courses` (`tutorID`, `courseID`)
VALUES
((SELECT tutorID FROM Tutors WHERE firstName = 'Jane' AND lastName = 'Doe'), (SELECT courseID FROM Courses WHERE courseName = 'Algebra I')),
((SELECT tutorID FROM Tutors WHERE firstName = 'Jane' AND lastName = 'Doe'), (SELECT courseID FROM Courses WHERE courseName = 'Biology')),
((SELECT tutorID FROM Tutors WHERE firstName = 'Mary' AND lastName = 'Jenkins'), (SELECT courseID FROM Courses WHERE courseName = 'Algebra I')),
((SELECT tutorID FROM Tutors WHERE firstName = 'Hannibal' AND lastName = 'Lecter'), (SELECT courseID FROM Courses WHERE courseName = 'US History')),
((SELECT tutorID FROM Tutors WHERE firstName = 'Will' AND lastName = 'Graham'), (SELECT courseID FROM Courses WHERE courseName = 'Geometry'));

-- Adding sample Courses_has_Students data
INSERT INTO `Courses_has_Students` (`courseID`, `studentID`, `completedClassHours`)
VALUES
((SELECT courseID FROM Courses WHERE courseName = 'Algebra I'), (SELECT studentID FROM Students WHERE firstName = 'Martin' AND lastName = 'Smith'), 15),
((SELECT courseID FROM Courses WHERE courseName = 'Biology'), (SELECT studentID FROM Students WHERE firstName = 'Etta' AND lastName = 'Eaton'), 20),
((SELECT courseID FROM Courses WHERE courseName = 'US History'), (SELECT studentID FROM Students WHERE firstName = 'Salem' AND lastName = 'Warner'), 25),
((SELECT courseID FROM Courses WHERE courseName = 'Geometry'), (SELECT studentID FROM Students WHERE firstName = 'Alondra' AND lastName = 'Gross'), 10),
((SELECT courseID FROM Courses WHERE courseName = 'Algebra I'), (SELECT studentID FROM Students WHERE firstName = 'Salem' AND lastName = 'Warner'), 12);

SET FOREIGN_KEY_CHECKS=1; 
COMMIT;

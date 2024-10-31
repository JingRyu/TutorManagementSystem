-- Group Name: Team Target Grade  4.0 
-- Member 1: Jing Liu  
-- Member 2: Arshdeep Kaur  
-- Project Title: Tutor Management System 

SET FOREIGN_KEY_CHECKS=0; 
SET AUTOCOMMIT = 0; 

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

CREATE OR REPLACE TABLE `Students` (
    `studentID` INT PRIMARY KEY AUTO_INCREMENT,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `phoneNum` INT NOT NULL,
    `tuitionPayment` INT
);


CREATE OR REPLACE TABLE `Courses` (
    `courseID` INT PRIMARY KEY AUTO_INCREMENT,
    `courseName` VARCHAR(255),
    `coursePrice` INT NOT NULL,
    `totalClassHours` INT NOT NULL
);

CREATE OR REPLACE TABLE `FinancialSummaries` (
    `financialSummaryID` INT PRIMARY KEY AUTO_INCREMENT,
    `tutorID` INT NOT NULL,
    `financialPeriod` VARCHAR(50) NOT NULL,
    `contractRate` INT NOT NULL,
    `revenueGenerated` INT NOT NULL,
    `commissionDue` INT NOT NULL,
    `courseCost` INT NOT NULL,
    `renewalRate` DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (`tutorID`) REFERENCES `Tutors`(`tutorID`)
);

CREATE OR REPLACE TABLE `Tutors_has_Students` (
    `tutorID` INT NOT NULL,
    `studentID` INT NOT NULL,
    `studentSatisfaction` DECIMAL(3, 2),
    `studentGradeImprovement` DECIMAL(3, 2),
    PRIMARY KEY (`tutorID`, `studentID`),
    FOREIGN KEY (`tutorID`) REFERENCES `Tutors`(`tutorID`),
    FOREIGN KEY (`studentID`) REFERENCES `Students`(`studentID`)
);

CREATE OR REPLACE TABLE `Tutors_has_Courses` (
    `tutorID` INT NOT NULL,
    `courseID` INT NOT NULL,
    PRIMARY KEY (`tutorID`, `courseID`),
    FOREIGN KEY (`tutorID`) REFERENCES `Tutors`(`tutorID`),
    FOREIGN KEY (`courseID`) REFERENCES `Courses`(`courseID`)
);

CREATE OR REPLACE TABLE `Courses_has_Students` (
    `courseID` INT NOT NULL,
    `studentID` INT NOT NULL,
    `completedClassHours` INT NOT NULL,
    PRIMARY KEY (`courseID`, `studentID`),
    FOREIGN KEY (`courseID`) REFERENCES `Courses`(`courseID`),
    FOREIGN KEY (`studentID`) REFERENCES `Students`(`studentID`)
);


INSERT INTO `Tutors` (`firstName`, `lastName`, `phoneNum`, `tutorExperience`, `revenueGenerated`, `averageStudentSatisfaction`, `averageStudentGradeImprovement`)
VALUES
('Jane', 'Doe', 1914567890, '5 years', 540000, 3.75, 0.25),
('Mary', 'Jenkins', 1995678901, '3 years', 320000, 4.50, 0.10),
('Hannibal', 'Lecter', 1966789012, '10 years', 80000, 4.90, 0.50),
('Will', 'Graham', 1927890123, '7 years', 70000, 4.80, 0.35);

INSERT INTO `Students` (`firstName`, `lastName`, `phoneNum`, `tuitionPayment`)
VALUES
('Martin', 'Smith', 1916543210, 14000),
('Etta', 'Eaton', 1975432109, 12000),
('Salem', 'Warner', 1984321098, 9000),
('Alondra', 'Gross', 1873210987, 7400);

INSERT INTO `Courses` (`courseName`, `coursePrice`, `totalClassHours`)
VALUES
('Algebra I', 5000, 40),
('Biology', 6000, 60),
('US History', 5500, 30),
('Geometry', 4500, 40);

INSERT INTO `FinancialSummaries` (`tutorID`, `financialPeriod`, `contractRate`, `revenueGenerated`, `commissionDue`, `courseCost`, `renewalRate`)
VALUES
(1, 'Q1 2024', 30, 5000, 500, 2000, 0.85),
(1, 'Q1 2024', 25, 6000, 600, 3000, 0.75),
(2, 'Q2 2024', 35, 5000, 500, 3000, 0.90),
(3, 'Q2 2024', 28, 6000, 600, 2000, 0.80);

INSERT INTO `Tutors_has_Students` (`tutorID`, `studentID`, `studentSatisfaction`, `studentGradeImprovement`)
VALUES
(1, 1, 4.7, 0.2),
(1, 2, 4.5, 0.1),
(2, 1, 4.8, 0.3),
(3, 3, 4.9, 0.4),
(4, 4, 4.6, 0.1);

INSERT INTO `Tutors_has_Courses` (`tutorID`, `courseID`)
VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 3),
(4, 4);

INSERT INTO `Courses_has_Students` (`courseID`, `studentID`, `completedClassHours`)
VALUES
(1, 1, 15),
(2, 2, 20),
(3, 3, 25),
(4, 4, 10),
(1, 3, 12);

SET FOREIGN_KEY_CHECKS=1; 
COMMIT;

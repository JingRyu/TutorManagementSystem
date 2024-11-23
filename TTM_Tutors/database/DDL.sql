-- MariaDB dump 10.19  Distrib 10.5.22-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_liuj8

-- Group Name: Team Target Grade  4.0 
-- Member 1: Jing Liu  
-- Member 2: Arshdeep Kaur  
-- Project Title: Tutor Management System 

-- ------------------------------------------------------
-- Server version	10.6.19-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Courses`
--

DROP TABLE IF EXISTS `Courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Courses` (
  `courseID` int(11) NOT NULL AUTO_INCREMENT,
  `courseName` varchar(255) DEFAULT NULL,
  `coursePrice` int(11) NOT NULL,
  `totalClassHours` int(11) NOT NULL,
  PRIMARY KEY (`courseID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Courses`
--

LOCK TABLES `Courses` WRITE;
/*!40000 ALTER TABLE `Courses` DISABLE KEYS */;
INSERT INTO `Courses` VALUES (1,'Algebra I',5000,40),(2,'Biology',6000,60),(3,'US History',5500,30),(4,'Geometry',4500,40);
/*!40000 ALTER TABLE `Courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Courses_has_Students`
--

DROP TABLE IF EXISTS `Courses_has_Students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Courses_has_Students` (
  `courseID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL,
  `completedClassHours` int(11) NOT NULL,
  PRIMARY KEY (`courseID`,`studentID`),
  KEY `studentID` (`studentID`),
  CONSTRAINT `Courses_has_Students_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `Courses` (`courseID`),
  CONSTRAINT `Courses_has_Students_ibfk_2` FOREIGN KEY (`studentID`) REFERENCES `Students` (`studentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Courses_has_Students`
--

LOCK TABLES `Courses_has_Students` WRITE;
/*!40000 ALTER TABLE `Courses_has_Students` DISABLE KEYS */;
INSERT INTO `Courses_has_Students` VALUES (1,1,15),(1,3,12),(2,2,20),(3,3,25),(4,4,10);
/*!40000 ALTER TABLE `Courses_has_Students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FinancialSummaries`
--

DROP TABLE IF EXISTS `FinancialSummaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FinancialSummaries` (
  `financialSummaryID` int(11) NOT NULL AUTO_INCREMENT,
  `tutorID` int(11) NOT NULL,
  `financialPeriod` varchar(50) NOT NULL,
  `contractRate` int(11) NOT NULL,
  `revenueGenerated` int(11) NOT NULL,
  `commissionDue` int(11) NOT NULL,
  `courseCost` int(11) NOT NULL,
  `renewalRate` decimal(5,2) NOT NULL,
  PRIMARY KEY (`financialSummaryID`),
  KEY `tutorID` (`tutorID`),
  CONSTRAINT `FinancialSummaries_ibfk_1` FOREIGN KEY (`tutorID`) REFERENCES `Tutors` (`tutorID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FinancialSummaries`
--

LOCK TABLES `FinancialSummaries` WRITE;
/*!40000 ALTER TABLE `FinancialSummaries` DISABLE KEYS */;
INSERT INTO `FinancialSummaries` VALUES (1,1,'Q1 2024',30,5000,500,2000,0.85),(2,1,'Q1 2024',25,6000,600,3000,0.75),(3,2,'Q2 2024',35,5000,500,3000,0.90),(4,3,'Q2 2024',28,6000,600,2000,0.80);
/*!40000 ALTER TABLE `FinancialSummaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Students`
--

DROP TABLE IF EXISTS `Students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Students` (
  `studentID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `phoneNum` int(11) NOT NULL,
  `tuitionPayment` int(11) DEFAULT NULL,
  PRIMARY KEY (`studentID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Students`
--

LOCK TABLES `Students` WRITE;
/*!40000 ALTER TABLE `Students` DISABLE KEYS */;
INSERT INTO `Students` VALUES (1,'Martin','Smith',1916543210,14000),(2,'Etta','Eaton',1975432109,12000),(3,'Salem','Warner',1984321098,9000),(4,'Alondra','Gross',1873210987,7400);
/*!40000 ALTER TABLE `Students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tutors`
--

DROP TABLE IF EXISTS `Tutors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tutors` (
  `tutorID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `phoneNum` varchar(20) DEFAULT NULL,
  `tutorExperience` varchar(255) DEFAULT NULL,
  `revenueGenerated` int(11) DEFAULT NULL,
  `averageStudentSatisfaction` int(5) DEFAULT NULL,
  `averageStudentGradeImprovement` int(5) DEFAULT NULL,
  PRIMARY KEY (`tutorID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tutors`
--

LOCK TABLES `Tutors` WRITE;
/*!40000 ALTER TABLE `Tutors` DISABLE KEYS */;
INSERT INTO `Tutors` VALUES (1,'Jane','Doe',1914567890,'5 years',540000,3.75,0.25),(2,'Mary','Jenkins',1995678901,'3 years',320000,4.50,0.10),(3,'Hannibal','Lecter',1966789012,'10 years',80000,4.90,0.50),(4,'Will','Graham',1927890123,'7 years',70000,4.80,0.35);
/*!40000 ALTER TABLE `Tutors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tutors_has_Courses`
--

DROP TABLE IF EXISTS `Tutors_has_Courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tutors_has_Courses` (
  `tutorID` int(11) NOT NULL,
  `courseID` int(11) NOT NULL,
  PRIMARY KEY (`tutorID`,`courseID`),
  KEY `courseID` (`courseID`),
  CONSTRAINT `Tutors_has_Courses_ibfk_1` FOREIGN KEY (`tutorID`) REFERENCES `Tutors` (`tutorID`),
  CONSTRAINT `Tutors_has_Courses_ibfk_2` FOREIGN KEY (`courseID`) REFERENCES `Courses` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tutors_has_Courses`
--

LOCK TABLES `Tutors_has_Courses` WRITE;
/*!40000 ALTER TABLE `Tutors_has_Courses` DISABLE KEYS */;
INSERT INTO `Tutors_has_Courses` VALUES (1,1),(1,2),(2,1),(3,3),(4,4);
/*!40000 ALTER TABLE `Tutors_has_Courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tutors_has_Students`
--

DROP TABLE IF EXISTS `Tutors_has_Students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tutors_has_Students` (
  `tutorID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL,
  `studentSatisfaction` decimal(3,2) DEFAULT NULL,
  `studentGradeImprovement` decimal(3,2) DEFAULT NULL,
  PRIMARY KEY (`tutorID`,`studentID`),
  KEY `studentID` (`studentID`),
  CONSTRAINT `Tutors_has_Students_ibfk_1` FOREIGN KEY (`tutorID`) REFERENCES `Tutors` (`tutorID`),
  CONSTRAINT `Tutors_has_Students_ibfk_2` FOREIGN KEY (`studentID`) REFERENCES `Students` (`studentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tutors_has_Students`
--

LOCK TABLES `Tutors_has_Students` WRITE;
/*!40000 ALTER TABLE `Tutors_has_Students` DISABLE KEYS */;
INSERT INTO `Tutors_has_Students` VALUES (1,1,4.70,0.20),(1,2,4.50,0.10),(2,1,4.80,0.30),(3,3,4.90,0.40),(4,4,4.60,0.10);
/*!40000 ALTER TABLE `Tutors_has_Students` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-31 11:52:09

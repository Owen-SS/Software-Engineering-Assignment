--Creates Database
CREATE DATABASE IF NOT EXISTS Assignment;


--Ensures we are using the correct database
USE Assignment;


--Creates student table
CREATE TABLE `assignment`.`student` (
  `idstudent` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL UNIQUE,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL UNIQUE,
  `phonenumber` VARCHAR(45) NOT NULL UNIQUE,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `dob` DATE NOT NULL,
  `address1` VARCHAR(45) NOT NULL,
  `address2` VARCHAR(45) NULL,
  `address3` VARCHAR(45) NULL,
  `postcode` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idstudent`),
  UNIQUE INDEX `idstudent_UNIQUE` (`idstudent` ASC) VISIBLE);

--Creates employer table
CREATE TABLE `assignment`.`employer` (
  `idemployer` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL UNIQUE,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL UNIQUE,
  `phonenumber` VARCHAR(45) NOT NULL,
  `companyname` VARCHAR(45) NOT NULL,
  `address1` VARCHAR(45) NOT NULL,
  `address2` VARCHAR(45) NULL,
  `address3` VARCHAR(45) NULL,
  `postcode` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idemployer`),
  UNIQUE INDEX `idemployer_UNIQUE` (`idemployer` ASC) VISIBLE);


--Displays student table
SELECT * FROM student;

--Displays employer table
SELECT * FROM employer;


--Inserts data into student table
INSERT INTO student 
(idstudent,username,password,email,phonenumber,name,surname,dob,address1,address2,address3,postcode)
VALUES
(0, "MrBob", "password", "bob@bobington.co.uk", "05639264937", "Bob", "Bobington", "2002/05/24", "35 Bobland Avenue", "Richmond", "London", "RW17 9HG");

--Inserts data into employer table
INSERT INTO employer 
(idemployer,username,password,email,phonenumber,companyname,address1,address2,address3,postcode)
VALUES
(0, "EpicEmployer", "password", "epic@fortnite.co.uk", "05639875937", "Fortnite", "36 Apex Lane", "Hartfield", "Not London", "NH17 8JK");
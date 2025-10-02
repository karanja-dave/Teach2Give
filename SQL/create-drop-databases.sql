--check all available databases in the server
SELECT name FROM master.sys.databases ORDER BY name;

--stored procedure to check all data-bases in the server
EXEC sp_databases;

--create new database
CREATE DATABASE trialDb;

--deleteing a database
DROP DATABASE trialDb;  --will give an error since we are running this database now

--creating a schema
CREATE SCHEMA customer_services;
GO --jua function yake

--listing all schemas 
SELECT s.name AS schema_name,  u.name AS schema_owner
FROM sys.schemas s
INNER JOIN sys.sysusers u ON u.uid = s.principal_id
ORDER BY s.name;


--creating a table inside our schema
CREATE TABLE customer_services.jobs(
	job_id INT PRIMARY KEY IDENTITY,
	customer_id INT NOT NULL,
	description VARCHAR(200),
	created_at DATETIME2 NOT NULL);

--inserting values to table
INSERT INTO customer_services.jobs(customer_id,description,created_at)
	VALUES
	(102,'Repair laptop screen',GETDATE()),
	(103,'Upgrade internet package',GETDATE()),
	(104,'Replace modem',GETDATE());

--view table
SELECT * FROM customer_services.jobs;

--moving an object (eg a table) form one schema to the other
CREATE SCHEMA sales
GO
--create a table that will be stored in the default schema called dbo
CREATE TABLE dbo.offices(
	office_id INT PRIMARY KEY IDENTITY,
	office_name NVARCHAR(40) NOT NULL,
	office_address NVARCHAR(255) NOT NULL,
	phone VARCHAR(20)
	);
--input values 
INSERT INTO dbo.offices(office_name,office_address)
	VALUES
	('SIlicon Valley','400 North 1st Street, San Jose CA 95130'),
	('Sacramento', '1-7- River Dr., Sacramento CA 95820');

SELECT *FROM dbo.offices 
ALTER SCHEMA sales TRANSFER OBJECT::dbo.offices; 

--delete schema
DROP SCHEMA sales

--before dropping a schema you should firt drop the objects inside it otherwise youll run into an error like in the above code 

DROP TABLE sales.offices
--now drop the schema
DROP SCHEMA sales

--creating, modifying, drop and truncating tables

--cretaing tables
CREATE TABLE sales.stores(
	store_id INT PRIMARY KEY IDENTITY,
	store_name VARCHAR(10) NOT NULL);

CREATE TABLE sales.visit(
	visit_id INT PRIMARY KEY IDENTITY,
	firts_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	visited_at DATETIME,
	phone VARCHAR(20),
	store_id INT NOT NULL,
	FOREIGN KEY (store_id) REFERENCES sales.stores(store_id);

	--skipped content on altering IDENTITY

--altering tables
--add columns
CREATE TABLE sales.quotations (
	quotation_no INT IDENTITY PRIMARY KEY,
	valid_from DATE NOT NULL,
	valid_to DATE NOT NULL);

SELECT *FROM sales.quotations
--adding a new column using alert
ALTER TABLE sales.quotations
ADD description VARCHAR(255) NOT null;

SELECT *FROM sales.quotations;

--adding multiple columns
ALTER TABLE sales.quotations
	ADD
	amount DECIMAL(10,2) NOT NULL,
	customer_name VARCHAR(50) NOT NULL;
SELECT *FROM sales.quotations



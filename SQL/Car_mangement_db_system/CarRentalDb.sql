-- creating tables 

-- car table 
CREATE TABLE Car (
    car_id INT PRIMARY KEY IDENTITY(1,1),
    car_model VARCHAR(100),
    manufacturer VARCHAR(100),
    year INT,
    color VARCHAR(50),
    rental_rate DECIMAL(10,2),
    avail BIT
);
-- insert values 
INSERT INTO Car (car_model, manufacturer, year, color, rental_rate, avail) VALUES
('Corolla', 'Toyota', 2020, 'White', 45.00, 1),
('Civic', 'Honda', 2021, 'Black', 50.00, 1),
('Model 3', 'Tesla', 2022, 'Red', 100.00, 1),
('Ranger', 'Ford', 2019, 'Blue', 60.00, 0),
('Camry', 'Toyota', 2023, 'Silver', 70.00, 1);


-- Customer Table
CREATE TABLE Customer (
    customer_id INT PRIMARY KEY IDENTITY(1,1),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(20),
    addresses VARCHAR(255)
);
-- insert values 
INSERT INTO Customer (first_name, last_name, email, phone_number, addresses) VALUES
('John', 'Doe', 'john.doe@email.com', '+254712345678', 'Nairobi, Kenya'),
('Mary', 'Wanjiku', 'mary.wanjiku@email.com', '+254798765432', 'Mombasa, Kenya'),
('Peter', 'Otieno', 'peter.otieno@email.com', '+254701112233', 'Kisumu, Kenya'),
('Jane', 'Njeri', 'jane.njeri@email.com', '+254700998877', 'Nakuru, Kenya'),
('Brian', 'Mwangi', 'brian.mwangi@email.com', '+254722334455', 'Eldoret, Kenya');

-- booking table 
CREATE TABLE Booking (
    booking_id INT PRIMARY KEY IDENTITY(1,1),
    car_id INT FOREIGN KEY REFERENCES Car(car_id),
    customer_id INT FOREIGN KEY REFERENCES Customer(customer_id),
    rental_start_date DATE,
    rental_end_date DATE,
    total_amount DECIMAL(10,2)
);
-- insert values 
INSERT INTO Booking (car_id, customer_id, rental_start_date, rental_end_date, total_amount) VALUES
(1, 1, '2025-10-01', '2025-10-05', 225.00),
(2, 2, '2025-09-20', '2025-09-22', 100.00),
(3, 3, '2025-10-10', '2025-10-15', 500.00),
(4, 4, '2025-08-01', '2025-08-03', 180.00),
(5, 5, '2025-09-10', '2025-09-13', 210.00);


-- payment table 
CREATE TABLE Payment (
    payment_id INT PRIMARY KEY IDENTITY(1,1),
    booking_id INT UNIQUE FOREIGN KEY REFERENCES Booking(booking_id),
    payment_date DATE,
    amount DECIMAL(10,2),
    payment_method VARCHAR(50)
);
-- insert values 
INSERT INTO Payment (booking_id, payment_date, amount, payment_method) VALUES
(1, '2025-10-01', 225.00, 'Credit Card'),
(2, '2025-09-20', 100.00, 'Cash'),
(3, '2025-10-10', 500.00, 'Mobile Money'),
(4, '2025-08-01', 180.00, 'Debit Card'),
(5, '2025-09-10', 210.00, 'Bank Transfer');


-- insuranace table 
CREATE TABLE Insurance (
    insurance_id INT PRIMARY KEY IDENTITY(1,1),
    car_id INT UNIQUE FOREIGN KEY REFERENCES Car(car_id),
    insurance_provider VARCHAR(100),
    policy_number VARCHAR(50),
    startdate DATE,
    enddate DATE
);
-- insert values 
INSERT INTO Insurance (car_id, insurance_provider, policy_number, startdate, enddate) VALUES
(1, 'Jubilee Insurance', 'INS-1001', '2025-01-01', '2025-12-31'),
(2, 'APA Insurance', 'INS-1002', '2025-03-01', '2026-02-28'),
(3, 'Britam', 'INS-1003', '2025-05-01', '2026-04-30'),
(4, 'UAP Old Mutual', 'INS-1004', '2025-06-15', '2026-06-14'),
(5, 'CIC Insurance', 'INS-1005', '2025-07-01', '2026-06-30');


-- location table 
CREATE TABLE Location (
    location_id INT PRIMARY KEY IDENTITY(1,1),
    car_id INT UNIQUE FOREIGN KEY REFERENCES Car(car_id),
    location_name VARCHAR(100),
    addresses VARCHAR(255),
    contact_number VARCHAR(20)
);
-- insert values 
INSERT INTO Location (car_id, location_name, addresses, contact_number) VALUES
(1, 'Nairobi Branch', 'Moi Avenue, Nairobi', '+254711111111'),
(2, 'Mombasa Branch', 'Nkrumah Road, Mombasa', '+254722222222'),
(3, 'Kisumu Branch', 'Oginga Odinga St, Kisumu', '+254733333333'),
(4, 'Nakuru Branch', 'Kenyatta Ave, Nakuru', '+254744444444'),
(5, 'Eldoret Branch', 'Kenyatta St, Eldoret', '+254755555555');


-- reservation table 
CREATE TABLE Reservation (
    reservation_id INT PRIMARY KEY IDENTITY(1,1),
    car_id INT FOREIGN KEY REFERENCES Car(car_id),
    customer_id INT FOREIGN KEY REFERENCES Customer(customer_id),
    reservation_date DATE,
    pickup_date DATE,
    return_date DATE
);
-- insert values 
INSERT INTO Reservation (car_id, customer_id, reservation_date, pickup_date, return_date) VALUES
(1, 2, '2025-09-25', '2025-10-02', '2025-10-05'),
(2, 3, '2025-09-15', '2025-09-20', '2025-09-22'),
(3, 4, '2025-10-05', '2025-10-10', '2025-10-15'),
(4, 5, '2025-07-25', '2025-08-01', '2025-08-03'),
(5, 1, '2025-09-05', '2025-09-10', '2025-09-13');


-- maintenance table 
CREATE TABLE Maintenance (
    maintenance_id INT PRIMARY KEY IDENTITY(1,1),
    car_id INT FOREIGN KEY REFERENCES Car(car_id),
    maintenance_date DATE,
    descriptions VARCHAR(255),
    cost DECIMAL(10,2)
);
-- insert values 
INSERT INTO Maintenance (car_id, maintenance_date, descriptions, cost) VALUES
(1, '2025-07-01', 'Oil change and tire rotation', 50.00),
(2, '2025-08-10', 'Brake pad replacement', 120.00),
(3, '2025-09-01', 'Battery replacement', 200.00),
(4, '2025-06-15', 'Engine tune-up', 300.00),
(5, '2025-07-20', 'Transmission check', 150.00);


-- CRUD OPERATIONS 

-- Creation: inserting new records to existing tables
-- car table 
EXEC sp_Insert 
    @TableName = 'Car',
    @Columns = 'car_model, manufacturer, year, color, rental_rate, avail',
    @Values = 
        '(''Corolla'', ''Toyota'', 2020, ''White'', 5500.00, 1),
         (''Civic'', ''Honda'', 2021, ''Black'', 6000.00, 1),
         (''Mazda3'', ''Mazda'', 2022, ''Red'', 6200.00, 1)';

-- customer table 
EXEC sp_Insert 
    @TableName = 'Customer',
    @Columns = 'first_name, last_name, email, phone_number, addresses',
    @Values = 
        '(''Alice'', ''Mwende'', ''alice.mwende@email.com'', ''+254701111222'', ''Machakos, Kenya''),
         (''Faith'', ''Njoki'', ''faith.njoki@email.com'', ''+254703212222'', ''Embu, Kenya'')';


-- booking table 
EXEC sp_Insert 
    @TableName = 'Booking',
    @Columns = 'car_id, customer_id, rental_start_date, rental_end_date, total_amount',
    @Values = 
        '(1, 2, ''2025-10-20'', ''2025-10-23'', 270.00),
         (3, 4, ''2025-11-01'', ''2025-11-05'', 500.00)';


-- payment table 
EXEC sp_Insert 
    @TableName = 'Payment',
    @Columns = 'booking_id, payment_date, amount, payment_method',
    @Values = 
        '(6, ''2025-10-20'', 270.00, ''Cash''),
         (7, ''2025-11-01'', 500.00, ''Mobile Money'')';


-- insurance table 
EXEC sp_Insert 
    @TableName = 'Insurance',
    @Columns = 'car_id, insurance_provider, policy_number, startdate, enddate',
    @Values = 
        '(6, ''Britam Insurance'', ''INS-2002'', ''2025-02-01'', ''2026-02-01''),
         (7, ''Jubilee Insurance'', ''INS-2003'', ''2025-03-01'', ''2026-03-01'')';


-- location table  
EXEC sp_Insert 
    @TableName = 'Location',
    @Columns = 'car_id, location_name, addresses, contact_number',
    @Values = 
        '(6, ''Nyeri Branch'', ''Gatitu Rd, Nyeri'', ''+254766666666''),
         (7, ''Kericho Branch'', ''Kenyatta Ave, Kericho'', ''+254777777777'')';


-- reservation table 
EXEC sp_Insert 
    @TableName = 'Reservation',
    @Columns = 'car_id, customer_id, reservation_date, pickup_date, return_date',
    @Values = 
        '(1, 3, ''2025-10-01'', ''2025-10-03'', ''2025-10-06''),
         (4, 5, ''2025-11-05'', ''2025-11-07'', ''2025-11-10'')';


-- maintenance table 
EXEC sp_Insert 
    @TableName = 'Maintenance',
    @Columns = 'car_id, maintenance_date, descriptions, cost',
    @Values = 
        '(2, ''2025-09-20'', ''Tire replacement'', 180.00),
         (5, ''2025-10-05'', ''Oil filter change'', 75.00)';



-- raed - view rows in a table 
-- view all rows 
-- car table 
EXEC sp_Read @TableName = 'Car';

-- customer table 
EXEC sp_Read @TableName = 'Customer';

-- booking table 
EXEC sp_Read @TableName = 'Booking';

-- payment table 
EXEC sp_Read @TableName = 'Payment';

-- insurance table 
EXEC sp_Read @TableName = 'Insurance';

-- location table  
EXEC sp_Read @TableName = 'Location';

-- reservation table 
EXEC sp_Read @TableName = 'Reservation';

-- maintenance table 
EXEC sp_Read @TableName = 'Maintenance';

-- view rows based on conditions 
-- car table 
EXEC sp_Read @TableName = 'Car', @Condition = 'avail = 1'; --view all avaiable cars
EXEC sp_Read  @TableName = 'Car', @Condition = 'manufacturer = ''Toyota'''; --view toyota cars

-- customer table 
EXEC sp_Read @TableName = 'Customer', @Condition = 'addresses LIKE ''%Nairobi%''';
-- booking table 
EXEC sp_Read @TableName = 'Booking', @Condition = 'total_amount > 200';

-- payment table 
EXEC sp_Read @TableName = 'Payment', @Condition = 'payment_method = ''Cash''';

-- insurance table 
EXEC sp_Read @TableName = 'Insurance', @Condition = 'insurance_provider = ''Jubilee Insurance''';

-- location table  
EXEC sp_Read @TableName = 'Location', @Condition = 'location_name = ''Nairobi Branch''';

-- reservation table 
EXEC sp_Read @TableName = 'Reservation', @Condition = 'pickup_date > ''2025-10-01''';

-- maintainace table 
EXEC sp_Read @TableName = 'Maintenance', @Condition = 'cost > 100';


-- update -edit existing rows 
-- car table 
EXEC sp_Update 
    @TableName = 'Car',
    @SetClause = 'rental_rate = 5800.00', --update rental rate of corolla car
    @Condition = 'car_model = ''Corolla''';

EXEC sp_Update 
    @TableName = 'Car',
    @SetClause = 'avail = 0', --change availability of toyota civic as not available
    @Condition = 'car_model = ''Civic''';

-- customer table 
EXEC sp_Update 
    @TableName = 'Customer',
    @SetClause = 'phone_number = ''+254799999999''',
    @Condition = 'email = ''john.doe@email.com''';

-- booking table 
EXEC sp_Update 
    @TableName = 'Booking',
    @SetClause = 'total_amount = 300.00',
    @Condition = 'booking_id = 1';

-- payment table 
EXEC sp_Update 
    @TableName = 'Payment',
    @SetClause = 'payment_method = ''Bank Transfer''',
    @Condition = 'payment_id = 3';

-- insurance table 
EXEC sp_Update 
    @TableName = 'Insurance',
    @SetClause = 'insurance_provider = ''CIC Insurance''',
    @Condition = 'policy_number = ''INS-1001''';

-- location table  
EXEC sp_Update 
    @TableName = 'Location',
    @SetClause = 'contact_number = ''+254788888888''',
    @Condition = 'location_name = ''Mombasa Branch''';

-- reservation table 
EXEC sp_Update 
    @TableName = 'Reservation',
    @SetClause = 'return_date = ''2025-10-07''',
    @Condition = 'reservation_id = 1';

-- maintenance table 
EXEC sp_Update 
    @TableName = 'Maintenance',
    @SetClause = 'cost = 220.00',
    @Condition = 'descriptions = ''Battery replacement''';


-- deleting rows 
-- car table removes car whose Id is not a foreign key in other tables
EXEC sp_Delete 
    @TableName = 'Car',
    @Condition = 'car_model = ''Mazda3''';

-- customer table - removes customer whose Id is not a foreign key in other tables
EXEC sp_Delete 
    @TableName = 'Customer',
    @Condition = 'email = ''alice.mwende@email.com''';

-- booking table --still not working
EXEC sp_Delete 
    @TableName = 'Booking',
    @Condition = 'booking_id = 7';

-- payment table -worked
EXEC sp_Delete 
    @TableName = 'Payment',
    @Condition = 'payment_method = ''Cash''';

-- insurance table -worked
EXEC sp_Delete 
    @TableName = 'Insurance',
    @Condition = 'insurance_provider = ''APA Insurance''';

-- location table  -worked
EXEC sp_Delete 
    @TableName = 'Location',
    @Condition = 'location_name = ''Kisumu Branch''';

-- reservation table -worked
EXEC sp_Delete 
    @TableName = 'Reservation',
    @Condition = 'reservation_id = 2';

-- maintenance table -worked
EXEC sp_Delete 
    @TableName = 'Maintenance',
    @Condition = 'descriptions = ''Tire replacement''';

EXEC sp_Insert
    @TableName = 'Booking',
    @Columns = 'car_id, customer_id, rental_start_date, rental_end_date, total_amount',
    @Values = '(1, 2, ''2025-10-20'', ''2025-10-23'', 270.00)';


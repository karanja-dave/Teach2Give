--limiting rows

--load database
use bikestore

--view the productions table
SELECT *FROM production.products

--view the first 3 rows in the table 
SELECT TOP 3 
	product_name, list_price
FROM 
	production.products

--view the last 3 rows
SELECT TOP 3
	product_name, list_price
FROM 
	production.products
ORDER BY 
	product_id DESC;

--including rows that match values with the last row

SELECT TOP 3 WITH TIES
	product_name,list_price
FROM
	production.products
ORDER BY
	list_price DESC;








use bikestore

--skip first 10 rows
SELECT
    product_name,
    list_price
FROM
    production.products
ORDER BY
    list_price,
    product_name 
OFFSET 10 ROWS 

--skip first 10 rows




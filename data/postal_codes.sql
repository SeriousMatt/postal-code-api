DROP DATABASE IF EXISTS postal_codes;
CREATE DATABASE postal_codes;

\c postal_codes;

CREATE TABLE postal_codes(COUNTRY_CODE char(2),
 POSTAL_CODE numeric,
 CITY varchar,
 STATE varchar,
 STATE_CODE varchar,
 COUNTY varchar, 
 COUNTY_CODE varchar, 
 ADMIN_NAME3 varchar,
 ADMIN_CODE3 varchar,  
 LATITUDE numeric, 
 LONGITUDE numeric, 
 ACCURACY numeric);

\copy postal_codes FROM '/Users/matthewreynolds/desktop/Christian-Care-Project/postal-code-api/data/US.csv' WITH CSV;
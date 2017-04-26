# My Real Estate Trademe data

INSERTER

A background process to periodically poll trademe and store data in MySQL dtabase.

These are all repeatable at present and are for dev/test purposes only.

1. Create user and database

mysql -u root -p < create_trademe_db.sql


2. Create lookup data tables

mysql -u trademe_app -p trademe < create_localities_table.sql


3. Create fact table

mysql -u trademe_app -p trademe < create_residential_table.sql

4. Run inserter (Does not get all records yet)



GRAPHS

A http server to process to get data from database and display as web pages.

# My Real Estate Trademe data

## INSERTER

A background process to periodically poll trademe and store data in MySQL dtabase.

These are all repeatable at present and are for dev/test purposes only.

1. Create user and database

```bash
cd inserter
mysql -u root -p < create_trademe_db.sql


2. Create lookup data tables

```bash
mysql -u trademe_app -p trademe < create_localities_table.sql


3. Create fact table

```bash
mysql -u trademe_app -p trademe < create_residential_table.sql

4. Run lookup inserter

```bash
node localities_setup.js

5. Run fact inserter (Does not get all records yet)

```bash
node insert_data.js

For now that should be get enough data to run the web graphs app off.

## WEB GRAPHS

A nodejs express http server to process to get data from database and display as web pages.

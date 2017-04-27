DROP DATABASE IF EXISTS trademe;

DROP USER IF EXISTS 'trademe_app'@'localhost';

CREATE USER 'trademe_app'@'localhost' IDENTIFIED BY 'password'; -- (create secret password)

CREATE DATABASE trademe;

GRANT ALL PRIVILEGES ON trademe.* TO 'trademe_app'@'localhost' WITH GRANT OPTION;

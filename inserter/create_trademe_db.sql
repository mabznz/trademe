CREATE USER 'trademe_app'@'localhost' IDENTIFIED BY 'password'; -- (creeate secret password)

CREATE DATABASE trademe;

GRANT ALL PRIVILEGES ON trademe.* TO 'trademe_app'@'localhost' WITH GRANT OPTION;

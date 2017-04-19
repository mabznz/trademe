SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS localities;

CREATE TABLE
    localities
(
    id INT PRIMARY KEY,
    description VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS districts;

CREATE TABLE
    districts
(
    id INT PRIMARY KEY,
    locality_id INT NOT NULL,
    description VARCHAR(100) NOT NULL,
    FOREIGN KEY (locality_id) REFERENCES localities(id) ON DELETE CASCADE
);

SET FOREIGN_KEY_CHECKS = 1;

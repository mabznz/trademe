SET FOREIGN_KEY_CHECKS = 0;

-- For testing purposes
DROP TABLE IF EXISTS residential;

CREATE TABLE
    residential
(
    listing_id INT PRIMARY KEY,
    district_id INT NOT NULL,
    listing_date DATETIME,
    modify_date TIMESTAMP,
    price INT,
    price_display VARCHAR(100),
    bedrooms VARCHAR(100),
    type VARCHAR(100),
    description VARCHAR(100),
    FOREIGN KEY (district_id) REFERENCES districts(id)
);

SET FOREIGN_KEY_CHECKS = 1;

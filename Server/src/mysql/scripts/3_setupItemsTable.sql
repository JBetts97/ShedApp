CREATE TABLE items (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(40),
    description VARCHAR(120),
    pricePerHour FLOAT,
    pricePerDay FLOAT,
    postcode VARCHAR(40),
    imageURL1 VARCHAR(300),
    imageURL2 VARCHAR(300),
    imageURL3 VARCHAR(300),
    username VARCHAR(30),
    primary key (id)
);
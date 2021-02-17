USE shedapp;
CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(25),
    password VARCHAR(25),
    email VARCHAR(120),
    firstname VARCHAR(25),
    lastname VARCHAR(25),
    primary key (id)
);


CREATE database dbstore;

use dbstore;
DROP TABLE stores;
DROP Table entries;
DROP TABLE users;

CREATE TABLE stores (
    storeId int UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    storeName varchar(255) NOT NULL,
    address text NOT NULL,
    type varchar(255) NOT NULL,
    regDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    uId int UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    storeId int UNSIGNED NOT NULL,
    name varchar(255) NOT NULL,
    userName varchar(255) UNIQUE NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    password text NOT NULL,
    role varchar(255) NOT NULL DEFAULT 'salesman',
    signupDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (storeId) REFERENCES stores(storeId) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE entries (
    entryId int UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    storeId int UNSIGNED NOT NULL,
    uId int UNSIGNED NOT NULL,
    saleAmount double(32, 3) NOT NULL,
    status varchar(255) NOT NULL DEFAULT 'pending',
    entryTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (storeId) REFERENCES stores(storeId) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (uId) REFERENCES users(uId) ON DELETE CASCADE ON UPDATE CASCADE
);


--insertion a store

INSERT INTO stores ( storeName, address, type) VALUES ('Valobasha Cafe', 'Dhanmondi, Dhaka', 'Restrurant');

INSERT INTO entries (storeId, uId, saleAmount) VALUES ('1', '1', '259090');

# Noroff

# Back-end Development Year 1

### Databases - Course Assignment 1 <sup>V4</sup>

# Application Installation and Usage Instructions
To set up this project locally, follow these steps:
npm install
To start the server, run:
npm start
Access the application at http://localhost:3000.

# Environment Variables

DB_NAME
DB_USER
DB_PASS

# Additional Libraries/Packages

"mysql2"
"passport"
"passport-local"
"sequelize"

# NodeJS Version Used

v20.10.0

# DATABASE

CREATE DATABASE IF NOT EXISTS adoptiondb;
USE adoptiondb;

CREATE TABLE IF NOT EXISTS `Users` (
`id` INT AUTO_INCREMENT PRIMARY KEY,
`fullName` VARCHAR(255) NOT NULL,
`username` VARCHAR(255) NOT NULL UNIQUE,
`password` VARCHAR(255) NOT NULL,
`role` ENUM('admin', 'member') NOT NULL,
`createdAt` DATETIME NOT NULL,
`updatedAt` DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `Animals` (
`id` INT AUTO_INCREMENT PRIMARY KEY,
`name` VARCHAR(255) NOT NULL,
`speciesId` INT,
`userId` INT,
`adopted` BOOLEAN DEFAULT false,
`createdAt` DATETIME NOT NULL,
`updatedAt` DATETIME NOT NULL,
FOREIGN KEY (`speciesId`) REFERENCES `Species` (`id`) ON DELETE SET NULL,
FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS `Species` (
`id` INT AUTO_INCREMENT PRIMARY KEY,
`name` VARCHAR(255) NOT NULL UNIQUE,
`createdAt` DATETIME NOT NULL,
`updatedAt` DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `Temperaments` (
`id` INT AUTO_INCREMENT PRIMARY KEY,
`name` VARCHAR(255) NOT NULL UNIQUE,
`createdAt` DATETIME NOT NULL,
`updatedAt` DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `AnimalTemperament` (
`animalId` INT,
`temperamentId` INT,
PRIMARY KEY (`animalId`, `temperamentId`),
FOREIGN KEY (`animalId`) REFERENCES `Animals` (`id`) ON DELETE CASCADE,
FOREIGN KEY (`temperamentId`) REFERENCES `Temperaments` (`id`) ON DELETE CASCADE
);

# DATABASEACCESS

CREATE USER 'dabcaowner'@'localhost' IDENTIFIED BY 'dabca1234';
GRANT ALL PRIVILEGES ON adoptiondb.\* TO 'dabcaowner'@'localhost';
FLUSH PRIVILEGES;

-- phpMyAdmin SQL Dump
-- version 5.2.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 31, 2023 at 03:53 PM
-- Server version: 10.6.12-MariaDB-log
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_booritct`
--

-- --------------------------------------------------------

--
-- Table structure for table `Customers`
--

CREATE TABLE `Customers` (
  `customerID` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phoneNumber` varchar(10) NOT NULL,
  `birthday` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Customers`
--

INSERT INTO `Customers` (`customerID`, `name`, `email`, `phoneNumber`, `birthday`) VALUES
(1, 'John Doe', 'john.doe@example.com', '1234567890', '1980-12-31'),
(2, 'Jane Smith', 'jane.smith@example.com', '0987654321', '1985-01-01'),
(3, 'Alice Johnson', 'alice.johnson@example.com', '1122334455', '1990-06-15'),
(4, 'Bob Williams', 'bob.williams@example.com', '5566778899', '1992-07-20'),
(5, 'Charlie Brown', 'charlie.brown@example.com', '9988776655', '1988-05-25');

-- --------------------------------------------------------

--
-- Table structure for table `Employees`
--

CREATE TABLE `Employees` (
  `employeeID` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `position` varchar(45) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phoneNumber` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Employees`
--

INSERT INTO `Employees` (`employeeID`, `name`, `position`, `email`, `phoneNumber`) VALUES
(1, 'Eve Jackson', 'Manager', 'eve.jackson@example.com', '1231231234'),
(2, 'Tom Miller', 'Sales Associate', 'tom.miller@example.com', '2342342345'),
(3, 'Sarah Davis', 'Cashier', 'sarah.davis@example.com', '3453453456'),
(4, 'Roger Wilson', 'Storekeeper', 'roger.wilson@example.com', '4564564567'),
(5, 'Ann Taylor', 'Sales Associate', 'ann.taylor@example.com', '5675675678');

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `orderID` int(11) NOT NULL,
  `customerID` int(11) DEFAULT NULL,
  `employeeID` int(11) DEFAULT NULL,
  `dateTime` datetime NOT NULL,
  `orderTotal` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`orderID`, `customerID`, `employeeID`, `dateTime`, `orderTotal`) VALUES
(1, 1, 2, '2023-07-15 12:00:00', 7.48),
(2, 2, 3, '2023-07-15 12:30:00', 13.50),
(3, 3, 4, '2023-07-15 13:00:00', 18.95),
(4, 4, 5, '2023-07-15 13:30:00', 20.98),
(5, 5, 1, '2023-07-15 14:00:00', 12.00);

-- --------------------------------------------------------

--
-- Table structure for table `Order_Details`
--

CREATE TABLE `Order_Details` (
  `orderID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `soldQuantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Order_Details`
--

INSERT INTO `Order_Details` (`orderID`, `productID`, `soldQuantity`) VALUES
(1, 1, 2),
(1, 2, 1),
(2, 5, 3),
(3, 1, 4),
(3, 3, 1),
(4, 1, 2),
(4, 4, 2),
(5, 2, 8);

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `productID` int(11) NOT NULL,
  `supplierID` int(11) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `stockQuantity` int(11) NOT NULL,
  `deliveryDate` datetime NOT NULL,
  `description` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`productID`, `supplierID`, `name`, `price`, `stockQuantity`, `deliveryDate`, `description`) VALUES
(1, 1, 'Coffee', 2.99, 300, '2023-07-14 10:00:00', 'Freshly brewed coffee'),
(2, 1, 'Bagel', 1.50, 200, '2023-07-14 10:00:00', 'Freshly baked bagel'),
(3, 2, 'Sandwich', 6.99, 50, '2023-07-14 11:00:00', 'Delicious sandwich'),
(4, 2, 'Salad', 7.50, 75, '2023-07-14 11:00:00', 'Healthy salad'),
(5, 3, 'Cake', 4.50, 15, '2023-07-14 12:00:00', 'Delicious cake');

-- --------------------------------------------------------

--
-- Table structure for table `Suppliers`
--

CREATE TABLE `Suppliers` (
  `supplierID` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phoneNumber` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Suppliers`
--

INSERT INTO `Suppliers` (`supplierID`, `name`, `email`, `phoneNumber`) VALUES
(1, 'Coffee Beans and Bagels Co.', 'info@coffeebeansco.com', '6543210987'),
(2, 'Deli Delights', 'info@delidelights.com', '7654321098'),
(3, 'Baked Goods Inc', 'info@bakedgoodsinc.com', '8765432109');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Customers`
--
ALTER TABLE `Customers`
  ADD PRIMARY KEY (`customerID`);

--
-- Indexes for table `Employees`
--
ALTER TABLE `Employees`
  ADD PRIMARY KEY (`employeeID`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`orderID`),
  ADD KEY `fk_Order_Customer_idx` (`customerID`),
  ADD KEY `fk_Order_Employee1_idx` (`employeeID`);

--
-- Indexes for table `Order_Details`
--
ALTER TABLE `Order_Details`
  ADD KEY `fk_Order_Details_Product1_idx` (`productID`),
  ADD KEY `fk_Order_Details_Order1` (`orderID`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`productID`),
  ADD KEY `fk_Products_Suppliers1_idx` (`supplierID`);

--
-- Indexes for table `Suppliers`
--
ALTER TABLE `Suppliers`
  ADD PRIMARY KEY (`supplierID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Customers`
--
ALTER TABLE `Customers`
  MODIFY `customerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Employees`
--
ALTER TABLE `Employees`
  MODIFY `employeeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `orderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `productID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Suppliers`
--
ALTER TABLE `Suppliers`
  MODIFY `supplierID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `fk_Order_Customer` FOREIGN KEY (`customerID`) REFERENCES `Customers` (`customerID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Order_Employee1` FOREIGN KEY (`employeeID`) REFERENCES `Employees` (`employeeID`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Constraints for table `Order_Details`
--
ALTER TABLE `Order_Details`
  ADD CONSTRAINT `fk_Order_Details_Order1` FOREIGN KEY (`orderID`) REFERENCES `Orders` (`orderID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Order_Details_Product1` FOREIGN KEY (`productID`) REFERENCES `Products` (`productID`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `fk_Products_Suppliers1` FOREIGN KEY (`supplierID`) REFERENCES `Suppliers` (`supplierID`) ON DELETE SET NULL ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: יולי 12, 2021 בזמן 08:04 AM
-- גרסת שרת: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my_todo_list`
--

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `groups`
--

CREATE TABLE `groups` (
  `groupID` int(6) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- הוצאת מידע עבור טבלה `groups`
--

INSERT INTO `groups` (`groupID`) VALUES
(10),
(35),
(36),
(37),
(41);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `membersingroup`
--

CREATE TABLE `membersingroup` (
  `groupID` int(6) UNSIGNED NOT NULL,
  `userID` int(6) UNSIGNED NOT NULL,
  `status` varchar(3) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- הוצאת מידע עבור טבלה `membersingroup`
--

INSERT INTO `membersingroup` (`groupID`, `userID`, `status`) VALUES
(10, 1, 'M'),
(10, 26, 'M'),
(10, 35, 'RQ'),
(10, 36, 'M'),
(10, 37, 'M'),
(10, 38, 'RQ'),
(10, 41, 'RQ'),
(35, 10, 'M'),
(36, 10, 'RQ'),
(36, 14, 'M'),
(37, 10, 'M'),
(37, 41, 'M');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `to_do_list`
--

CREATE TABLE `to_do_list` (
  `toDoId` int(6) UNSIGNED NOT NULL,
  `name` varchar(999) COLLATE utf8_bin NOT NULL,
  `ownerID` int(6) UNSIGNED NOT NULL,
  `isComplete` int(1) NOT NULL DEFAULT 0,
  `DueDate` date NOT NULL,
  `groupID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- הוצאת מידע עבור טבלה `to_do_list`
--

INSERT INTO `to_do_list` (`toDoId`, `name`, `ownerID`, `isComplete`, `DueDate`, `groupID`) VALUES
(15, 'test2', 10, 0, '2023-06-16', 35),
(16, 'test3', 35, 1, '2021-06-29', 35),
(17, 'test4', 35, 0, '2021-06-29', 35),
(23, 'test55', 10, 0, '2500-06-24', 35),
(28, 'toDo4', 36, 0, '2021-06-29', 36),
(31, 'test111', 37, 1, '2021-06-28', 37),
(34, 'toDo23', 1, 0, '2021-06-30', 10),
(35, 'toDo3', 36, 1, '2021-06-30', 10),
(36, 'toDo5', 10, 0, '2021-06-03', 10),
(37, 'toDo1', 10, 1, '2021-07-01', 10),
(38, 'checking', 10, 1, '2500-06-30', 10),
(40, 'working', 10, 0, '2021-07-03', 10),
(43, 'jj', 10, 1, '2021-07-18', 41),
(62, 'test1', 10, 0, '2021-07-18', 41),
(74, 'test111', 37, 0, '2021-07-06', 37),
(75, 'jj', 10, 0, '2021-07-06', 41),
(92, 'work', 10, 0, '2021-07-12', 37),
(93, 'work', 41, 0, '2021-07-12', 37);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `users`
--

CREATE TABLE `users` (
  `userId` int(6) UNSIGNED NOT NULL,
  `mail` varchar(999) COLLATE utf8_bin DEFAULT NULL,
  `userName` varchar(999) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(999) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- הוצאת מידע עבור טבלה `users`
--

INSERT INTO `users` (`userId`, `mail`, `userName`, `password`) VALUES
(1, 'i5up5VkBj7QcqyGP/+2D5A==', 'haim3', 'haim3333'),
(10, '7IUW6bEmhIvzVCeAcwOrPDI4oYyDPs7N/jTxZIQLwcE=', 'David', 'david1234'),
(14, 'UbUfxIeyXeXvzenb15KgjQ==', 'moshe', 'moshe1234'),
(26, '7TQKSBMf7XkKWUBWCsJswg==', 'moti', 'moti5555'),
(35, 'L+bTDrwa8sAJ+uZVCxWczg==', 'amir9', 'amir9999'),
(36, 'LYhEH70iElGkBop4jjIdKw==', 'Dana', 'Dana1234'),
(37, '5JzP2YsPVcfCl9gAvYk+Jr/Wy5znJ0FHPfpm+Y9cqnA=', 'asaf123', '14725836'),
(38, 'DRz0/nkc9jilVF+mGyZeXA==', 'mailer1', 'change236'),
(39, 'm0wzE6kk3vm3+R37vOr/9g==', 'mailer2', 'change123'),
(40, 'TUuklOuAoQEh5j1J0k5aBA==', 'mailer3', 'V25b@5v33'),
(41, 'yIw5/J/jYcLo7EIoSEbmmmVyuKbNYSaeXPTthxJahHQ=', 'tester1', '12345678'),
(42, '8WNVbzlF+PJYSspiWg+ZLw==', 'mailer4', 'Mkg528gf23'),
(43, 'tc4uPQ7bMsDGINankmhtng==', 'david zoro', '12345678'),
(44, '5qgGYaDXu8AMAKcsfhXtWy2noEYCWrvPmuBVMKHGP1M=', 'tester2', '12345678'),
(45, 'So8DIHQm4GfZUjcMpXw2fw==', 'mailer6', '12345678');

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`groupID`);

--
-- אינדקסים לטבלה `membersingroup`
--
ALTER TABLE `membersingroup`
  ADD PRIMARY KEY (`groupID`,`userID`),
  ADD KEY `userID` (`userID`);

--
-- אינדקסים לטבלה `to_do_list`
--
ALTER TABLE `to_do_list`
  ADD PRIMARY KEY (`toDoId`),
  ADD KEY `ownership_todo_fk` (`ownerID`),
  ADD KEY `groupID` (`groupID`);

--
-- אינדקסים לטבלה `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `mail` (`mail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `to_do_list`
--
ALTER TABLE `to_do_list`
  MODIFY `toDoId` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- הגבלות לטבלאות שהוצאו
--

--
-- הגבלות לטבלה `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `group_owner_fk` FOREIGN KEY (`groupID`) REFERENCES `users` (`userId`);

--
-- הגבלות לטבלה `membersingroup`
--
ALTER TABLE `membersingroup`
  ADD CONSTRAINT `g_O_ID_fk` FOREIGN KEY (`groupID`) REFERENCES `groups` (`groupID`) ON DELETE CASCADE,
  ADD CONSTRAINT `membersingroup_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userId`);

--
-- הגבלות לטבלה `to_do_list`
--
ALTER TABLE `to_do_list`
  ADD CONSTRAINT `ownership_todo_fk` FOREIGN KEY (`ownerID`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `to_do_list_ibfk_1` FOREIGN KEY (`groupID`) REFERENCES `groups` (`groupID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

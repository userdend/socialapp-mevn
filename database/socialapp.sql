-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 09, 2022 at 02:54 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `socialapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `post_id` int(4) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `user_img` int(4) NOT NULL,
  `date_comment` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `comment`, `username`, `user_img`, `date_comment`) VALUES
(19, 73, 'declare var, not war', 'hello', 1, '1657354824802'),
(20, 75, 'true != false', 'admin', 2, '1657354967657');

-- --------------------------------------------------------

--
-- Table structure for table `friend_lists`
--

CREATE TABLE `friend_lists` (
  `id` int(4) NOT NULL,
  `user1` varchar(255) NOT NULL,
  `user2` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `friend_lists`
--

INSERT INTO `friend_lists` (`id`, `user1`, `user2`) VALUES
(33, 'admin', 'boyd');

-- --------------------------------------------------------

--
-- Table structure for table `friend_request`
--

CREATE TABLE `friend_request` (
  `id` int(4) NOT NULL,
  `request_by` varchar(255) NOT NULL,
  `request_to` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `friend_request`
--

INSERT INTO `friend_request` (`id`, `request_by`, `request_to`) VALUES
(100, 'lorem', 'admin'),
(103, 'admin', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(4) NOT NULL,
  `user_img` int(4) NOT NULL,
  `username` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `date_posted` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_img`, `username`, `content`, `date_posted`) VALUES
(73, 2, 'admin', 'hello world!', '1657354143643'),
(75, 4, 'boyd', 'true = !false', '1657354777385');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(4) NOT NULL,
  `user_img` int(4) NOT NULL,
  `username` varchar(12) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_img`, `username`, `password`) VALUES
(33, 2, 'admin', '$2b$10$OwgfV.7AIPz8nEbXsOzDFOSdUROFJN8CiSG0qY2qujreSk1oHRUi2'),
(34, 1, 'hello', '$2b$10$4s2588Y/UAnEWdzIh9/Pl.05.0ZG08sroCfZZ3yFsaFLITD2qfory'),
(35, 4, 'boyd', '$2b$10$ngMABs4PpgjzBV9MVEwOae.Y1F08c/wEpKWRAD0/CGFM08NrXK4SC'),
(38, 0, 'lorem', '$2b$10$juI2v63IILyeFj02HBVs8OlW3RoTxVQpM275HPM9cHHlZx5thX8xW'),
(39, 0, 'user', '$2b$10$sqkY3HnLtGUteqJjTeA23OAsdlVWrK6N4qcdVsmccDaH0svPY2b52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friend_lists`
--
ALTER TABLE `friend_lists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friend_request`
--
ALTER TABLE `friend_request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `friend_lists`
--
ALTER TABLE `friend_lists`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `friend_request`
--
ALTER TABLE `friend_request`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

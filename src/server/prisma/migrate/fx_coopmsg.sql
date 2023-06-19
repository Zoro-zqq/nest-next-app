/*
Navicat MariaDB Data Transfer

Source Server         : localhost
Source Server Version : 100313
Source Host           : localhost:3306
Source Database       : fxtest

Target Server Type    : MariaDB
Target Server Version : 100313
File Encoding         : 65001

Date: 2021-06-08 15:53:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for fx_coopmsg
-- ----------------------------
DROP TABLE IF EXISTS `fx_coopmsg`;
CREATE TABLE `fx_coopmsg` (
  `MsgID` varchar(255) NOT NULL,
  `CoopID` varchar(255) NOT NULL,
  `Sender` varchar(255) DEFAULT NULL,
  `MsgType` varchar(255) DEFAULT '',
  `MsgTopic` varchar(255) DEFAULT '',
  `MsgTime` datetime DEFAULT NULL,
  `MsgContent` text DEFAULT NULL,
  PRIMARY KEY (`MsgID`),
  FOREIGN KEY (CoopID) REFERENCES fx_coop(CoopID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'text',
    `size` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
FOREIGN KEY (`userId`) REFERENCES `User`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


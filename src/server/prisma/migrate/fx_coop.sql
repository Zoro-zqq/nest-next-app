/*
Navicat MariaDB Data Transfer

Source Server         : localhost
Source Server Version : 100313
Source Host           : localhost:3306
Source Database       : fxtest

Target Server Type    : MariaDB
Target Server Version : 100313
File Encoding         : 65001

Date: 2021-06-08 15:53:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for fx_coop
-- ----------------------------
DROP TABLE IF EXISTS `fx_coop`;
CREATE TABLE `fx_coop` (
  `CoopID` varchar(50) NOT NULL,
  `Name` varchar(50) DEFAULT '',
  `CoopType` varchar(50) DEFAULT '',
  `WorkDeadline` datetime DEFAULT NULL ,
  `WorkStartTime` datetime DEFAULT NULL,
  `WorkNode` varchar(50) DEFAULT '',
  `CreateDt` datetime DEFAULT NULL,
  `CreateUserID` varchar(50) DEFAULT NULL,
  `LastUpdateDt` datetime DEFAULT NULL,
  `CurBAID` varchar(50) DEFAULT '',
  `PrevBAID` varchar(50) DEFAULT NULL,
  `BackBAID` varchar(50) DEFAULT NULL,
  `Descript` varchar(255) DEFAULT '',
  `CoopStatus` varchar(50) DEFAULT NULL,
  `LastMsg` text DEFAULT NULL,
  PRIMARY KEY (`CoopID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

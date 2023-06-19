/*
Navicat MariaDB Data Transfer

Source Server         : localhost
Source Server Version : 100313
Source Host           : localhost:3306
Source Database       : fxtest

Target Server Type    : MariaDB
Target Server Version : 100313
File Encoding         : 65001

Date: 2021-06-08 15:53:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for fx_coopuser
-- ----------------------------
DROP TABLE IF EXISTS `fx_coopuser`;
CREATE TABLE `fx_coopuser` (
  `ID` varchar(50) NOT NULL,
  `CoopID` varchar(255) NOT NULL,
  `UserID` varchar(255) DEFAULT '',
  `WorkRoles` varchar(255) DEFAULT '',
  `Remark` text DEFAULT NULL,
  `ReadState` int(10) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID`),
  FOREIGN KEY (CoopID) REFERENCES fx_coop(CoopID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


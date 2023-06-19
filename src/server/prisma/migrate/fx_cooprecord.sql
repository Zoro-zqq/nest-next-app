/*
Navicat MariaDB Data Transfer

Source Server         : localhost
Source Server Version : 100313
Source Host           : localhost:3306
Source Database       : fxtest

Target Server Type    : MariaDB
Target Server Version : 100313
File Encoding         : 65001

Date: 2021-06-08 15:53:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for fx_cooprecord
-- ----------------------------
DROP TABLE IF EXISTS `fx_cooprecord`;
CREATE TABLE `fx_cooprecord` (
  `ID` varchar(50) NOT NULL,
  `BAID` varchar(50) NOT NULL,
  `BackBAID` varchar(50) DEFAULT NULL,
  `PrevBAID` varchar(50) DEFAULT '',
  `CoopID` varchar(50) DEFAULT NULL,
  `WorkNode` varchar(255) DEFAULT '',
  `WorkDeadline` datetime DEFAULT NULL,
  `WorkStartTime` datetime DEFAULT NULL,
  `Descript` text DEFAULT NULL,
  `UserIDs` varchar(255) DEFAULT NULL,
  `UserRoles` varchar(255) DEFAULT '',
  `Remarks` text DEFAULT NULL,
  `Sender` varchar(50) DEFAULT NULL,
  `SnapTime` datetime DEFAULT NULL,
  `SnapAction` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  FOREIGN KEY (CoopID) REFERENCES fx_coop(CoopID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

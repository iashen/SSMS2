/*
Navicat MySQL Data Transfer

Source Server         : MyConnection
Source Server Version : 50617
Source Host           : 127.0.0.1:3306
Source Database       : ssms

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2016-06-26 14:32:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `CID` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(100) DEFAULT NULL,
  `preName` varchar(50) DEFAULT NULL,
  `mobile` varchar(11) DEFAULT NULL,
  `telephone` varchar(11) DEFAULT NULL,
  `emergencyNumber` varchar(11) DEFAULT NULL,
  `Address` varchar(200) DEFAULT NULL,
  `type` enum('online','offline','both') DEFAULT 'offline',
  `deleted` int(2) DEFAULT '0',
  PRIMARY KEY (`CID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of customer
-- ----------------------------

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `PID` int(11) NOT NULL AUTO_INCREMENT,
  `productName` varchar(255) DEFAULT NULL,
  `productDescription` longtext,
  `techSpec` varchar(255) DEFAULT NULL,
  `category` int(255) DEFAULT NULL,
  `deleted` int(2) DEFAULT '0',
  PRIMARY KEY (`PID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('1', 'Caltex SAE40', null, 'SAE40', '1', '0');
INSERT INTO `product` VALUES ('2', 'Caltex SAE90', null, 'SAE90', '1', '0');
INSERT INTO `product` VALUES ('3', 'Air Freshner', null, null, '2', '0');
INSERT INTO `product` VALUES ('4', 'Windscreen Washer Liquid', null, null, '3', '0');

-- ----------------------------
-- Table structure for product_category
-- ----------------------------
DROP TABLE IF EXISTS `product_category`;
CREATE TABLE `product_category` (
  `PCID` int(11) NOT NULL AUTO_INCREMENT,
  `product_category_name` varchar(255) DEFAULT NULL,
  `deleted` int(2) DEFAULT '0',
  PRIMARY KEY (`PCID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of product_category
-- ----------------------------
INSERT INTO `product_category` VALUES ('1', 'Lubricant', '0');
INSERT INTO `product_category` VALUES ('2', 'Accessories', '0');
INSERT INTO `product_category` VALUES ('3', 'Washing', '0');
INSERT INTO `product_category` VALUES ('4', 'Engine Oil', '0');
INSERT INTO `product_category` VALUES ('6', 'Brake Oil', '0');
INSERT INTO `product_category` VALUES ('7', 'Coolent', '0');

-- ----------------------------
-- Table structure for service
-- ----------------------------
DROP TABLE IF EXISTS `service`;
CREATE TABLE `service` (
  `SID` int(11) NOT NULL AUTO_INCREMENT,
  `serviceName` varchar(255) DEFAULT NULL,
  `serviceDescription` varchar(255) DEFAULT NULL,
  `category` int(255) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `deleted` int(2) DEFAULT '2',
  PRIMARY KEY (`SID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of service
-- ----------------------------

-- ----------------------------
-- Table structure for service_category
-- ----------------------------
DROP TABLE IF EXISTS `service_category`;
CREATE TABLE `service_category` (
  `SCID` int(11) NOT NULL AUTO_INCREMENT,
  `service_category_name` varchar(255) DEFAULT NULL,
  `deleted` int(2) DEFAULT '0',
  PRIMARY KEY (`SCID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of service_category
-- ----------------------------
INSERT INTO `service_category` VALUES ('1', 'full', '0');
INSERT INTO `service_category` VALUES ('2', 'half', '0');

-- ----------------------------
-- Table structure for vehicle
-- ----------------------------
DROP TABLE IF EXISTS `vehicle`;
CREATE TABLE `vehicle` (
  `VID` int(11) NOT NULL AUTO_INCREMENT,
  `make` varchar(30) DEFAULT NULL,
  `model` varchar(20) DEFAULT NULL,
  `YOM` varchar(4) DEFAULT NULL,
  `type` varchar(15) DEFAULT NULL,
  `dateRegistered` date DEFAULT NULL,
  `delete` int(2) DEFAULT '0',
  PRIMARY KEY (`VID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of vehicle
-- ----------------------------

-- ----------------------------
-- Table structure for vehicle_category
-- ----------------------------
DROP TABLE IF EXISTS `vehicle_category`;
CREATE TABLE `vehicle_category` (
  `VCID` int(11) NOT NULL AUTO_INCREMENT,
  `vehicle_category_name` varchar(255) DEFAULT NULL,
  `deleted` int(2) DEFAULT '0',
  PRIMARY KEY (`VCID`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of vehicle_category
-- ----------------------------
INSERT INTO `vehicle_category` VALUES ('1', 'car', '0');
INSERT INTO `vehicle_category` VALUES ('2', 'van', '0');
INSERT INTO `vehicle_category` VALUES ('3', 'bus', '0');
INSERT INTO `vehicle_category` VALUES ('4', 'lorry', '0');
INSERT INTO `vehicle_category` VALUES ('5', 'suv', '0');
INSERT INTO `vehicle_category` VALUES ('6', 'bike', '0');
INSERT INTO `vehicle_category` VALUES ('7', 'three weeler', '0');
INSERT INTO `vehicle_category` VALUES ('8', 'bicycle', '0');
INSERT INTO `vehicle_category` VALUES ('9', 'other', '0');
INSERT INTO `vehicle_category` VALUES ('10', 'other', '0');
INSERT INTO `vehicle_category` VALUES ('11', 'other', '0');
INSERT INTO `vehicle_category` VALUES ('12', 'other', '0');
INSERT INTO `vehicle_category` VALUES ('13', 'other', '0');
INSERT INTO `vehicle_category` VALUES ('14', '', '0');
INSERT INTO `vehicle_category` VALUES ('15', 'hhvnb', '0');
INSERT INTO `vehicle_category` VALUES ('16', 'other', '0');
INSERT INTO `vehicle_category` VALUES ('17', 'hhvn', '0');
INSERT INTO `vehicle_category` VALUES ('18', 'other', '0');
INSERT INTO `vehicle_category` VALUES ('19', 'other', '0');
INSERT INTO `vehicle_category` VALUES ('20', 'ggg', '0');
INSERT INTO `vehicle_category` VALUES ('21', 'czxcxz', '0');
INSERT INTO `vehicle_category` VALUES ('22', 'other', '0');
INSERT INTO `vehicle_category` VALUES ('23', 'other', '0');
INSERT INTO `vehicle_category` VALUES ('24', 'jeep', '0');
INSERT INTO `vehicle_category` VALUES ('25', 'buddy', '0');
INSERT INTO `vehicle_category` VALUES ('26', 'abc', '0');
INSERT INTO `vehicle_category` VALUES ('27', 'ddghg', '0');
INSERT INTO `vehicle_category` VALUES ('28', 'hnfnfn', '0');
INSERT INTO `vehicle_category` VALUES ('29', 'hshdh', '0');
INSERT INTO `vehicle_category` VALUES ('30', 'ghghghgh', '0');
INSERT INTO `vehicle_category` VALUES ('31', 'thdthth', '0');
INSERT INTO `vehicle_category` VALUES ('32', 'fgdgdf', '0');
INSERT INTO `vehicle_category` VALUES ('33', 'hhdjfsjfh', '0');
INSERT INTO `vehicle_category` VALUES ('34', 'jjjgvj', '0');
INSERT INTO `vehicle_category` VALUES ('35', 'ghdfgh', '0');
INSERT INTO `vehicle_category` VALUES ('36', 'car', '0');
INSERT INTO `vehicle_category` VALUES ('37', 'hjgj', '0');
INSERT INTO `vehicle_category` VALUES ('38', 'fgfg', '0');
INSERT INTO `vehicle_category` VALUES ('39', 'dfsf', '0');
INSERT INTO `vehicle_category` VALUES ('40', 'hhgkhgh', '0');
INSERT INTO `vehicle_category` VALUES ('41', 'khgjgj', '0');
INSERT INTO `vehicle_category` VALUES ('42', 'rrrrrrrrrwt', '0');
INSERT INTO `vehicle_category` VALUES ('43', 'car', '0');
INSERT INTO `vehicle_category` VALUES ('44', 'vanfghghg', '0');
INSERT INTO `vehicle_category` VALUES ('45', 'ggtgt', '0');
INSERT INTO `vehicle_category` VALUES ('46', 'threeweel', '0');
INSERT INTO `vehicle_category` VALUES ('47', 'hhhgu', '0');
INSERT INTO `vehicle_category` VALUES ('48', 'other', '0');
INSERT INTO `vehicle_category` VALUES ('49', 'vam', '0');
INSERT INTO `vehicle_category` VALUES ('50', 'jkhghj', '0');
INSERT INTO `vehicle_category` VALUES ('51', 'bhfvfvkj', '0');
INSERT INTO `vehicle_category` VALUES ('52', 'car', '0');
INSERT INTO `vehicle_category` VALUES ('53', 'car', '0');
INSERT INTO `vehicle_category` VALUES ('54', 'car', '0');
INSERT INTO `vehicle_category` VALUES ('55', 'car', '0');
INSERT INTO `vehicle_category` VALUES ('56', 'gjhgjgkjj', '0');
INSERT INTO `vehicle_category` VALUES ('57', 'hdrt', '0');
INSERT INTO `vehicle_category` VALUES ('58', 'jhkgtyf', '0');
INSERT INTO `vehicle_category` VALUES ('59', 'abcdefg', '0');
INSERT INTO `vehicle_category` VALUES ('60', 'dvvfvf', '0');
INSERT INTO `vehicle_category` VALUES ('61', '213216', '0');
INSERT INTO `vehicle_category` VALUES ('62', 'car', '0');

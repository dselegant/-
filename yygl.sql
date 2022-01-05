/*
Navicat MySQL Data Transfer

Source Server         : DS
Source Server Version : 50722
Source Host           : localhost:3306
Source Database       : yygl

Target Server Type    : MYSQL
Target Server Version : 50722
File Encoding         : 65001

Date: 2021-05-29 18:14:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for authority
-- ----------------------------
DROP TABLE IF EXISTS `authority`;
CREATE TABLE `authority` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `authname` varchar(255) DEFAULT NULL,
  `authurl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of authority
-- ----------------------------
INSERT INTO `authority` VALUES ('1', '用户管理', '/admin/user/userlist');
INSERT INTO `authority` VALUES ('2', '权限管理', '/admin/user/authority');
INSERT INTO `authority` VALUES ('3', '角色管理', '/admin/user/rolelist');
INSERT INTO `authority` VALUES ('4', '新闻管理', '/admin/news');
INSERT INTO `authority` VALUES ('5', '医生', '/admin/doctors');
INSERT INTO `authority` VALUES ('6', '病人', '/admin/patients');

-- ----------------------------
-- Table structure for auth_role
-- ----------------------------
DROP TABLE IF EXISTS `auth_role`;
CREATE TABLE `auth_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleid` int(11) DEFAULT NULL,
  `authid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_role
-- ----------------------------
INSERT INTO `auth_role` VALUES ('5', '5', '1');
INSERT INTO `auth_role` VALUES ('6', '5', '2');
INSERT INTO `auth_role` VALUES ('7', '5', '3');
INSERT INTO `auth_role` VALUES ('8', '5', '4');
INSERT INTO `auth_role` VALUES ('9', '5', '5');
INSERT INTO `auth_role` VALUES ('10', '5', '6');
INSERT INTO `auth_role` VALUES ('11', '3', '6');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rolename` varchar(255) DEFAULT NULL,
  `brief` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('2', '医生', '可以看到患者的挂号信息');
INSERT INTO `role` VALUES ('3', '患者', '可以看到患者自身的挂号信息');
INSERT INTO `role` VALUES ('5', '超级管理员', '拥有所有权限');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `imgheader` varchar(255) DEFAULT NULL,
  `roleid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('4', 'DS123456', 'b41989bb55b7d55af0be2b064ac705cf', '123456@qq.com', '1973661973660', '/images/e28ca4238c35da9e19802330dd4bd72eDS1.jpg', '5');
INSERT INTO `user` VALUES ('5', 'DS123456789', '197366', 'DS12345678', '12345678998', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2151136234,3513236673&fm=26&gp=0.jpg', '3');
INSERT INTO `user` VALUES ('6', '123', null, '1799661448@qq.com', '16670321989', '/images/e164354894c651e73f1736af3d7f8751QQ图片20200812190806.jpg', '3');
INSERT INTO `user` VALUES ('8', '234', null, 'dsadas@qq.com', '16670321988', '/images/ed4a0bc57122c965732e6d574e28bd37logo2.png', '3');
INSERT INTO `user` VALUES ('9', '3435', null, null, null, null, '2');
INSERT INTO `user` VALUES ('10', '354345', null, null, null, null, '2');
INSERT INTO `user` VALUES ('11', '345345', null, null, null, null, '2');
INSERT INTO `user` VALUES ('12', '45345', null, null, null, null, '2');
INSERT INTO `user` VALUES ('13', '435453', null, null, null, null, '2');
INSERT INTO `user` VALUES ('14', null, '4d9b1bbefbbe1473499bbe35ed16cd7c', null, null, null, null);
INSERT INTO `user` VALUES ('15', null, '4d9b1bbefbbe1473499bbe35ed16cd7c', null, null, null, null);
INSERT INTO `user` VALUES ('16', null, '4d9b1bbefbbe1473499bbe35ed16cd7c', null, null, null, null);
INSERT INTO `user` VALUES ('17', null, '4d9b1bbefbbe1473499bbe35ed16cd7c', null, null, null, null);
INSERT INTO `user` VALUES ('18', null, '4d9b1bbefbbe1473499bbe35ed16cd7c', null, null, null, null);
INSERT INTO `user` VALUES ('19', 'DS12345678', 'b41989bb55b7d55af0be2b064ac705cf', '1799661558@qq.com', '12345678998', null, '3');

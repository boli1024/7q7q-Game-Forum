-- MySQL dump 10.13  Distrib 5.6.39, for Win64 (x86_64)
--
-- Host: localhost    Database: 7q7q
-- ------------------------------------------------------
-- Server version	5.6.39-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(100) NOT NULL,
  `replyTime` datetime NOT NULL,
  `userId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`),
  CONSTRAINT `cf1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cf2` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'你好，，，。','2018-10-21 00:00:00',1,1),(2,'你好，，，。','2018-10-21 00:00:00',1,2),(3,'你好，，，。','2018-10-21 00:00:00',1,3),(4,'你好，，，。','2018-10-21 00:00:00',1,4),(5,'你好，，，。','2018-10-21 00:00:00',1,5),(6,'你好....。','2018-10-22 00:00:00',1,1),(7,'测试回复1','2018-11-29 14:52:27',3,1),(8,'测试回复1','2018-11-29 14:52:58',3,1),(9,'heelo','2018-11-30 03:50:17',1,10),(10,'测试一下回复aaaaaaaaaaaaaaaaaaaaaaaa','2018-11-30 03:51:29',1,10),(11,'再试一下回复','2018-11-30 04:00:42',1,9),(12,'很帅气啊','2018-12-01 13:45:01',2,13),(13,'我后伟后悔爱仕达大无','2018-12-01 14:00:07',2,14),(14,'....','2018-12-02 10:17:50',28,16),(15,'我觉得也行','2018-12-02 10:17:59',28,16),(17,'AAA','2018-12-12 06:29:14',29,16),(18,'回复测试','2018-12-12 11:13:36',2,19),(19,'硕士生','2018-12-15 09:18:53',2,19);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `introduction` varchar(100) NOT NULL,
  `inputTime` datetime NOT NULL,
  `source` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,'高达机器人大战','高达机器人大战是一款横版射击游戏。','2018-10-20 18:45:30','HTML 游戏素材网'),(2,'益智水管工','益智水管工是一款休闲游戏。','2018-10-21 18:45:00','HTML 游戏素材网'),(5,'1','1','2018-12-15 10:09:45','1'),(6,'2','2','2018-12-15 10:23:55','2'),(7,'3','3','2018-12-15 10:24:45','3');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lable`
--

DROP TABLE IF EXISTS `lable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lable` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lable` varchar(20) NOT NULL,
  `introduction` varchar(300) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lable` (`lable`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lable`
--

LOCK TABLES `lable` WRITE;
/*!40000 ALTER TABLE `lable` DISABLE KEYS */;
INSERT INTO `lable` VALUES (1,'高达机器人','这是高达机器人大战的标签'),(2,'益智水管工','这是益智水管工的标签'),(3,'斗兽棋','这是斗兽棋的标签'),(4,'堆木头','这是堆木头的标签'),(5,'休闲灌水','这是休闲灌水的标签'),(6,'游戏讨论','这是游戏讨论的标签');
/*!40000 ALTER TABLE `lable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `summary` varchar(50) DEFAULT NULL,
  `content` text NOT NULL,
  `createTime` datetime NOT NULL,
  `userId` int(11) NOT NULL,
  `lableId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `lableId` (`lableId`),
  CONSTRAINT `F1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `F2` FOREIGN KEY (`lableId`) REFERENCES `lable` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'1号帖子','1号帖子总结','1号帖子内容','2018-10-20 00:00:00',1,1),(2,'2号帖子','2号帖子总结','2号帖子内容','2018-10-21 00:00:00',2,2),(3,'3号帖子','3号帖子总结','3号帖子内容','2018-10-22 00:00:00',3,3),(4,'4号帖子','4号帖子总结','4号帖子内容','2018-10-23 00:00:00',4,4),(5,'5号帖子','5号帖子总结','5号帖子内容','2018-10-24 00:00:00',5,5),(6,'','','','2018-11-29 08:01:38',27,1),(7,'测试帖子发布','测试帖子发布','阿诗丹顿多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多','2018-11-29 08:02:10',27,2),(8,'测试帖子发布','测试帖子发布','阿诗丹顿多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多','2018-11-29 08:02:18',27,3),(9,'测试帖','123123','123123123123123','2018-11-29 08:43:00',1,1),(10,'测试一下','测试一下','啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊','2018-11-29 13:58:48',1,3),(11,'ueditor测试','ueditor','<h1 style=\"font-size: 32px; font-weight: bold; border-bottom: 2px solid rgb(204, 204, 204); padding: 0px 4px 0px 0px; text-align: center; margin: 0px 0px 20px;\">按我的无<br/></h1><p><img src=\"http://img.baidu.com/hi/jx2/j_0014.gif\"/></p>','2018-12-01 13:16:41',1,2),(12,'ueditor测试2','ueditor','<h1>阿迪王大无多<br/></h1><p><img src=\"http://img.baidu.com/hi/jx2/j_0004.gif\"/></p><p><img src=\"/ueditor/jsp/upload/image/20181201/1543671558555003123.jpg\" title=\"1543671558555003123.jpg\" alt=\"talk3.jpg\"/></p>','2018-12-01 13:39:25',2,4),(13,'ueditor测试3','ueditor','<p><img src=\"http://img.baidu.com/hi/babycat/C_0007.gif\"/></p><h1 style=\"font-size: 32px; font-weight: bold; border-bottom: 2px solid rgb(204, 204, 204); padding: 0px 4px 0px 0px; text-align: center; margin: 0px 0px 20px;\">粉色风飞沙<br/></h1><pre class=\"brush:cpp;toolbar:false\">let&nbsp;me&nbsp;see&nbsp;c&nbsp;code;\r\n#include&nbsp;&lt;stdio.h&gt;\r\nmain(){\r\npeint(&quot;123&quot;);\r\n}</pre><p><img src=\"/ueditor/jsp/upload/image/20181201/1543671842756002897.jpg\" title=\"1543671842756002897.jpg\" alt=\"game login.jpg\"/></p>','2018-12-01 13:44:07',2,3),(14,'ueditor测试4','ueditor','<h1 style=\"font-size: 32px; font-weight: bold; border-bottom: 2px solid rgb(204, 204, 204); padding: 0px 4px 0px 0px; text-align: center; margin: 0px 0px 20px;\"><img src=\"/ueditor/jsp/upload/image/20181201/1543672286092053886.jpg\" title=\"1543672286092053886.jpg\" alt=\"game login.jpg\" width=\"909\" height=\"380\"/></h1><p>改价格已经<br/></p><p><img src=\"http://img.baidu.com/hi/tsj/t_0005.gif\"/></p>','2018-12-01 13:52:44',2,2),(15,'ueditor测试','ueditor','<p><img src=\"/ueditor/jsp/upload/image/20181201/1543673103302066822.jpg\" title=\"1543673103302066822.jpg\" alt=\"game login.jpg\"/></p><p>μ<img src=\"/ueditor/jsp/upload/image/20181201/1543673114498013227.jpg\" title=\"1543673114498013227.jpg\" alt=\"talk4.jpg\"/></p><p><br/></p><p><img src=\"http://img.baidu.com/hi/jx2/j_0013.gif\"/><img src=\"http://img.baidu.com/hi/jx2/j_0024.gif\"/></p>','2018-12-01 14:05:24',2,1),(16,'殴打崔平征集','测试帖子发布','<p><img src=\"http://img.baidu.com/hi/jx2/j_0027.gif\"/>&nbsp;&nbsp;</p>','2018-12-02 10:17:41',28,1),(19,'张三发帖','test','<h1 style=\"margin: 0px 0px 20px; padding: 0px 4px 0px 0px; text-align: center; font-size: 32px; font-weight: bold; border-bottom-color: rgb(204, 204, 204); border-bottom-width: 2px; border-bottom-style: solid;\">阿三打扫</h1><p><br/></p><p><img src=\"http://img.baidu.com/hi/jx2/j_0007.gif\"/></p><p></p>','2018-12-12 11:13:26',2,5);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `email` varchar(20) DEFAULT NULL,
  `password` varchar(20) NOT NULL,
  `introduction` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'白伟伟','123@qq.com','123456','我叫白伟伟，我很帅啊！！！000，11111'),(2,'张三','222@qq.com','123456','我叫张三'),(3,'李四','333@qq.com','123456','我叫李四'),(4,'王五','444@qq.com','123456','我叫王五'),(5,'赵六','555@qq.com','123456','我叫赵六'),(22,'test','test@qq.com','test','无简介'),(23,'test2','test2@qq.com','test2','无简介'),(24,'test3','test3@qq.com','test3','无简介'),(25,'test4','test4@qq.com','test4','无简介'),(26,'test5','test5@qq.com','test5','无简介'),(27,'测试人员','testpeople@qq.com','123','无简介'),(28,'二虎','222222@163.com','222222','无简介'),(29,'CP','1021545706@QQ.COM','123','无简介'),(30,'test9','9','123','99999'),(33,'test10','10','123','1010101010');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-19 18:41:12

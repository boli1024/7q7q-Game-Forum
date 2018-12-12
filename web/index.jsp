<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1 , user-scalable=no">
  <link rel="icon" type="image/x-icon" href="static/images/game-icon.jpg">
  <title>7Q7Q游戏论坛</title>
  <link rel="stylesheet" href="static/css/bootstrap.css" />
  <link rel="stylesheet" href="static/css/index.css">
  <link rel="stylesheet" href="static/css/style.css">
  <link rel="stylesheet" href="static/css/navbar.css">

  <%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
  <%@ taglib  uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
  <%@taglib uri="/eltag" prefix="el"%>

</head>
<body>

<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container">
    <div class="navbar-header">
      <div class="navbar-brand">7Q7Q游戏论坛</div>
    </div>
    <div class="navbar-collapse collapse">
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#home" class="current">首页</a></li>
        <li><a href="#game">游戏</a></li>
        <li><a>简介</a></li>
        <li><a href="/postDetail?page=1">论坛</a></li>

        <c:if test="${loginResult.getBoolResult()}">
          <li><a>你好，<span style="color: #05ace0">${username}</span></a></li>
          <li><a href="/logout">注销</a></li>
        </c:if>
        <c:if test="${!loginResult.getBoolResult()}">
          <li><a href="jsp/login.jsp">登录</a></li>
          <li><a href="jsp/register.jsp">注册</a></li>
        </c:if>
        
      </ul>
    </div>
  </div>
</nav>

<section id="home">
  <div class="lvjing">
    <div class="container">
      <div class="col-md-12">
        <h1>7Q7Q等你来战！！！</h1>
        <img class="img-responsive" src="static/images/game2.jpg" alt="game">
      </div>
    </div>
  </div>
</section>

<section id="game">
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <img class="img-responsive img-circle" src="static/images/game/game1.jpg" alt="game-1">
        <h3>高达机器人大战</h3>
        <button class="btn btn-danger" onclick="window.open('games/robot/game.htm')">开始</button>
        <button class="btn btn-success">简介</button>
      </div>
      <div class="col-md-3">
        <img class="img-responsive img-circle" src="static/images/game/game2.jpg" alt="game-2">
        <h3>益智水管工</h3>
        <button class="btn btn-danger" onclick="window.open('games/plumber/index.htm')">开始</button>
        <button class="btn btn-success">简介</button>
      </div>
      <div class="col-md-3">
        <img class="img-responsive img-circle" src="static/images/game/game3.jpg" alt="game-3">
        <h3>斗兽棋</h3>
        <button class="btn btn-danger" onclick="window.open('games/animalChess/index.html')">开始</button>
        <button class="btn btn-success">简介</button>
      </div>
      <div class="col-md-3">
        <img class="img-responsive img-circle" src="static/images/game/game4.jpg" alt="game-4" style="height: 262px">
        <h3>堆木头</h3>
        <button class="btn btn-danger" onclick="window.open('games/wood/index.html')">开始</button>
        <button class="btn btn-success">简介</button>
      </div>
    </div>

  </div>
</section>

</body>
<script src="static/js/jquery-3.3.1.min.js"></script>
<script src="static/js/bootstrap.min.js"></script>
</html>

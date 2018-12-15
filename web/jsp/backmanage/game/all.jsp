<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1 , user-scalable=no">
    <link rel="icon" type="image/x-icon" href="../../../static/images/game-icon.jpg">
    <title>后台管理页面</title>
    <link rel="stylesheet" href="../../../static/css/bootstrap.css" />
    <link rel="stylesheet" href="../../../static/css/backmanage.css">
    <link rel="stylesheet" href="../../../static/css/style.css">

    <%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
    <%@ taglib  uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <% String serverPath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+"/"; %>

</head>
<body>
<nav class="navbar navbar-default">
    <div class="container">
        <div class="navbar-header">
            <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand">后台管理系统</a>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-left">
                <li><a href="/userAll">用户管理</a></li>
                <li><a href="" class="current">游戏简介管理</a></li>
                <li><a href="/postAll">帖子管理</a></li>
                <li><a href="/commentAll">评论管理</a></li>
            </ul>
        </div>
    </div>
</nav>
<div class="container">
    <div class="col-md-12">
        <div class="page-header">游戏简介管理</div>
        <ul class="nav nav-tabs">
            <li class="active"><a href="">游戏列表</a></li>
        </ul>
        <table class="table">
            <thead>
            <tr>
                <th>ID</th>
                <th>游戏名称</th>
                <th>游戏简介</th>
                <th>录入时间</th>
                <th>来源</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <c:forEach items="${game.getData()}" var="row">
                <tr>
                    <th scope="row">${row[0]}</th>
                    <td>${row[1]}</td>
                    <td>${row[2]}</td>
                    <td>${row[3]}</td>
                    <td>${row[4]}</td>
                    <td>
                        <div role="presentation" class="dropdown">
                            <button class="btn btn-default dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                操作<span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a href="<%=serverPath%>gameUpdate?id=${row[0]}">修改简介</a></li>
                                <li><a href="<%=serverPath%>gameDelete?id=${row[0]}">删除帖子</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
        <c:if test="${deleteGameResult.getBoolResult()}">
            <div class="alert alert-success">游戏简介删除成功</div>
            <div class="alert alert-info">
                <a class="alert-link" href="/gameAll">刷新游戏简介列表</a>
            </div>
        </c:if>
        <c:if test="${deleteGameResult.getBoolResult() != null && !deleteGameResult.getBoolResult()}">
            <div class="alert alert-danger">游戏简介删除失败</div>
            <c:if test="${deleteGameResult.getStringResult() != null}">
                <div class="alert alert-danger">${deleteGameResult.getStringResult()}</div>
            </c:if>
            <div class="alert alert-info">
                <a class="alert-link" href="/gameAll">刷新游戏简介列表</a>
            </div>
        </c:if>
        <ul class="pagination pagination-lg">
            <li><a href="<%=serverPath%>gameAll?page=${currentGamePage - 1}">&laquo;</a></li>
            <c:forEach var="page" begin="1" end="${game.getPageNumberMax()}">
                <c:if test="${page == currentGamePage}">
                    <li class="active"><a href="<%=serverPath%>gameAll?page=${page}">${page}</a></li>
                </c:if>
                <c:if test="${page != currentGamePage}">
                    <li><a href="<%=serverPath%>gameAll?page=${page}">${page}</a></li>
                </c:if>
            </c:forEach>
            <li><a href="<%=serverPath%>gameAll?page=${currentGamePage + 1}">&raquo;</a></li>
        </ul>
    </div>
</div>
</body>
<script src="../../../static/js/jquery-3.3.1.min.js"></script>
<script src="../../../static/js/bootstrap.min.js"></script>
</html>
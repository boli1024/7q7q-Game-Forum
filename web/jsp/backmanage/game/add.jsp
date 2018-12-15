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
            <li><a href="/gameAll">游戏列表</a></li>
            <li class="active"><a href="">游戏添加</a></li>
        </ul>
        <form action="/gameAdd" method="post" class="form-horizontal" role="form" style="padding: 40px 0 0 0">
            <div class="form-group">
                <label for="name" class="col-sm-1 control-label">游戏名称</label>
                <div class="col-sm-9">
                    <input class="form-control" id="name" type="text" name="name" placeholder="请输入游戏名称">
                </div>
            </div>
            <div class="form-group">
                <label for="source" class="col-sm-1 control-label">来源</label>
                <div class="col-sm-9">
                    <input class="form-control" id="source" type="text" name="source" placeholder="请输入来源">
                </div>
            </div>
            <div class="form-group">
                <label for="self" class="col-sm-1 control-label">游戏简介</label>
                <div class="col-sm-9">
                    <textarea class="form-control from-textarea" id="self" name="introduction" placeholder="请输入游戏简介" style="height: 100px"></textarea>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-10 col-sm-offset-1">
                    <button type="submit" class="btn btn-success">添加</button>
                </div>
            </div>
        </form>
        <c:if test="${addGameResult.getBoolResult()}">
            <div class="alert alert-success">插入数据成功</div>
        </c:if>
        <c:if test="${addGameResult.getBoolResult() != null && !addGameResult.getBoolResult()}">
            <div class="alert alert-danger">插入数据失败</div>
        </c:if>
    </div>
</div>
</body>
<script src="../../../static/js/jquery-3.3.1.min.js"></script>
<script src="../../../static/js/bootstrap.min.js"></script>
</html>
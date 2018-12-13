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

    <%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
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
                <li><a href="" class="current">用户管理</a></li>
                <li><a href="">游戏简介管理</a></li>
                <li><a href="">帖子管理</a></li>
                <li><a href="">评论管理</a></li>
            </ul>
        </div>
    </div>
</nav>
<div class="container">
    <div class="col-md-12">
        <div class="page-header">用户管理</div>
        <ul class="nav nav-tabs">
            <li><a href="/userAll">用户列表</a></li>
            <li class="active"><a>用户搜索</a></li>
            <li><a href="<%=serverPath%>jsp/backmanage/user/add.jsp">用户添加</a></li>
        </ul>
        <form action="/userSearch" method="get" class="form-horizontal" role="form" style="padding: 40px 0 0 0">
            <div class="form-group">
                <label for="select" class="col-sm-1 control-label">选择搜索字段</label>
                <div class="col-sm-9">
                    <select id="select" class="form-control" name="column">
                        <option value="ID">ID</option>
                        <option value="username">用户名</option>
                        <option value="email">邮箱</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="data" class="col-sm-1 control-label">字段值</label>
                <div class="col-sm-9">
                    <input class="form-control" id="data" type="text" name="data" placeholder="请输入对应的字段值">
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-10 col-sm-offset-1">
                    <button type="submit" class="btn btn-success">搜索</button>
                </div>
            </div>
        </form>
        <table class="table">
            <thead>
            <tr>
                <th>ID</th>
                <th>用户名</th>
                <th>邮箱</th>
                <th>密码</th>
                <th>简介</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <c:forEach items="${user.getSingleData()}" var="row">
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
                                <li><a href="<%=serverPath%>userUpdate?id=${row[0]}">修改信息</a></li>
                                <li><a href="<%=serverPath%>userDelete?id=${row[0]}">删除用户</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
        <c:if test="${updateHandleResult.getBoolResult()}">
            <div class="alert alert-success">修改信息成功，请搜索查看结果</div>
        </c:if>
        <c:if test="${updateHandleResult.getBoolResult() != null && !updateHandleResult.getBoolResult()}">
            <div class="alert alert-success">修改信息失败，请搜索校验</div>
        </c:if>
    </div>
</div>
</body>
<script src="../../../static/js/jquery-3.3.1.min.js"></script>
<script src="../../../static/js/bootstrap.min.js"></script>
</html>
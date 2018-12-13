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
                <li><a href="" class="current">用户管理</a></li>
                <li><a href="">游戏简介管理</a></li>
                <li><a href="/postAll">帖子管理</a></li>
                <li><a href="">评论管理</a></li>
            </ul>
        </div>
    </div>
</nav>
<div class="container">
    <div class="col-md-12">
        <div class="page-header">用户管理</div>
        <ul class="nav nav-tabs">
            <li class="active"><a href="/userAll">用户列表</a></li>
            <li><a href="<%=serverPath%>jsp/backmanage/user/search.jsp">用户搜索</a></li>
            <li><a href="<%=serverPath%>jsp/backmanage/user/add.jsp">用户添加</a></li>
        </ul>
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
            <c:forEach items="${user.getData()}" var="row">
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
        <c:if test="${deleteResult.getBoolResult()}">
            <div class="alert alert-success">数据删除成功</div>
            <div class="alert alert-info">
                <a class="alert-link" href="/userAll">刷新用户列表</a>
            </div>
        </c:if>
        <c:if test="${deleteResult.getBoolResult() != null && !deleteResult.getBoolResult()}">
            <div class="alert alert-danger">数据删除失败</div>
            <c:if test="${deleteResult.getStringResult() != null}">
                <div class="alert alert-danger">${deleteResult.getStringResult()}</div>
            </c:if>
            <div class="alert alert-info">
                <a class="alert-link" href="/userAll">刷新用户列表</a>
            </div>
        </c:if>
        <ul class="pagination pagination-lg">
            <li><a href="<%=serverPath%>userAll?page=${currentUserPage - 1}">&laquo;</a></li>
            <c:forEach var="page" begin="1" end="${user.getPageNumberMax()}">
                <c:if test="${page == currentUserPage}">
                    <li class="active"><a href="<%=serverPath%>userAll?page=${page}">${page}</a></li>
                </c:if>
                <c:if test="${page != currentUserPage}">
                    <li><a href="<%=serverPath%>userAll?page=${page}">${page}</a></li>
                </c:if>
            </c:forEach>
            <li><a href="<%=serverPath%>userAll?page=${currentUserPage + 1}">&raquo;</a></li>
        </ul>
    </div>
</div>
</body>
<script src="../../../static/js/jquery-3.3.1.min.js"></script>
<script src="../../../static/js/bootstrap.min.js"></script>
</html>
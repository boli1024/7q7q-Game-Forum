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
                <li><a href="">游戏简介管理</a></li>
                <li><a href="" class="current">帖子管理</a></li>
                <li><a href="">评论管理</a></li>
            </ul>
        </div>
    </div>
</nav>
<div class="container">
    <div class="col-md-12">
        <div class="page-header">帖子管理</div>
        <ul class="nav nav-tabs">
            <li class="active"><a href="">帖子列表</a></li>
            <li><a href="<%=serverPath%>jsp/backmanage/post/search.jsp">帖子搜索</a></li>
            <li><a href="<%=serverPath%>jsp/backmanage/post/add.jsp">帖子添加</a></li>
        </ul>
        <table class="table">
            <thead>
            <tr>
                <th>ID</th>
                <th>标题</th>
                <th>发表用户</th>
                <th>标签</th>
                <th>发表时间</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <c:forEach items="${post.getData()}" var="row">
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
                                <li><a href="<%=serverPath%>postUpdate?id=${row[0]}">修改帖子</a></li>
                                <li><a href="<%=serverPath%>postDelete?id=${row[0]}">删除帖子</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
        <c:if test="${deletePostResult.getBoolResult()}">
            <div class="alert alert-success">帖子删除成功</div>
            <div class="alert alert-info">
                <a class="alert-link" href="/postAll">刷新帖子列表</a>
            </div>
        </c:if>
        <c:if test="${deletePostResult.getBoolResult() != null && !deletePostResult.getBoolResult()}">
            <div class="alert alert-danger">帖子删除失败</div>
            <c:if test="${deletePostResult.getStringResult() != null}">
                <div class="alert alert-danger">${deletePostResult.getStringResult()}</div>
            </c:if>
            <div class="alert alert-info">
                <a class="alert-link" href="/postAll">刷新帖子列表</a>
            </div>
        </c:if>
        <ul class="pagination pagination-lg">
            <li><a href="<%=serverPath%>postAll?page=${currentPostPage - 1}">&laquo;</a></li>
            <c:forEach var="page" begin="1" end="${post.getPageNumberMax()}">
                <c:if test="${page == currentPostPage}">
                    <li class="active"><a href="<%=serverPath%>postAll?page=${page}">${page}</a></li>
                </c:if>
                <c:if test="${page != currentPostPage}">
                    <li><a href="<%=serverPath%>postAll?page=${page}">${page}</a></li>
                </c:if>
            </c:forEach>
            <li><a href="<%=serverPath%>postAll?page=${currentPostPage + 1}">&raquo;</a></li>
        </ul>
    </div>
</div>
</body>
<script src="../../../static/js/jquery-3.3.1.min.js"></script>
<script src="../../../static/js/bootstrap.min.js"></script>
</html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1 , user-scalable=no">
    <link rel="icon" type="image/x-icon" href="../static/images/game-icon.jpg">
    <title>错误页面</title>
    <link rel="stylesheet" href="../static/css/bootstrap.css" />
    <link rel="stylesheet" href="../static/css/navbar.css">
    <link rel="stylesheet" href="../static/css/style.css">
    <link rel="stylesheet" href="../static/css/post.css">

    <%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
    <%@ taglib  uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

</head>
<body>

<nav class="navbar navbar-default">
    <div class="container">
        <div class="navbar-header">
            <div class="navbar-brand">7Q7Q游戏论坛</div>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
                <li><a href="http://127.0.0.1:8080">首页</a></li>
                <li><a href="http://127.0.0.1:8080/index.jsp#game">游戏</a></li>
                <li><a>简介</a></li>
                <li><a class="/postDetail">论坛</a></li>

                <c:if test="${loginResult.getBoolResult()}">
                    <li><a>你好，<span style="color: #05ace0">${username}</span></a></li>
                    <li><a href="/logout">注销</a></li>
                </c:if>
                <c:if test="${!loginResult.getBoolResult()}">
                    <li><a href="http://127.0.0.1:8080/jsp/login.jsp">登录</a></li>
                    <li><a href="http://127.0.0.1:8080/jsp/register.jsp">注册</a></li>
                </c:if>

            </ul>
        </div>
    </div>
</nav>

<div class="container">
    <div class="col-md-12">
        <c:if test="${result.getStringResult() != null}">
            <div class="alert alert-danger">${result.getStringResult()}</div>
        </c:if>
        <div class="alert alert-danger">页面请求或响应错误。</div>
    </div>
</div>

</body>
</html>
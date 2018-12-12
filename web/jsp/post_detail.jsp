<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1 , user-scalable=no">
    <link rel="icon" type="image/x-icon" href="../static/images/game-icon.jpg">
    <title>帖子详情</title>
    <link rel="stylesheet" href="../static/css/bootstrap.css" />
    <link rel="stylesheet" href="../static/css/navbar.css">
    <link rel="stylesheet" href="../static/css/style.css">
    <link rel="stylesheet" href="../static/css/post_detail.css">

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
                <li><a href="../index.jsp">首页</a></li>
                <li><a href="../index.jsp#game">游戏</a></li>
                <li><a>简介</a></li>
                <li><a class="current" href="/postDetail?page=1">论坛</a></li>

                <c:if test="${loginResult.getBoolResult()}">
                    <li><a>你好，<span style="color: #05ace0">${username}</span></a></li>
                    <li><a href="/logout">注销</a></li>
                </c:if>
                <c:if test="${!loginResult.getBoolResult()}">
                    <li><a href="login.jsp">登录</a></li>
                    <li><a href="register.jsp">注册</a></li>
                </c:if>

            </ul>
        </div>
    </div>
</nav>

<div class="container">
    <div class="col-md-12">
        <ul class="breadcrumb">
            <li><a href="../index.jsp">首页</a></li>
            <li><a href="/postDetail?page=1">论坛</a></li>
            <li class="active">帖子详情</li>
        </ul>
    </div>
    <div class="col-md-12">
        <c:forEach items="${post.getSingleData()}" var="data">
            <div>
                <h3>${data[1]}</h3>
            </div>
            <hr>
            用户：${data[2]}&ensp;&ensp;时间：${data[3]}
            <hr>
            <div class="content">
                    ${data[4]}
            </div>
        </c:forEach>

        <div class="reply">
            <ul class="breadcrumb"><li>回复:</li></ul>

            <c:forEach items="${comment.getData()}" var="commentData">
                <div class="comment">
                    <p>${commentData[1]}</p>
                    <div class="footer">
                        <span class="glyphicon glyphicon-user">&ensp;${commentData[0]}</span>
                        <span class="glyphicon glyphicon-time">&ensp;${commentData[2]}</span>
                    </div>
                </div>
            </c:forEach>

        </div>
        <div>

            <c:forEach items="${post.getSingleData()}" var="data">
                <form action="/commentAdd" method="post" class="form-horizontal" role="form">
                    <div class="form-group">
                        <input type="hidden" name="postId" value="${data[0]}">
                        <label for="comment">回复内容：</label>
                        <input id="comment" class="form-control" type="text" name="content" placeholder="请输入回复内容">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary">点击回复</button>
                    </div>
                </form>
            </c:forEach>

        </div>
    </div>
</div>

</body>
</html>
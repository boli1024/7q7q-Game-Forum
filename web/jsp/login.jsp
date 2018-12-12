<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1 , user-scalable=no">
    <link rel="icon" type="image/x-icon" href="../static/images/game-icon.jpg">
    <title>登录</title>
    <link rel="stylesheet" href="../static/css/bootstrap.css" />
    <link rel="stylesheet" href="../static/css/login.css">

    <%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
    <%@ taglib  uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

</head>
<body>

<div class="container">
    <div class="col-md-4 col-md-offset-4">
        <div class="form-frame">
            <form action="/login" method="post" class="form-horizontal" role="form" style="padding: 20px">
                <div class="form-group">
                    <label for="name" class="col-sm-3 control-label">用户名</label>
                    <div class="col-sm-9">
                        <input class="form-control" id="name" type="text" name="username" placeholder="请输入用户名">
                    </div>
                </div>
                <div class="form-group">
                    <label for="pwd" class="col-sm-3 control-label">密码</label>
                    <div class="col-sm-9">
                        <input class="form-control" id="pwd" type="password" name="password" placeholder="请输入密码">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-9 col-sm-offset-3">
                        <div class="checkbox">
                            <label><input type="checkbox">记住登录信息</label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-10 col-sm-offset-2">
                        <button type="submit" class="btn btn-success">登录</button>
                        <a href="register.jsp"><button type="button" class="btn btn-default">注册</button></a>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-10 col-sm-offset-2">
                        <span class="glyphicon glyphicon-home" style="margin-top: 10px; font-weight: bold;">&ensp;<a href="../index.jsp">返回首页</a></span>
                        <span class="glyphicon glyphicon-registration-mark" style="margin-top: 10px; font-weight: bold;">&ensp;<a href="superLogin.jsp">管理员登录</a></span>
                    </div>
                </div>
            </form>
            <c:if test="${loginResult.getBoolResult() != null && !loginResult.getBoolResult()}">
                <div class="alert alert-danger">登录失败，请注册后登录。</div>
            </c:if>
        </div>
    </div>
</div>

</body>
</html>
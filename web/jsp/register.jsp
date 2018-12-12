<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1 , user-scalable=no">
    <link rel="icon" type="image/x-icon" href="../static/images/game-icon.jpg">
    <title>注册</title>
    <link rel="stylesheet" href="../static/css/bootstrap.css" />
    <link rel="stylesheet" href="../static/css/login.css">

    <%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
    <%@ taglib  uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

</head>
<body>

<div class="container">
    <div class="col-md-4 col-md-offset-4">
        <div class="form-frame">
            <form action="/register" method="post" class="form-horizontal" role="form" style="padding: 20px" id="form">
                <div class="form-group">
                    <label for="name" class="col-sm-3 control-label">用户名</label>
                    <div class="col-sm-9">
                        <input class="form-control" id="name" type="text" name="username" placeholder="请输入用户名">
                    </div>
                </div>
                <div class="form-group">
                    <label for="email" class="col-sm-3 control-label">邮箱</label>
                    <div class="col-sm-9">
                        <input class="form-control" id="email" type="text" name="email" placeholder="请输入邮箱">
                    </div>
                </div>
                <div class="form-group">
                    <label for="pwd1" class="col-sm-3 control-label">密码</label>
                    <div class="col-sm-9">
                        <input class="form-control" id="pwd1" type="password" name="password1" placeholder="请输入密码">
                    </div>
                </div>
                <div class="form-group">
                    <label for="pwd2" class="col-sm-3 control-label">确认密码</label>
                    <div class="col-sm-9">
                        <input class="form-control" id="pwd2" type="password" name="password2" placeholder="请再次输入密码">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-10 col-sm-offset-2">
                        <button type="submit" class="btn btn-success" onclick="return beginSubmit()">注册</button>
                        <a href="http://127.0.0.1:8080/jsp/login.jsp"><button type="button" class="btn btn-default">登录</button></a>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-10 col-sm-offset-2">
                        <span class="glyphicon glyphicon-home" style="margin-top: 10px; font-weight: bold;">&ensp;<a href="../index.jsp">返回首页</a></span>
                    </div>
                </div>
            </form>

            <c:if test="${registerResult.getBoolResult()}">
                <div class="alert alert-success">注册成功，请登录</div>
            </c:if>
            <c:if test="${registerResult.getBoolResult() != null && !registerResult.getBoolResult()}">
                <div class="alert alert-danger">注册失败，用户名已被注册或输入信息不全</div>
            </c:if>

        </div>
    </div>
</div>

</body>
<script>
    function beginSubmit() {
        var form = document.getElementById("form");
        var pwd1 = form.elements["pwd1"].value;
        console.log(pwd1);
        var pwd2 = form.elements["pwd2"].value;
        console.log(pwd2);
        if(pwd1 === pwd2){
            return true;
        }
        else {
            alert("两次密码输入不一致，请重新输入");
            return false;
        }
    }
</script>
</html>
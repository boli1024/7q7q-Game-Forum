<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1 , user-scalable=no">
    <link rel="icon" type="image/x-icon" href="../static/images/game-icon.jpg">
    <title>论坛</title>
    <link rel="stylesheet" href="../static/css/bootstrap.css" />
    <link rel="stylesheet" href="../static/css/bbs.css">
    <link rel="stylesheet" href="../static/css/navbar.css">
    <link rel="stylesheet" href="../static/css/style.css">

    <%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
    <%@ taglib  uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%@taglib uri="/eltag" prefix="el"%>
    <% String serverPath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+"/"; %>

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
                <li><a class="current">论坛</a></li>

                <c:if test="${loginResult.getBoolResult()}">
                    <li><a>你好，<span style="color: #05ace0">${username}</span></a></li>
                    <li><a href="/logout">注销</a></li>
                </c:if>
                <c:if test="${!loginResult.getBoolResult()}">
                    <li><a href="<%=serverPath%>jsp/login.jsp">登录</a></li>
                    <li><a href="<%=serverPath%>jsp/register.jsp">注册</a></li>
                </c:if>

            </ul>
        </div>
    </div>
</nav>

<div class="container">
    <div class="col-md-12">
        <div class="list-group">
            <span class="list-group-item active">
                <h4 class="list-group-item-heading">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" class="noUnderline">最新通知
                        <span class="caret"></span>
                    </a>
                </h4>
            </span>
            <div id="collapseOne" class="collapse panel-collapse in">
                <span class="list-group-item">
                    <h4 class="list-group-item-text">论坛正式版发布，欢迎体验。</h4>
                </span>
                <span class="list-group-item">
                    <h4 class="list-group-item-text">论坛测试版发布，注册、登录、发帖均完善。</h4>
                </span>
                <span class="list-group-item">
                    <h4 class="list-group-item-text">新增堆木头、益智水管工两款游戏。</h4>
                </span>
                <span class="list-group-item">
                    <h4 class="list-group-item-text">新增高达机器人、斗兽棋两款游戏。</h4>
                </span>
            </div>
        </div>
        <nav class="navbar navbar-default" role="navigation">
            <div class="container-fluid">
                <ul class="nav navbar-nav">
                    <li><a class="current">查看帖子</a></li>

                    <c:if test="${search}">
                        <li><a class="noUnderline" href="/postDetail?page=1">所有帖子</a></li>
                    </c:if>

                    <c:if test="${loginResult.getBoolResult()}">
                        <li><a href="<%=serverPath%>jsp/post_create.jsp">发帖</a></li>
                    </c:if>

                </ul>
                <form action="/postDetailByLike" method="get" class="navbar-form navbar-right" role="search">
                    <div class="form-group">
                        <label for="search">帖子搜索:</label>
                        <input id="search" type="text" name="keyword" class="form-control" placeholder="Search">
                        <input type="hidden" name="page" value="1">
                    </div>
                    <button type="submit" class="btn btn-default" onclick="return searchValidate()">提交</button>
                </form>
            </div>
        </nav>
    </div>

    <div class="col-md-9" style="background-color: #f1f1f1; height: 500px">
        <c:forEach items="${post.getData()}" var="post">
            <div class="list row">
                <div class="col-md-4 area-img" style="background-color: white;">
                    <img class="img-responsive list-img" src="../static/images/lable/lable${post[5]}.jpg">
                </div>
                <div class="col-md-8 area-content" style="background-color: white;">
                    <h3 class="list-title"><a href="/postContent?id=${post[0]}" class="noUnderline">${post[1]}</a></h3>
                    <p>概要：${post[2]}</p>
                    <div class="footer">
                        <span class="glyphicon glyphicon-user">&ensp;${post[3]}</span>
                        <span class="glyphicon glyphicon-time">&ensp;${post[4]}</span>
                        <span class="glyphicon glyphicon-comment">&ensp;${el:getCommentNumber(post[0])}</span>
                    </div>
                </div>
            </div>
        </c:forEach>

        <c:if test="${!search}">
            <ul class="pagination pagination-lg">
                <c:if test="${postPage != null}">
                    <li><a href="<%=serverPath%>postDetail?page=${postPage-1}">&laquo;</a></li>
                    <c:forEach var="page" begin="1" end="${post.getPageNumberMax()}">
                        <c:if test="${page == postPage}">
                            <li class="active"><a href="#">${page}</a></li>
                        </c:if>
                        <c:if test="${page != postPage}">
                            <li><a href="<%=serverPath%>postDetail?page=${page}">${page}</a></li>
                        </c:if>
                    </c:forEach>
                    <li><a href="<%=serverPath%>postDetail?page=${postPage+1}">&raquo;</a></li>
                </c:if>
            </ul>
        </c:if>


        <c:if test="${search}">
            <ul class="pagination pagination-lg">
                <c:if test="${postPage != null}">
                    <li><a href="<%=serverPath%>postDetailByLike?keyword=${keyword}&page=${postPage-1}">&laquo;</a></li>
                    <c:forEach var="page" begin="1" end="${post.getPageNumberMax()}">
                        <c:if test="${page == postPage}">
                            <li class="active"><a href="#">${page}</a></li>
                        </c:if>
                        <c:if test="${page != postPage}">
                            <li><a href="<%=serverPath%>postDetailByLike?keyword=${keyword}&page=${page}">${page}</a></li>
                        </c:if>
                    </c:forEach>
                    <li><a href="<%=serverPath%>postDetailByLike?keyword=${keyword}&page=${postPage+1}">&raquo;</a></li>
                </c:if>
            </ul>
        </c:if>
    </div>

    <div class="col-md-3">
        <div class="panel panel-success">
            <div class="panel-heading">
                <h4 class="panel-title">标签</h4>
            </div>
            <div class="panel-body">
                <h4>
                    <span class="label label-default">高达机器人</span>
                    <span class="label label-primary">斗兽棋</span>
                </h4>
                <h4>
                    <span class="label label-success">益智水管工</span>
                    <span class="label label-info">堆木头</span>
                </h4>
                <h4>
                    <span class="label label-warning">休闲灌水</span>
                    <span class="label label-danger">游戏讨论</span>
                </h4>
            </div>
        </div>
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h4 class="panel-title">关于本站</h4>
            </div>
            <div class="panel-body">
                <p>7Q7Q游戏论坛是一个关于游戏爱好者的交友论坛。</p>
            </div>
        </div>
    </div>
</div>

</body>
<script src="../static/js/jquery-3.3.1.min.js"></script>
<script src="../static/js/bootstrap.min.js"></script>
<script>
    function searchValidate() {
        var key = document.getElementById("search");
        if(key.value == null || key.value === ""){
            alert("请输入搜索字段");
            return false;
        }
        return true;
    }
</script>
</html>
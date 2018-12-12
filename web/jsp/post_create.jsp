<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1 , user-scalable=no">
    <link rel="icon" type="image/x-icon" href="../static/images/game-icon.jpg">
    <title>发布帖子</title>
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
            <li><a href="../index.jsp">主页</a></li>
            <li><a href="/postDetail?page=1">论坛</a></li>
            <li class="active">发帖</li>
        </ul>
    </div>
    <div class="col-md-12">
        <form action="/postAdd" method="post" class="form-horizontal" role="form">
            <div class="form-group">
                <label for="title">标题</label>
                <input id="title" class="form-control" type="text" name="title" value="${title}" placeholder="请输入标题">
            </div>
            <div class="form-group">
                <label for="summary">概括</label>
                <input id="summary" class="form-control" type="text" name="summary" value="${summary}" placeholder="请输入帖子概括">
            </div>
            <div class="form-group">
                <label for="game-lable">标签</label>
                <select id="game-lable" class="form-control" name="lable">
                    <option value="5">休闲灌水</option>
                    <option value="1">高达机器人大战</option>
                    <option value="2">益智水管工</option>
                    <option value="3">斗兽棋</option>
                    <option value="4">堆木头</option>
                    <option value="6">游戏讨论</option>
                </select>
            </div>
            <div class="form-group">
                <label for="editor">主体内容</label>
                <textarea id="editor" name="content">${content}</textarea>
                <%--class="form-control" name="content" placeholder="请输入帖子内容"--%>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary" onclick="return uptext()">点击发布</button>
            </div>
        </form>
    </div>
    <div class="col-md-12">
        <c:if test="${result.getListResult() != null}">
            <c:forEach items="${result.getListResult()}" var="resultItem">
                <div class="alert alert-danger alert-dismissable">
                    <button type="button" class="close" data-dismiss="alert"
                            aria-hidden="true">
                        &times;
                    </button>
                        ${resultItem}
                </div>
            </c:forEach>
        </c:if>

        <c:if test="${result.getStringResult() != null && result.getStringResult() != ''}">
            <div class="alert alert-danger alert-dismissable">
                <button type="button" class="close" data-dismiss="alert"
                        aria-hidden="true">
                    &times;
                </button>
                    ${result.getStringResult()}
            </div>
        </c:if>
    </div>
</div>

</body>

<script src="../ueditor/ueditor.config.js"></script>
<script src="../ueditor/ueditor.all.js"></script>
<script src="../ueditor/lang/zh-cn/zh-cn.js"></script>
<script>
    var ue = UE.getEditor("editor",{
        toolbars: [
            ['anchor', //锚点
                'undo', //撤销
                'redo', //重做
                'bold', //加粗
                'snapscreen', //截图
                'italic', //斜体
                'underline', //下划线
                'subscript', //下标
                'superscript', //上标
                'formatmatch', //格式刷
                'source', //源代码
                'blockquote', //引用
                'selectall', //全选
                'horizontal', //分隔线
                'removeformat', //清除格式
                'unlink', //取消链接
                'deletecaption', //删除表格标题
                'inserttitle', //插入标题
                'mergecells', //合并多个单元格
                'deletetable', //删除表格
                'cleardoc', //清空文档
                'insertparagraphbeforetable', //"表格前插入行"
                'insertcode', //代码语言
                'fontfamily', //字体
                'fontsize', //字号
                'paragraph', //段落格式
                'simpleupload', //单图上传
                'edittable', //表格属性
                'edittd', //单元格属性
                'link', //超链接
                'emotion', //表情
                'spechars', //特殊字符
                'searchreplace', //查询替换
                'insertvideo', //视频
                'help', //帮助
                'justifyleft', //居左对齐
                'justifyright', //居右对齐
                'justifycenter', //居中对齐
                'justifyjustify', //两端对齐
                'forecolor', //字体颜色
                'insertorderedlist', //有序列表
                'insertunorderedlist', //无序列表
                'fullscreen', //全屏
                'pagebreak', //分页
                'imagenone', //默认
                'imageleft', //左浮动
                'imageright', //右浮动
                'attachment', //附件
                'imagecenter', //居中
                'lineheight', //行间距
                'customstyle', //自定义标题
                'autotypeset', //自动排版
                'inserttable', //插入表格
                'charts', // 图表]
            ]]
    });

    function uptext() {
        if(!ue.hasContents()){
            alert("请输入内容");
            return false;
        }
        else {
            var form = document.getElementById("myForm");
            var info = form.elements["info"];
            info.value = ue.getContent();
            return true;
        }
    }
</script>

</html>
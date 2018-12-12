<%--
  Created by IntelliJ IDEA.
  User: Bol
  Date: 2018/12/1
  Time: 20:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Ueditor</title>
    <style>
        #editor{
            width: 500px;
            height: 500px;
        }
        #myForm{
            position: relative;
        }
    </style>
</head>
<body>
<form action="result.jsp" method="post" id="myForm">
    <input type="hidden" name="info" id="info">
    <textarea id="editor"></textarea>
    <input type="submit" value="提交" onclick="return uptext()" style="margin-top: 180px">
</form>
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

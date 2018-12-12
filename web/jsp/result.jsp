<%--
  Created by IntelliJ IDEA.
  User: Bol
  Date: 2018/12/1
  Time: 20:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>editor 结果页面</title>
</head>
<body>
<%
    request.setCharacterEncoding("utf-8");
    String text = request.getParameter("info");
    out.println(text);
%>
</body>
</html>

<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/12/12 0012
  Time: 下午 2:43
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="/eltag" prefix="el"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
    <title>路径测试页面</title>
</head>
<body>
<% String serverPath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+"/"; %>
<%
out.println(request.getRequestURL());
%>
<br>
<%
out.println(request.getScheme());
%>
<br>
<%
    out.println(request.getServerName());
%>
<br>
<%
    out.println(request.getServerPort());
%>
<%=serverPath%>
</body>
</html>

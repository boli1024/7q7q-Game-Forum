package test;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ServletPathTest extends HttpServlet {

    @Override
    public void init() throws ServletException {
        super.init();
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        String contextPath = request.getContextPath();
        StringBuffer path = request.getRequestURL();
        System.out.println("相对路径:"+contextPath);
        System.out.println("URL路径："+path);
        System.out.println(request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+"/");
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        doGet(request,response);
    }
}

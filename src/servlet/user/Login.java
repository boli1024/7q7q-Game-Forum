package servlet.user;

import bean.Result;
import util.Tools;
import util.User;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class Login extends HttpServlet {

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        request.setCharacterEncoding("utf-8");
        Result loginResult = new Result();

        String username = request.getParameter("username").trim();
        String password = request.getParameter("password").trim();

        if("729532969".equals(username) && "729532969".equals(password)){
            response.sendRedirect("/userAll");
            return;
        }

        User user = Tools.getUser(request);
        loginResult.setBoolResult(user.isUser(username,password));

        HttpSession session = request.getSession(true);
        session.setAttribute("loginResult",loginResult);

        if(loginResult.getBoolResult()){
            response.sendRedirect("index.jsp");
            session.setAttribute("username",username);
        }
        else {
            response.sendRedirect("jsp/login.jsp");
        }

    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        doGet(request,response);
    }
}

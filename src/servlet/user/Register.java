package servlet.user;

import bean.Result;
import util.Tools;
import util.User;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class Register extends HttpServlet {

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        request.setCharacterEncoding("utf-8");
        Result registerResult = new Result();

        String username = request.getParameter("username").trim();
        String password = request.getParameter("password1").trim();
        String email = request.getParameter("email").trim();
        String introduction = "无简介";

        User user = Tools.getUser(request);
        registerResult.setBoolResult(user.insert(username,password,email,introduction));

        request.setAttribute("registerResult",registerResult);
        request.getRequestDispatcher("jsp/register.jsp").forward(request,response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        doGet(request,response);
    }
}

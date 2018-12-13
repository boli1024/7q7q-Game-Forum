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

public class UpdateHandle extends HttpServlet {

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        request.setCharacterEncoding("utf-8");

        Result updateHandleResult = new Result();

        try{
            int id = Integer.parseInt(request.getParameter("ID").trim());
            String username = request.getParameter("username").trim();
            String email = request.getParameter("email").trim();
            String password = request.getParameter("password").trim();
            String introduction = request.getParameter("introduction").trim();

            User user = Tools.getUser(request);
            updateHandleResult.setBoolResult(user.update(id,username,password,email,introduction));
        }
        catch (Exception e){
            updateHandleResult.setBoolResult(false);
        }

        request.setAttribute("updateHandleResult",updateHandleResult);
        request.getRequestDispatcher("/jsp/backmanage/user/search.jsp").forward(request,response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        doGet(request,response);
    }
}

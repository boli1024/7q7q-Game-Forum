package servlet.user;

import bean.Result;
import bean.UserUpdate;
import util.Tools;
import util.User;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class Update extends HttpServlet {
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        request.setCharacterEncoding("utf-8");
        Result updateResult = new Result();
        UserUpdate update;
        int id;

        try {
            id = Integer.parseInt(request.getParameter("id"));
            User user = Tools.getUser(request);
            if (user.query("id",id)){
                updateResult.setBoolResult(true);
                update = new UserUpdate(user.getSingleData());
                request.setAttribute("update",update);
            }
            else {
                updateResult.setBoolResult(false);
            }
        }
        catch (Exception e){
            System.out.println("修改数据获取 id 失败");
            updateResult.setBoolResult(false);
            updateResult.setStringResult("修改数据获取 id 失败");
        }

        request.setAttribute("updateResult",updateResult);
        request.getRequestDispatcher("jsp/backmanage/user/update.jsp").forward(request,response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        doGet(request,response);
    }
}

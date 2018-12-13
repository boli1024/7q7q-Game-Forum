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

public class Delete extends HttpServlet {

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        request.setCharacterEncoding("utf-8");

        HttpSession session = request.getSession(true);
        User user = Tools.getUser(request);

        if(user == null){
            System.out.println("user is 空");
        }

        String param = request.getParameter("id");
        System.out.println(param);
        int id;
        Result deleteResult = new Result();
        try {
            if(param != null){
               id = Integer.parseInt(param);
               System.out.println(id);
               deleteResult.setBoolResult(user.delete(id));
            }
            else {
                deleteResult.setStringResult("请输入 id 进行删除");
            }
        }
        catch (Exception e){
            deleteResult.setStringResult("删除数据所需的 id 解析失败");
            System.out.println(e);
        }

        request.setAttribute("deleteResult",deleteResult);
        request.getRequestDispatcher("jsp/backmanage/user/all.jsp").forward(request,response);

    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        doGet(request,response);
    }
}

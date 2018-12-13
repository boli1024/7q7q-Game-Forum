package servlet.user;

import util.Tools;
import util.User;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class All extends HttpServlet {
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        request.setCharacterEncoding("utf-8");

        int page = 1;
        try {
            page = Integer.parseInt(request.getParameter("page"));
        }
        catch (Exception e){
            page = 1;
        }

        User user = Tools.getUser(request);
        user.setRowSet();

        if(page > user.getPageNumberMax()){
            page = 1;
        }
        if(page <= 0){
            page = user.getPageNumberMax();
        }

        user.getPageData(page);

        HttpSession session = request.getSession(true);
        session.setAttribute("currentUserPage",page);

        response.sendRedirect("jsp/backmanage/user/all.jsp");
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        doGet(request,response);
    }
}

package servlet.user;

import util.Tools;
import util.User;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class Search extends HttpServlet {
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException {
        request.setCharacterEncoding("utf-8");
        String column = request.getParameter("column");
        String data = request.getParameter("data");
        column = column.trim();
        data = data.trim();

        User user = Tools.getUser(request);

        if(column.equals("ID")){
            try {
                int object = Integer.parseInt(data);
                user.query(column,object);
            }
            catch (Exception e){
                System.out.println(e);
            }
        }
        else {
            user.query(column,data);
        }
        response.sendRedirect("jsp/backmanage/search.jsp");
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException {
        doGet(request,response);
    }
}

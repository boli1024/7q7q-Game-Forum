package servlet.Comment;

import util.Comment;
import util.Game;
import util.Tools;

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

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        request.setCharacterEncoding("utf-8");

        int page = Tools.getPage(request);

        Comment comment = Tools.getComment(request);

        comment.setRowSet();
        comment.setDataAll();

        page = Tools.validatePage(page,comment);
        comment.getPageData(page,5);

        HttpSession session = request.getSession(true);
        session.setAttribute("currentCommentPage",page);

        response.sendRedirect("jsp/backmanage/comment/all.jsp");
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        doGet(request,response);
    }
}

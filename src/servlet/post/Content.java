package servlet.post;

import util.Comment;
import util.Post;
import util.Tools;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.tools.Tool;
import java.io.IOException;

public class Content extends HttpServlet {

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        request.setCharacterEncoding("utf-8");

        String idString = request.getParameter("id").trim();
        int id = -1;

        try {
            id = Integer.parseInt(idString);
        }
        catch (Exception e){
            System.out.println(e);
        }
        if(id == -1){
            System.out.println("请指定正确的帖子ID");
            return;
        }

        Post post = Tools.getPost(request);
        post.getContent(id);

        Comment comment = Tools.getComment(request);
        comment.getComments(id);

        HttpSession session = request.getSession(true);
        session.setAttribute("post",post);
        session.setAttribute("comment",comment);

        response.sendRedirect("jsp/post_detail.jsp");
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        doGet(request,response);
    }
}

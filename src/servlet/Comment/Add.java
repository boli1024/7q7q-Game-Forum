package servlet.Comment;

import bean.Result;
import util.Comment;
import util.Tools;
import util.User;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class Add extends HttpServlet {

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        request.setCharacterEncoding("utf-8");

        Result result = new Result();

        HttpSession session = request.getSession(true);
        String username = (String) session.getAttribute("username");

        if(username == null){
            result.setStringResult("请登录后进行回复");
            request.setAttribute("result",result);
            request.getRequestDispatcher("jsp/error.jsp").forward(request,response);
            return;
        }

        User user = Tools.getUser(request);
        int userId = user.getUserId(username);
        if(userId == 0){
            result.setStringResult("获取用户ID失败，请检查用户信息");
            request.setAttribute("result",result);
            request.getRequestDispatcher("jsp/error.jsp").forward(request,response);
            return;
        }

        String postIdString = "";
        postIdString = request.getParameter("postId").trim();
        if(postIdString.equals("")){
            result.setStringResult("获取帖子ID失败，请检查帖子信息");
            request.setAttribute("result",result);
            request.getRequestDispatcher("jsp/error.jsp").forward(request,response);
            return;
        }

        int postId = 0;
        try {
            postId = Integer.parseInt(postIdString);
        }
        catch (Exception e){
            System.out.println("帖子 ID 解析失败，请检查评论提交 URL");
            System.out.println(e);
        }
        if(postId == 0){
            result.setStringResult("帖子 ID 解析失败，请检查评论提交 URL");
            request.setAttribute("result",result);
            request.getRequestDispatcher("jsp/error.jsp").forward(request,response);
            return;
        }

        String content = "";
        content = request.getParameter("content").trim();
        if(content.equals("")){
            result.setStringResult("回复不能全为空格，请重新输入回复内容");
            request.setAttribute("result",result);
            request.getRequestDispatcher("jsp/error.jsp").forward(request,response);
            return;
        }

        Comment comment = Tools.getComment(request);
        if(comment.insert(content,userId,postId)){
            response.sendRedirect("/postContent?id="+postId);
            return;
        }
        else {
            result.setStringResult("回复失败，请联系网站管理员");
            request.setAttribute("result",result);
            request.getRequestDispatcher("jsp/error.jsp").forward(request,response);
            return;
        }
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        doGet(request,response);
    }
}

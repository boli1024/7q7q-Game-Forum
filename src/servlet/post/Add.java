package servlet.post;

import bean.Result;
import util.Post;
import util.Tools;
import util.User;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;

public class Add extends HttpServlet {

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        request.setCharacterEncoding("utf-8");

        boolean bl = true;
        Result result = new Result();
        ArrayList<String> listResult = new ArrayList<>();

        String title = request.getParameter("title").trim();
        String summary = request.getParameter("summary").trim();
        String lableString = request.getParameter("lable").trim();
        String content = request.getParameter("content").trim();
        int lable = 0;

        HttpSession session = request.getSession(true);
        String username = (String) session.getAttribute("username");
        if (username == null){
            result.setStringResult("请登录后发帖");
            request.setAttribute("result",result);
            request.getRequestDispatcher("jsp/error.jsp").forward(request,response);
            return;
        }

        if(title.equals("")){
            listResult.add("标题不能为空，请重新输入");
            result.setBoolResult(false);
            bl = false;
        }
        if(summary.equals("")){
            listResult.add("概括不能为空，请重新输入");
            result.setBoolResult(false);
            bl = false;
        }
        if(lableString.equals("")){
            listResult.add("标签不能为空，请重新输入");
            result.setBoolResult(false);
            bl = false;
        }
        if(content.equals("")){
            listResult.add("帖子内容不能为空，请重新输入");
            result.setBoolResult(false);
            bl = false;
        }

        try {
            lable = Integer.parseInt(lableString);
        }
        catch (Exception e){
            result.setBoolResult(false);
            bl = false;
            System.out.println(e);
        }
        if(lable == 0){
            result.setBoolResult(false);
            bl = false;
        }

        if(!bl){
            request.setAttribute("title",title);
            request.setAttribute("summary",summary);
            request.setAttribute("content",content);

            listResult.add("请重新选择标签");
            System.out.println(lableString);
            System.out.println(lable);
            result.setListResult(listResult);

            request.setAttribute("result",result);
            request.getRequestDispatcher("jsp/post_create.jsp").forward(request,response);
            return;
        }

        User user = Tools.getUser(request);
        int userId = user.getUserId(username);

        Post post = Tools.getPost(request);
        if(post.insert(title,summary,content,userId,lable)){
            response.sendRedirect("/postDetail?page=1");
        }
        else {
            result.setStringResult("发帖失败,请联系网站管理员");
            request.setAttribute("result",result);
            request.getRequestDispatcher("jsp/post_create.jsp").forward(request,response);
        }
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        doGet(request,response);
    }
}

package servlet.post;

import bean.Result;
import util.Post;
import util.Tools;
import util.User;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class Delete extends HttpServlet {

    @Override
    public void init() throws ServletException {
        super.init();
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        request.setCharacterEncoding("utf-8");

        HttpSession session = request.getSession(true);
        Post post = Tools.getPost(request);

        if(post == null){
            System.out.println("post is 空");
        }

        String param = request.getParameter("id");
        int id;
        Result deletePostResult = new Result();
        try {
            if(param != null){
                id = Integer.parseInt(param);
                deletePostResult.setBoolResult(post.delete(id));
            }
            else {
                deletePostResult.setStringResult("请输入 id 进行删除");
            }
        }
        catch (Exception e){
            deletePostResult.setStringResult("删除数据所需的 id 解析失败");
            System.out.println(e);
        }

        request.setAttribute("deletePostResult",deletePostResult);
        request.getRequestDispatcher("jsp/backmanage/post/all.jsp").forward(request,response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        doGet(request,response);
    }
}

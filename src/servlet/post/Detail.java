package servlet.post;

import bean.Result;
import util.Post;
import util.Tools;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class Detail extends HttpServlet {

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        request.setCharacterEncoding("utf-8");
        Result result = new Result();

        int page = 1;
        String pageString = "";
        pageString = request.getParameter("page").trim();
        if(pageString.equals("")){
            result.setStringResult("页数获取失败，请不要随意输入页数");
            request.setAttribute("result",result);
            request.getRequestDispatcher("jsp/error.jsp").forward(request,response);
            return;
        }
        try {
            page = Integer.parseInt(pageString);
        }
        catch (Exception e){
            System.out.println("页数解析失败，跳回到第一页");
        }

        Post post = Tools.getPost(request);
        post.setRowSet();

        if(page > post.getPageNumberMax()){
            page = 1;
        }
        int ignore; //用于忽略 idea 的代码重复提示
        if(page <= 0){
            page = post.getPageNumberMax();
        }

        HttpSession session = request.getSession(true);
        session.setAttribute("postPage",page);

        post.getDetailData();
        post.getPageData(page,6);

        request.getRequestDispatcher("jsp/bbs.jsp").forward(request,response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        doGet(request,response);
    }
}

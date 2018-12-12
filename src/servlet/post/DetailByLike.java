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

public class DetailByLike extends HttpServlet {

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        request.setCharacterEncoding("utf-8");

        int page = 1;
        Result result = new Result();
        String pageString = "";
        pageString = request.getParameter("page").trim();
        if(pageString.equals("")){
            result.setStringResult("页数获取失败，请不要随意输入参数");
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

        String keyword = request.getParameter("keyword").trim();
        if("".equals(keyword)){
            result.setStringResult("搜索关键字获取失败，请重试");
            request.setAttribute("result",result);
            request.getRequestDispatcher("jsp/error.jsp").forward(request,response);
            return;
        }

        Post post = Tools.getPost(request);
        post.getDetailDataByLike(keyword);

        if(page <= 0){
            page = post.getPageNumberMax();
        }
        if(page > post.getPageNumberMax()){
            page = 1;
        }

        HttpSession session = request.getSession(true);
        session.setAttribute("postPage",page);
        session.setAttribute("search",true);
        session.setAttribute("keyword",keyword);

        post.getPageData(page,6);

        request.getRequestDispatcher("jsp/bbs.jsp").forward(request,response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
        doGet(request,response);
    }
}

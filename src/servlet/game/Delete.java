package servlet.game;

import bean.Result;
import util.Game;
import util.Post;
import util.Tools;

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

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");

        HttpSession session = request.getSession(true);
        Game game = Tools.getGame(request);

        String param = request.getParameter("id");
        int id;
        Result deleteGameResult = new Result();
        try {
            if(param != null){
                id = Integer.parseInt(param);
                deleteGameResult.setBoolResult(game.delete(id));
            }
            else {
                deleteGameResult.setStringResult("请输入 id 进行删除");
            }
        }
        catch (Exception e){
            deleteGameResult.setStringResult("删除数据所需的 id 解析失败");
            System.out.println(e);
        }

        request.setAttribute("deleteGameResult",deleteGameResult);
        request.getRequestDispatcher("jsp/backmanage/game/all.jsp").forward(request,response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}

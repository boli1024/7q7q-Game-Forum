package servlet.game;

import bean.Result;
import util.Game;
import util.Tools;
import util.User;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class Add extends HttpServlet {

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        request.setCharacterEncoding("utf-8");
        String name = request.getParameter("name").trim();
        String source = request.getParameter("source").trim();
        String introduction = request.getParameter("introduction").trim();

        Game game = Tools.getGame(request);

        boolean result = game.insert(name,introduction,source);
        Result addGameResult = new Result(result);
        request.setAttribute("addGameResult",addGameResult);

        request.getRequestDispatcher("/jsp/backmanage/game/add.jsp").forward(request,response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        doGet(request, response);
    }
}

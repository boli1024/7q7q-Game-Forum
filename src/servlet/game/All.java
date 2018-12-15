package servlet.game;

import util.Game;
import util.Tools;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class All extends HttpServlet {

    @Override
    public void init() throws ServletException {
        super.init();
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        request.setCharacterEncoding("utf-8");

        int page = Tools.getPage(request);

        Game game = Tools.getGame(request);
        game.setRowSet();

        page = Tools.validatePage(page,game);
        game.setDataAll();

        game.getPageData(page,5);

        HttpSession session = request.getSession(true);
        session.setAttribute("currentGamePage",page);

        response.sendRedirect("jsp/backmanage/game/all.jsp");
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        doGet(request,response);
    }
}

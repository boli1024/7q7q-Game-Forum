package util;

import javafx.geometry.Pos;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Tools {

    public Tools(){}

    public static String toChinese(String text){
        try {
            byte bytes[] = text.getBytes("ISO-8859-1");
            text = new String(bytes);
            return text;
        }
        catch (Exception e){
            return "转换编码失败:" + e;
        }
    }

    public static User getUser(HttpServletRequest request){
        HttpSession session = request.getSession(true);
        User user;
        if((user = (User)session.getAttribute("user")) != null){
            return user;
        }
        user = new User(Config.DATABASENAME,"user",Config.USERNAME,Config.PASSWORD);
        session.setAttribute("user",user);
        return user;
    }

    public static Post getPost(HttpServletRequest request){
        HttpSession session = request.getSession(true);
        Post post;
        if((post = (Post)session.getAttribute("post")) != null){
            return post;
        }
        post = new Post(Config.DATABASENAME,"post",Config.USERNAME,Config.PASSWORD);
        session.setAttribute("post",post);
        return post;
    }

    public static Comment getComment(HttpServletRequest request){
        HttpSession session = request.getSession(true);
        Comment comment;
        if((comment = (Comment)session.getAttribute("Comment")) != null){
            return comment;
        }
        comment = new Comment(Config.DATABASENAME,"Comment",Config.USERNAME,Config.PASSWORD);
        session.setAttribute("comment",comment);
        return comment;
    }

    public static Game getGame(HttpServletRequest request){
        HttpSession session = request.getSession(true);
        Game game;
        if((game = (Game)session.getAttribute("game")) != null){
            return game;
        }
        game = new Game(Config.DATABASENAME, "game", Config.USERNAME, Config.PASSWORD);
        session.setAttribute("game", game);
        return game;
    }

    public static int getPage(HttpServletRequest request){
        int page = 1;
        try {
            page = Integer.parseInt(request.getParameter("page"));
        }
        catch (Exception e){
            page = 1;
        }
        return page;
    }

    public static int validatePage(int page,Database object){
        if(page > object.getPageNumberMax()){
            page = 1;
        }
        if(page <= 0){
            page = object.getPageNumberMax();
        }
        return page;
    }

    public static String getCurrentTime(){
        /*获得当前时间
        * 格式为：2018-11-27 15:47:20
        * 可以直接保存到数据库
        * */
        Date currentTime = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = formatter.format(currentTime);
        return dateString;
    }

    public static void main(String[] args) {
        String s = "测试";
        System.out.println(Tools.toChinese(s));
    }
}

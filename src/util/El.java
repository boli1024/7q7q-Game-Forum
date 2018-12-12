package util;

import javax.servlet.http.HttpServletRequest;

public class El {
    public static String getImgUrl(int id){
        String url = "";
        if(id == 1){
            url = "talk1";
        }
        else if(id == 2){
            url = "talk2";
        }
        else {
            url = "talk";
        }
        return url;
    }

    public static int getCommentsNumber(int id){
        Comment comment = new Comment(Config.DATABASENAME,"comment",Config.USERNAME,Config.PASSWORD);
        return comment.replyNumber(id);
    }

    public static String getServerPath(HttpServletRequest request){
        return request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+"/";
    }

    public static void main(String[] args) {
        System.out.println(El.getCommentsNumber(10));
    }
}
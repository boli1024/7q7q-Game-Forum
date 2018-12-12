package util;

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
        Comment comment = new Comment("test","comment","root","729532969");
        return comment.replyNumber(id);
    }

    public static void main(String[] args) {
        System.out.println(El.getCommentsNumber(10));
    }
}

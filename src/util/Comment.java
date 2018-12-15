package util;

import com.sun.rowset.CachedRowSetImpl;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;

public class Comment extends Database {

    String databaseName;
    String tableName;
    String user;
    String password;

    public Comment(){}

    public Comment(String databaseName,String tableName,String user,String password){
        this.databaseName = databaseName;
        this.tableName = tableName;
        this.user = user;
        this.password = password;

        super.databaseName = databaseName;
        super.tableName = tableName;
        super.user = user;
        super.password = password;

        setColumnData();
    }

    public boolean insert(String content,int userId,int postId){
        try {
            int result=0;
            connect();
            PreparedStatement pre = con.prepareStatement("insert into comment(content,replyTime,userId,postId) values (?,?,?,?)");
            pre.setString(1,content);
            pre.setTimestamp(2,Timestamp.valueOf(Tools.getCurrentTime()));
            pre.setInt(3,userId);
            pre.setInt(4,postId);
            result = pre.executeUpdate();
            if(result == 1){
                System.out.println("插入 Comment 数据成功");
                return true;
            }
            else {
                System.out.println("插入 Comment 数据失败");
                return false;
            }
        }
        catch (Exception e){
            System.out.println("插入 Comment 数据失败");
            System.out.println(e);
            return false;
        }
        finally {
            closeConnect();
        }
    }

    public int replyNumber(int id){
        int number = 0;
        try {
            connect();
            rowSet = new CachedRowSetImpl();
            PreparedStatement pre = con.prepareStatement("select postId,count(*) from comment where postId=?");
            pre.setInt(1,id);
            ResultSet resultSet = pre.executeQuery();
            while (resultSet.next()){
                number = resultSet.getInt(2);
            }
            return number;
        }
        catch (Exception e){
            System.out.println(e);
            return number;
        }
        finally {
            closeConnect();
        }
    }

    public void getComments(int id){
        try {
            rowSet = new CachedRowSetImpl();
            connect();
            PreparedStatement pre = con.prepareStatement("select user.username,comment.content,comment.replyTime from user,comment" +
                    " where comment.userId = user.id and comment.postId=? order by comment.replyTime desc");
            pre.setInt(1,id);
            ResultSet resultSet = pre.executeQuery();
            rowSet.populate(resultSet);
            setData(rowSet,data,3);
        }
        catch (Exception e){
            System.out.println(e);
        }
        finally {
            closeConnect();
        }
    }

    public static void main(String[] args) {
        Comment c = new Comment(Config.DATABASENAME,"Comment",Config.USERNAME,Config.PASSWORD);
//        c.setRowSet();
//        c.setDataAll();
//        c.replyNumber(20);
//        c.getComments(1);
//        c.showAllData();
//        c.insert("测试回复1",3,1);
        c.setRowSet();
        c.setDataAll();
        c.showAllData();
    }

}

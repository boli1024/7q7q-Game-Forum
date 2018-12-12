package util;

import com.sun.rowset.CachedRowSetImpl;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;

public class Post extends Database {

    String databaseName;
    String tableName;
    String user;
    String password;

    public Post(){}

    public Post(String databaseName,String tableName,String user,String password){
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

    public boolean insert(String title,String summary,String content, int userId,int lableId){
        int result;
        try {
            connect();
            PreparedStatement pre = con.prepareStatement("insert into post(title,summary,content,createTime,userId,lableId)" +
                    " values(?,?,?,?,?,?)");
            pre.setString(1,title);
            pre.setString(2,summary);
            pre.setString(3,content);
            pre.setTimestamp(4,Timestamp.valueOf(Tools.getCurrentTime()));
            pre.setInt(5,userId);
            pre.setInt(6,lableId);

            result = pre.executeUpdate();
            if(result == 1){
                System.out.println("插入"+tableName+"数据成功");
                return true;
            }
            else {
                System.out.println("插入"+tableName+"数据失败");
                return false;
            }
        }
        catch (Exception e){
            System.out.println("插入"+tableName+"数据异常");
            System.out.println(e);
            return false;
        }
    }

    public boolean update(int id,String title,String summary,String content,int userId,int lableId){
        int result;
        try {
            connect();
            PreparedStatement pre = con.prepareStatement("update post set title=?,summary=?,content=?,userId=?,lableId=?" +
                    " where id=?");
            pre.setInt(6,id);
            pre.setString(1,title);
            pre.setString(2,summary);
            pre.setString(3,content);
            pre.setInt(4,userId);
            pre.setInt(5,lableId);
            result = pre.executeUpdate();

            if(result == 1){
                System.out.println("更新数据"+tableName+"成功");
                return true;
            }
            else {
                System.out.println("更新数据"+tableName+"失败");
                return false;
            }
        }
        catch (Exception e){
            System.out.println("更新数据"+tableName+"异常");
            System.out.println(e);
            return false;
        }
    }

    public boolean getDetailData(){
        try {
            rowSet = new CachedRowSetImpl();
            connect();
            PreparedStatement pre = con.prepareStatement("select post.id,post.title,post.summary,user.username,post.createTime,lable.id from post,user,lable" +
                    " where post.userId=user.id and post.lableId=lable.id order by post.createTime desc;");
            ResultSet resultSet = pre.executeQuery();

            rowSet.populate(resultSet);
            setData(rowSet,data,6);
            return true;
        }
        catch (Exception e){
            System.out.println("查询帖子细节失败");
            System.out.println(e);
            return false;
        }
    }

    public boolean getDetailDataByLike(String keyword){
        try {
            rowSet = new CachedRowSetImpl();
            connect();
            PreparedStatement pre = con.prepareStatement("select post.id,post.title,post.summary,user.username,post.createTime,lable.id from post,user,lable" +
                    " where post.userId=user.id and post.lableId=lable.id and post.title like '%"+keyword+"%' order by post.createTime desc;");
            ResultSet resultSet = pre.executeQuery();

            resultSet.last();
            rowNumber = resultSet.getRow();
            resultSet.beforeFirst();

            setPageNumberMax();

            rowSet.populate(resultSet);
            setData(rowSet,data,6);
            return true;
        }
        catch (Exception e){
            System.out.println("模糊查询失败");
            System.out.println(e);
            return false;
        }
        finally {
            closeConnect();
        }
    }

    public boolean getContent(int id){
        try {
            rowSet = new CachedRowSetImpl();
            connect();
            PreparedStatement pre = con.prepareStatement("select post.id,post.title,user.username,post.createTime,post.content " +
                    "from post,user where post.userId = user.id and post.id=?");
            pre.setInt(1,id);
            ResultSet resultSet = pre.executeQuery();
            rowSet.populate(resultSet);
            setData(rowSet,singleData,5);
            return true;
        }
        catch (Exception e){
            System.out.println(e);
            return false;
        }
    }

    public static void main(String[] args) {
        Post post = new Post(Config.DATABASENAME,"post",Config.USERNAME,Config.PASSWORD);
//        post.query("id",1);
//        post.showSingleData();
//        post.insert("6号帖子","6号帖子总结","6号帖子内容",1,1);
//        post.update(6,"6号帖子","6号帖子总结","6号帖子内容 update test1",1,1);
//        post.delete(6);
        post.setRowSet();
//        post.setDataAll();
//        post.getDetailData();
        post.getDetailDataByLike("测");
        post.showAllData();
//        post.getContent(1);
//        post.showSingleData();

    }
}

package util;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class User extends Database{
    String databaseName;
    String tableName;
    String user;
    String password;

    public User(){}

    public User(String databaseName, String tableName,String user,String password){
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

    public boolean insert(String username,String password,String email,String introduction){
        int result;
        try {
            connect();
            PreparedStatement pre = con.prepareStatement("insert into user(username,email,password,introduction) values(?,?,?,?)");
            pre.setString(1,username);
            pre.setString(2,email);
            pre.setString(3,password);
            pre.setString(4,introduction);
            result = pre.executeUpdate();
            if(result == 1){
                System.out.println("插入数据成功");
                return true;
            }
            else {
                System.out.println("插入数据失败");
                return false;
            }
        }
        catch (Exception e){
            System.out.println("插入数据失败");
            System.out.println(e);
            return false;
        }
        finally {
            closeConnect();
        }
    }

    public boolean update(int id,String username,String email,String password,String introduction){
        int result;
        try{
            connect();
            PreparedStatement pre = con.prepareStatement("update user set username=?,email=?,password=?,introduction=? where id=?");
            pre.setString(1,username);
            pre.setString(2,email);
            pre.setString(3,password);
            pre.setString(4,introduction);
            pre.setInt(5,id);
            result = pre.executeUpdate();

            if(result == 1){
                System.out.println("修改数据成功");
                return true;
            }
            else {
                System.out.println("修改数据失败");
                return false;
            }
        }
        catch (Exception e){
            System.out.println("修改数据失败");
            System.out.println(e);
            return false;
        }
        finally {
            closeConnect();
        }
    }

    public boolean isUser(String username,String password){
        int result = 0;
        try {
            connect();
            PreparedStatement pre = con.prepareStatement("select * from user where username=? and password=?");
            pre.setString(1,username);
            pre.setString(2,password);
            ResultSet resultSet = pre.executeQuery();
            while (resultSet.next()){
                result++;
            }
            if(result == 1){
                return true;
            }
            else {
                return false;
            }
        }
        catch (Exception e){
            System.out.println(e);
            return false;
        }
        finally {
            closeConnect();
        }
    }

    public int getUserId(String username){
        int id = 0;
        try {
            connect();
            PreparedStatement pre = con.prepareStatement("select id from user where username=?");
            pre.setString(1,username);
            ResultSet resultSet = pre.executeQuery();
            if(resultSet.next()){
                id = resultSet.getInt(1);
            }
            if(id == 0){
                System.out.println("获取用户 ID 失败");
            }
            return id;
        }
        catch (Exception e){
            System.out.println("获取用户 ID 失败");
            System.out.println(e);
            return id;
        }
        finally {
            closeConnect();
        }
    }

    public static void main(String[] args) {
        User u = new User("test","user","root","729532969");
//        u.insert("test3","test3@qq.com","test3","insert test3");
//        u.update(8,"test2","test2@qq.com","test2","insert test2 ,update test");
//        u.delete(9);
        u.setRowSet();
        u.setDataAll();
        u.showAllData();
//        System.out.println(u.isUser("白伟伟","123456"));
//        System.out.println(u.getUserId("张三"));
    }


}

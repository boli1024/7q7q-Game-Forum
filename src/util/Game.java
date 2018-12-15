package util;

import java.sql.PreparedStatement;
import java.sql.Timestamp;

public class Game extends Database {
    String databaseName;
    String tableName;
    String user;
    String password;
    int pageSize=3;

    public Game(){}

    public Game(String databaseName, String tableName,String user,String password){
        this.databaseName = databaseName;
        this.tableName = tableName;
        this.user = user;
        this.password = password;

        super.databaseName = databaseName;
        super.tableName = tableName;
        super.user = user;
        super.password = password;
        super.pageSize = this.pageSize;

        setColumnData();
    }

    public boolean insert(String name, String introduction, String source){
        int result;
        try {
            connect();
            PreparedStatement pre = con.prepareStatement("insert into game(name,introduction,inputTime,source) values(?,?,?,?)");
            pre.setString(1,name);
            pre.setString(2,introduction);
            pre.setTimestamp(3, Timestamp.valueOf(Tools.getCurrentTime()));
            pre.setString(4,source);
            result = pre.executeUpdate();
            if(result == 1){
                return true;
            }
            return false;
        }
        catch (Exception e){
            System.out.println(e);
            return false;
        }
        finally {
            closeConnect();
        }
    }

    public static void main(String[] args) {
        Game game = new Game(Config.DATABASENAME, "game", Config.USERNAME, Config.PASSWORD);
        game.insert("1","1","1");
        game.setRowSet();
        game.setDataAll();
        game.showAllData();
    }
}

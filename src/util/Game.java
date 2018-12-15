package util;

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

    public static void main(String[] args) {
        Game game = new Game(Config.DATABASENAME, "game", Config.USERNAME, Config.PASSWORD);
        game.setRowSet();
        game.setDataAll();
        game.showAllData();
    }
}

package util;

import com.sun.rowset.CachedRowSetImpl;

import java.sql.*;
import java.util.ArrayList;

public class Database {

    String databaseName;         // 数据库名
    String tableName;            // 表名
    String user;                 // 用户名
    String password;             // 密码

    int pageSize = 4;            // 每页显示的数据条数
    int pageNumberMax;           // 最多有多少页

    int columnNumber = 0;        // 列数
    int rowNumber;               // 行数
    ArrayList<String> columnNames = new ArrayList<>();         // 列名

    ArrayList<ArrayList<String>> data = new ArrayList<>();         // 数据集
    ArrayList<ArrayList<String>> singleData = new ArrayList<>();   // 单行数据集

    Connection con;       // 数据库连接对象
    CachedRowSetImpl rowSet;       // 数据库缓冲对象

    public Database(){}

    public Database(String databaseName, String tableName,String user,String password){
        this.databaseName = databaseName;
        this.tableName = tableName;
        this.user = user;
        this.password = password;

        setColumnData();
    }

    public String connect(){
//        连接数据库
        String tip;

        try{
            Class.forName("com.mysql.jdbc.Driver");
            String uri = "jdbc:mysql://localhost:3306/" + databaseName + "?useUnicode=true&characterEncoding=utf-8&serverTimezone=GMT";

            con = DriverManager.getConnection(uri,user,password);

            tip = "连接数据库成功\n";
            System.out.print(tip);
        }
        catch (Exception e){
            System.out.println(e);
            tip = "连接数据库失败\n";
            System.out.print(tip);
        }

        return tip;
    }

    public void closeConnect(){
//        关闭数据库连接
        try {
            con.close();
            System.out.println("连接关闭成功");
        }
        catch (Exception e){
            System.out.println("连接关闭失败");
            if(con == null){
                System.out.println("连接对象为空");
            }
            System.out.println(e);
        }
    }

    public void setColumnData(){
//        设置数据库列信息
        try {
            connect();
            DatabaseMetaData metaData = con.getMetaData();
            ResultSet columnData = metaData.getColumns(databaseName,null,tableName,null);
            // getColumns() 必须传入数据库名和表名，否则获取不到包含列名的 resultSet 对象

            while (columnData.next()){
                columnNumber++;
                columnNames.add(columnData.getString(4));
            }
        }
        catch (Exception e){
            System.out.println(e);
        }
        finally {
            closeConnect();
        }

    }

    public void setRowSet(){
//        获取数据库的全部信息，用于设置数据库总行数、分页的总页数
        try{
            connect();
            rowSet = new CachedRowSetImpl();

            PreparedStatement pre = con.prepareStatement("select * from " + tableName);
            ResultSet rs = pre.executeQuery();
            rowSet.populate(rs);

            rowSet.last();
            rowNumber = rowSet.getRow();
            rowSet.beforeFirst();

            setPageNumberMax();
        }
        catch (Exception e){
            System.out.print(e);
        }
        finally {
            closeConnect();
        }
    }

    public void setPageNumberMax(){
//        计算总页数
        pageNumberMax = rowNumber % pageSize > 0 ? rowNumber / pageSize + 1 : rowNumber / pageSize;
    }

    public void setDataAll(){
//        将数据库信息添加到 data 对象中
        setData(rowSet);
    }

    public void setData(CachedRowSetImpl rowSet){
//        指定数据集，将信息添加到 data 对象中
        setData(rowSet,data,columnNumber);
    }

    public void setData(CachedRowSetImpl rowSet, ArrayList<ArrayList<String>> data){
//        指定数据集、列表嵌套的 data 对象，将信息添加到 data 对象中，主要用于设置 singleData
        setData(rowSet,data,columnNumber);
    }

    public void setData(CachedRowSetImpl rowSet, ArrayList<ArrayList<String>> data,int columnNumber){
//        指定数据集、列表嵌套的 data 对象、数据集列数，将信息添加到 data 对象中，用于保存查询后的结果集
        /*
        * 给定缓冲对象rowSet，数据保存对象data，和列数columnNumber，将数据缓冲对象的columnNumber列保存到data中，
        * 列数作为参数的原因是，有的表中经过查询后的结果集的列数不一定为原表列数，故为防止异常，增加列数字段
        * */
        /* 这里清空 data 的数据不能使用 new ArrayList 的方法清空
           new 一个对象后，data 的地址已经改变，不是传进来的 data 的地址，故 new 以后执行函数，类属性 data 将永远为空
           解决方法：声明类属性 data 时就创建对象，需要清空数据时使用集合的 clear() 方法
           既不会改变地址，又可以随时清空集合的数据 */
        data.clear();
        ArrayList<String> list;
        try {
            rowSet.beforeFirst();
            while (rowSet.next()){
                list = new ArrayList<>();
                for (int count=1;count<=columnNumber;count++){
                    list.add(rowSet.getString(count));
                }
                data.add(list);
            }
            System.out.print("数据设置成功\n");
        }
        catch (Exception e){
            System.out.print(e);
            System.out.print("数据设置失败\n");
        }
    }

    public void setData(CachedRowSetImpl rowSet, int dataNumber,int columnNumber){
        //设置分页数据,参数为数据库缓冲对象、每页包含几条数据、每条数据的列数，将数据保存到data中
        data.clear();
        ArrayList<String> list;
        try {
            for (int count=0;count<dataNumber;count++){
                list = new ArrayList<>();
                for (int count1=1;count1<=columnNumber;count1++){
                    list.add(rowSet.getString(count1));
                }
                data.add(list);

                if(!rowSet.next()){
                    break;
                }

            }
            System.out.print("数据设置成功\n");
        }
        catch (Exception e){
            System.out.print(e);
            System.out.print("数据设置失败\n");
        }
    }

    public void setData(CachedRowSetImpl rowSet,int dataNumber){
        //不输入每行列数，默认为本表的列数
        setData(rowSet,dataNumber,columnNumber);
    }

    public void showData(ArrayList<ArrayList<String>> data){
//        在控制台显示指定数据集 data 中的数据
        for (int count=0;count < columnNames.size();count++){
            System.out.print(columnNames.get(count) + "   ");
        }
        System.out.print("\n");
        if(data != null){
            for(int count1=0;count1 < data.size();count1++){
                ArrayList<String> list = new ArrayList<>();
                list = data.get(count1);
                for(int count2=0;count2<list.size();count2++){
                    System.out.print(list.get(count2) + "   ");
                }
                System.out.print("\n");
            }
        }
    }

    public void showAllData(){
//        显示 data 的数据
        showData(data);
    }

    public void showSingleData(){
//        显示 singleData 的数据
        showData(singleData);
    }

    public ArrayList<ArrayList<String>> getData(){
        return data;
    }

    public ArrayList<ArrayList<String>> getSingleData(){
        return singleData;
    }

    public void getPageData(int page){
//      设置分页信息，参数为第几页
        if(page > pageNumberMax){
            page = 1;
        }
        if (page <= 0){
            page = pageNumberMax;
        }
        try {
            rowSet.absolute((page - 1) * pageSize + 1);
            setData(rowSet, pageSize);
            rowSet.beforeFirst();
        }
        catch (Exception e){
            System.out.print(e);
        }
    }

    public void getPageData(int page,int columnNumber){
//        设置分页数据，参数为页数、列数
        if(page > pageNumberMax){
            page = 1;
        }
        if (page <= 0){
            page = pageNumberMax;
        }
        if(columnNumber == 0){
            columnNumber = this.columnNumber;
        }
        try {
            rowSet.absolute((page - 1) * pageSize + 1);
            setData(rowSet, pageSize,columnNumber);
            rowSet.beforeFirst();
        }
        catch (Exception e){
            System.out.print(e);
        }
    }

    public int getPageNumberMax() {
        return pageNumberMax;
    }

    public boolean query(String column, Object value){
//        查询，参数为：列名，列名对应的值
        try {
            connect();
            PreparedStatement pre = con.prepareStatement("select * from " + tableName + " where "+column+" = ?");
            // tableName 与 where 之间要加空格(在 where 语句前加)，不然就是 "select * from userwhere id = ?",直接就会抛出异常
            if(value instanceof Integer){
                pre.setInt(1,(Integer) value);
            }
            else if (value instanceof String){
                pre.setString(1,(String) value);
            }
            else if (value instanceof Float){
                pre.setFloat(1,(Float) value);
            }
            else if(value instanceof Double){
                pre.setDouble(1,(Double) value);
            }
            else if (value instanceof Long) {
                pre.setLong(1, (Long) value);
            }
            else {
                System.out.println("不支持的数据类型");
            }


            ResultSet resultSet = pre.executeQuery();

            CachedRowSetImpl rowSet = new CachedRowSetImpl();
            rowSet.populate(resultSet);
            rowSet.beforeFirst();
            setData(rowSet,singleData);

            return true;
        }
        catch (Exception e){
            System.out.print(e);
            return false;
        }
        finally {
            closeConnect();
        }
    }

    public boolean delete(int id){
//        删除，参数为：数据库字段的 id
        int result = 0;
        try{
            connect();
            PreparedStatement pre = con.prepareStatement("delete from "+tableName+" where id = ? ");
            pre.setInt(1,id);
            result = pre.executeUpdate();
            if(result == 1){
                System.out.println("删除数据成功");
                return true;
            }
            else {
                System.out.println("删除数据失败");
                return false;
            }
        }
        catch (Exception e){
            System.out.println("删除数据失败");
            System.out.println(e);
            return false;
        }
        finally {
            closeConnect();
        }
    }


    public static void main(String[] args) {
        Database db = new Database(Config.DATABASENAME,"user",Config.USERNAME,Config.PASSWORD);
//        db.showData();
        db.setRowSet();
        db.setDataAll();
//        db.getPageData(4);
//        db.showData();
//        db.reConnect();
//        db.query("username","张三");
        db.showAllData();
//        System.out.print(db.rowNumber);
//        System.out.print(db.pageNumberMax);

    }
}

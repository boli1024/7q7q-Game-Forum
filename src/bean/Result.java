package bean;

import java.util.ArrayList;

public class Result {
    boolean boolResult;
    String stringResult;
    ArrayList<String> listResult = new ArrayList<>();

    public Result(){}

    public Result(boolean result){
        this.boolResult = result;
    }

    public Result(String stringResult){
        this.stringResult = stringResult;
    }

    public void setBoolResult(boolean boolResult) {
        this.boolResult = boolResult;
    }

    public void setStringResult(String stringResult) {
        this.stringResult = stringResult;
    }

    public boolean getBoolResult() {
        return boolResult;
    }

    public String getStringResult() {
        return stringResult;
    }

    public void setListResult(ArrayList<String> listResult) {
        this.listResult = listResult;
    }

    public ArrayList<String> getListResult() {
        return listResult;
    }
}

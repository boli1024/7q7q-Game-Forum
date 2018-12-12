package bean;

import java.util.ArrayList;

public class UserUpdate {
    String id;
    String username;
    String password;
    String email;
    String introduction;

    public UserUpdate(){}

    public UserUpdate(ArrayList<ArrayList<String>> data){
        ArrayList<String> userData = data.get(0);
        id = userData.get(0);
        username = userData.get(1);
        password = userData.get(2);
        email = userData.get(3);
        introduction = userData.get(4);
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getIntroduction() {
        return introduction;
    }
}

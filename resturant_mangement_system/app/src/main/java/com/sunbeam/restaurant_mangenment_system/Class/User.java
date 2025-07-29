package com.sunbeam.restaurant_mangenment_system.Class;

public class User {
    private String email;
    private String passwd;

    public User() {
    }

    public User(String email, String passwd) {
        this.email = email;
        this.passwd = passwd;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    @Override
    public String toString() {
        return "User{" +
                "email='" + email + '\'' +
                ", passwd='" + passwd + '\'' +
                '}';
    }
}

package com.sunbeam.restaurant_mangenment_system.Class;

public class User {
    private String email;
    private String passwd;
    private String name;
    private int phone;
    private String role="Customer";

    public User() {
    }

    public User(String email, String passwd, String name, int phone,String role) {
        this.email = email;
        this.passwd = passwd;
        this.name = name;
        this.phone = phone;
        this.role=role;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "User{" +
                "email='" + email + '\'' +
                ", passwd='" + passwd + '\'' +
                ", name='" + name + '\'' +
                ", phone=" + phone +
                ", role='" + role + '\'' +
                '}';
    }
}

package com.sunbeam.restaurant_mangenment_system.Class;

public class Owner {

 private String email;
 private String name;
 private String resto_name;

 private String passwd;

 private String location;

 private String phone;

 public Owner(){

 };

 public Owner (String email,String name,String resto_name,String passwd,String location,String phone){
     this.email=email;
     this.passwd=passwd;
     this.resto_name=resto_name;
     this.location=location;
     this.phone=phone;
     this.name=name;

 }
    public String getemail() {
        return email;
    }

    public void setemail(String email) {
        this.email = email;
    }

    public String getpasswd() {
        return passwd;
    }

    public void setpasswd(String passwd) {
        this.passwd = passwd;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getResto_name() {
        return resto_name;
    }

    public void setResto_name(String resto_name) {
        this.resto_name = resto_name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
    @Override
    public String toString() {
        return "Owner{" +
                "email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", resto_name='" + resto_name + '\'' +
                ", passwd='" + passwd + '\'' +
                ", location='" + location + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}

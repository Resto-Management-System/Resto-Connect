package com.sunbeam.restaurant_mangenment_system.Class;

public class Restaurant {
    private int resto_id;
    private int owner_id;
    private String name;
    private String loction;
    public Restaurant() {
    }

    public Restaurant(int resto_id, int owner_id, String name, String loction) {
        this.resto_id = resto_id;
        this.owner_id = owner_id;
        this.name = name;
        this.loction = loction;
    }

    public int getResto_id() {
        return resto_id;
    }

    public void setResto_id(int resto_id) {
        this.resto_id = resto_id;
    }

    public int getOwner_id() {
        return owner_id;
    }

    public void setOwner_id(int owner_id) {
        this.owner_id = owner_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLoction() {
        return loction;
    }

    public void setLoction(String loction) {
        this.loction = loction;
    }

    @Override
    public String toString() {
        return "Restaurant{" +
                "resto_id=" + resto_id +
                ", owner_id=" + owner_id +
                ", name='" + name + '\'' +
                ", loction='" + loction + '\'' +
                '}';
    }
}

package com.sunbeam.restaurant_mangenment_system.Class;

public class Table {
    private int capacity;
    private float charge;
    private String category;

    public Table() {
    }

    public Table(int capacity, float charge, String category) {
        this.capacity = capacity;
        this.charge = charge;
        this.category = category;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public float getCharge() {
        return charge;
    }

    public void setCharge(float charge) {
        this.charge = charge;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Table{" +
                "capacity=" + capacity +
                ", charge=" + charge +
                ", category='" + category + '\'' +
                '}';
    }
}

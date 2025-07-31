package com.sunbeam.restaurant_mangenment_system.Class;

public class Table {
    private int table_id;
    private int resto_id;
    private int capacity;
    private int charge;
    private String category;

    public Table() {
    }

    public Table(int capacity, int charge, String category,int table_id,int resto_id) {
        this.capacity = capacity;
        this.charge = charge;
        this.category = category;
        this.table_id= table_id;
        this.resto_id =resto_id;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public int getCharge() {
        return charge;
    }

    public void setCharge(int charge) {
        this.charge =  charge;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getTable_id() {
        return table_id;
    }

    public void setTable_id(int table_id) {
        this.table_id = table_id;
    }

    public int getResto_id() {
        return resto_id;
    }

    public void setResto_id(int resto_id) {
        this.resto_id = resto_id;
    }

    @Override
    public String toString() {
        return "Table{" +
                "table_id=" + table_id +
                ", resto_id=" + resto_id +
                ", capacity=" + capacity +
                ", charge=" + charge +
                ", category='" + category + '\'' +
                '}';
    }
}

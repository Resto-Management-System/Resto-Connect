package com.sunbeam.restaurant_mangenment_system.Class;

import java.util.List;

public class BookingTable {
    private List<Table> tableList;
    private List<Item> menuList;
    private String start_time;
    private String end_time;
    private int charge;
    private int price;
    private int total_amount;

    public BookingTable(List<Table> tableList, List<Item> menuList, String start_time, String end_time, int charge, int price, int total_amount) {
        this.tableList = tableList;
        this.menuList = menuList;
        this.start_time = start_time;
        this.end_time = end_time;
        this.charge = charge;
        this.price = price;
        this.total_amount = total_amount;
    }

    public List<Table> getTableList() {
        return tableList;
    }

    public void setTableList(List<Table> tableList) {
        this.tableList = tableList;
    }

    public List<Item> getMenuList() {
        return menuList;
    }

    public void setMenuList(List<Item> menuList) {
        this.menuList = menuList;
    }

    public String getStart_time() {
        return start_time;
    }

    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }

    public String getEnd_time() {
        return end_time;
    }

    public void setEnd_time(String end_time) {
        this.end_time = end_time;
    }

    public int getCharge() {
        return charge;
    }

    public void setCharge(int charge) {
        this.charge = charge;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getTotal_amount() {
        return total_amount;
    }

    public void setTotal_amount(int total_amount) {
        this.total_amount = total_amount;
    }

    @Override
    public String toString() {
        return "BookingTable{" +
                "tableList=" + tableList +
                ", menuList=" + menuList +
                ", start_time='" + start_time + '\'' +
                ", end_time='" + end_time + '\'' +
                ", charge=" + charge +
                ", price=" + price +
                ", total_amount=" + total_amount +
                '}';
    }
}

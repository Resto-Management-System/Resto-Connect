package com.sunbeam.restaurant_mangenment_system.Class;

import java.util.List;

public class Cart {
    private int booking_id;
    private int resto_id;
    private List<Table> tableList;
    private String start_time;
    private String end_time;
    private String booking_status;
    private String resto_name;
    private String resto_loction;
    private int order_id;
    private int detail_id;
    private int item_id;
    private String item_name;
    private int price;
    private String menu_category;
    private int quantity;
    private int table_id;
    private int table_capacity;
    private int table_charge;
    private String table_category;
    private int bill_id;
    private int item_total;
    private int total_amount;
    private String bill_status;

    public Cart() {
    }

    public Cart(int booking_id, int resto_id, List<Table> tableList, String start_time, String end_time, String booking_status, String resto_name, String resto_loction, int order_id, int detail_id, int item_id, String item_name, int price, String menu_category, int quantity, int table_id, int table_capacity, int table_charge, String table_category, int bill_id, int item_total, int total_amount, String bill_status) {
        this.booking_id = booking_id;
        this.resto_id = resto_id;
        this.tableList = tableList;
        this.start_time = start_time;
        this.end_time = end_time;
        this.booking_status = booking_status;
        this.resto_name = resto_name;
        this.resto_loction = resto_loction;
        this.order_id = order_id;
        this.detail_id = detail_id;
        this.item_id = item_id;
        this.item_name = item_name;
        this.price = price;
        this.menu_category = menu_category;
        this.quantity = quantity;
        this.table_id = table_id;
        this.table_capacity = table_capacity;
        this.table_charge = table_charge;
        this.table_category = table_category;
        this.bill_id = bill_id;
        this.item_total = item_total;
        this.total_amount = total_amount;
        this.bill_status = bill_status;
    }

    public int getBooking_id() {
        return booking_id;
    }

    public void setBooking_id(int booking_id) {
        this.booking_id = booking_id;
    }

    public int getResto_id() {
        return resto_id;
    }

    public void setResto_id(int resto_id) {
        this.resto_id = resto_id;
    }

    public List<Table> getTableList() {
        return tableList;
    }

    public void setTableList(List<Table> tableList) {
        this.tableList = tableList;
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

    public String getBooking_status() {
        return booking_status;
    }

    public void setBooking_status(String booking_status) {
        this.booking_status = booking_status;
    }

    public String getResto_name() {
        return resto_name;
    }

    public void setResto_name(String resto_name) {
        this.resto_name = resto_name;
    }

    public String getResto_loction() {
        return resto_loction;
    }

    public void setResto_loction(String resto_loction) {
        this.resto_loction = resto_loction;
    }

    public int getOrder_id() {
        return order_id;
    }

    public void setOrder_id(int order_id) {
        this.order_id = order_id;
    }

    public int getDetail_id() {
        return detail_id;
    }

    public void setDetail_id(int detail_id) {
        this.detail_id = detail_id;
    }

    public int getItem_id() {
        return item_id;
    }

    public void setItem_id(int item_id) {
        this.item_id = item_id;
    }

    public String getItem_name() {
        return item_name;
    }

    public void setItem_name(String item_name) {
        this.item_name = item_name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getMenu_category() {
        return menu_category;
    }

    public void setMenu_category(String menu_category) {
        this.menu_category = menu_category;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getTable_id() {
        return table_id;
    }

    public void setTable_id(int table_id) {
        this.table_id = table_id;
    }

    public int getTable_capacity() {
        return table_capacity;
    }

    public void setTable_capacity(int table_capacity) {
        this.table_capacity = table_capacity;
    }

    public int getTable_charge() {
        return table_charge;
    }

    public void setTable_charge(int table_charge) {
        this.table_charge = table_charge;
    }

    public String getTable_category() {
        return table_category;
    }

    public void setTable_category(String table_category) {
        this.table_category = table_category;
    }

    public int getBill_id() {
        return bill_id;
    }

    public void setBill_id(int bill_id) {
        this.bill_id = bill_id;
    }

    public int getItem_total() {
        return item_total;
    }

    public void setItem_total(int item_total) {
        this.item_total = item_total;
    }

    public int getTotal_amount() {
        return total_amount;
    }

    public void setTotal_amount(int total_amount) {
        this.total_amount = total_amount;
    }

    public String getBill_status() {
        return bill_status;
    }

    public void setBill_status(String bill_status) {
        this.bill_status = bill_status;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "booking_id=" + booking_id +
                ", resto_id=" + resto_id +
                ", tableList=" + tableList +
                ", start_time='" + start_time + '\'' +
                ", end_time='" + end_time + '\'' +
                ", booking_status='" + booking_status + '\'' +
                ", resto_name='" + resto_name + '\'' +
                ", resto_loction='" + resto_loction + '\'' +
                ", order_id=" + order_id +
                ", detail_id=" + detail_id +
                ", item_id=" + item_id +
                ", item_name='" + item_name + '\'' +
                ", price=" + price +
                ", menu_category='" + menu_category + '\'' +
                ", quantity=" + quantity +
                ", table_id=" + table_id +
                ", table_capacity=" + table_capacity +
                ", table_charge=" + table_charge +
                ", table_category='" + table_category + '\'' +
                ", bill_id=" + bill_id +
                ", item_total=" + item_total +
                ", total_amount=" + total_amount +
                ", bill_status='" + bill_status + '\'' +
                '}';
    }
}

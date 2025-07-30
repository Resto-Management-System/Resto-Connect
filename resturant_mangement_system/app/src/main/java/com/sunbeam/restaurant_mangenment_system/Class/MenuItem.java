package com.sunbeam.restaurant_mangenment_system.Class;

public class MenuItem {
    private int item_id;
    private String item_name;
    private double price;
    private String category;

    // Constructor with item_id (used for GET responses)
    public MenuItem(int item_id, String item_name, double price, String category) {
        this.item_id = item_id;
        this.item_name = item_name;
        this.price = price;
        this.category = category;
    }

    // Constructor without item_id (used for POST requests)
    public MenuItem(String item_name, double price, String category) {
        this.item_name = item_name;
        this.price = price;
        this.category = category;
    }


    public int getItem_id() { return item_id; }
    public String getItem_name() { return item_name; }
    public double getPrice() { return price; }
    public String getCategory() { return category; }
}
package com.sunbeam.restaurant_mangenment_system.Class;

import android.os.Parcel;
import android.os.Parcelable;

import androidx.annotation.NonNull;

public class Item implements Parcelable {
    private int item_id;
    private int resto_id;
    private String item_name;
    private int price;
    private String category;

    public Item() {
    }

    public Item(int item_id, int resto_id, String item_name, int price, String category) {
        this.item_id = item_id;
        this.resto_id = resto_id;
        this.item_name = item_name;
        this.price = price;
        this.category = category;
    }

    protected Item(Parcel in) {
        item_id = in.readInt();
        resto_id = in.readInt();
        item_name = in.readString();
        price = in.readInt();
        category = in.readString();
    }

    public static final Creator<Item> CREATOR = new Creator<Item>() {
        @Override
        public Item createFromParcel(Parcel in) {
            return new Item(in);
        }

        @Override
        public Item[] newArray(int size) {
            return new Item[size];
        }
    };

    public int getItem_id() {
        return item_id;
    }

    public void setItem_id(int item_id) {
        this.item_id = item_id;
    }

    public int getResto_id() {
        return resto_id;
    }

    public void setResto_id(int resto_id) {
        this.resto_id = resto_id;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Item{" +
                "item_id=" + item_id +
                ", resto_id=" + resto_id +
                ", item_name='" + item_name + '\'' +
                ", price=" + price +
                ", category='" + category + '\'' +
                '}';
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(@NonNull Parcel dest, int flags) {
        dest.writeInt(item_id);
        dest.writeInt(resto_id);
        dest.writeString(item_name);
        dest.writeInt(price);
        dest.writeString(category);
    }
}

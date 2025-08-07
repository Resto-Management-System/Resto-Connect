package com.sunbeam.restaurant_mangenment_system.Class;

import android.os.Parcel;
import android.os.Parcelable;

import androidx.annotation.NonNull;

public class Table implements Parcelable {
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

    protected Table(Parcel in) {
        table_id = in.readInt();
        resto_id = in.readInt();
        capacity = in.readInt();
        charge = in.readInt();
        category = in.readString();
    }

    public static final Creator<Table> CREATOR = new Creator<Table>() {
        @Override
        public Table createFromParcel(Parcel in) {
            return new Table(in);
        }

        @Override
        public Table[] newArray(int size) {
            return new Table[size];
        }
    };

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


    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(@NonNull Parcel dest, int flags) {
        dest.writeInt(table_id);
        dest.writeInt(resto_id);
        dest.writeInt(capacity);
        dest.writeInt(charge);
        dest.writeString(category);
    }
}

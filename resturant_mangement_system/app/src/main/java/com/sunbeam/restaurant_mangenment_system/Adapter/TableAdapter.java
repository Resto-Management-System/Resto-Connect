package com.sunbeam.restaurant_mangenment_system.Adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.sunbeam.restaurant_mangenment_system.Class.Table;

import java.util.List;

public class TableAdapter extends RecyclerView.Adapter<TableAdapter.MyViewHolder> {
    Context context;
    List<Table> tableList;

    public TableAdapter(Context context, List<Table> tableList) {
        this.context = context;
        this.tableList = tableList;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view= LayoutInflater.from(context).inflate();
        return null;
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {

    }

    @Override
    public int getItemCount() {
        return tableList.size();
    }

    class MyViewHolder extends RecyclerView.ViewHolder{

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
        }
    }
}

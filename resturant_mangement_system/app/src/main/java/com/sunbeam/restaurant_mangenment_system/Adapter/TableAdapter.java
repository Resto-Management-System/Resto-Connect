package com.sunbeam.restaurant_mangenment_system.Adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.sunbeam.restaurant_mangenment_system.Class.Table;
import com.sunbeam.restaurant_mangenment_system.R;

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
        View view= LayoutInflater.from(context).inflate(R.layout.table_list,null);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        holder.textCategory.setText(tableList.get(position).getCapacity());
        holder.textCapacity.setText(tableList.get(position).getCapacity());
        holder.textCharges.setText(tableList.get(position).getCharge());
    }

    @Override
    public int getItemCount() {
        return tableList.size();
    }

    class MyViewHolder extends RecyclerView.ViewHolder{
        TextView textCategory,textCapacity,textCharges;
        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            textCategory=itemView.findViewById(R.id.textCategory);
            textCapacity=itemView.findViewById(R.id.textCapacity);
            textCharges=itemView.findViewById(R.id.textCharges);
        }
    }
}

package com.sunbeam.restaurant_mangenment_system.Adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.sunbeam.restaurant_mangenment_system.Class.Item;
import com.sunbeam.restaurant_mangenment_system.Class.Table;
import com.sunbeam.restaurant_mangenment_system.R;


import java.util.List;

public class TableAdapter extends RecyclerView.Adapter<TableAdapter.MyViewHolder> {
    public interface OnItemClickListener {
        void onItemClick(Table table);
    }

    public interface OnDeleteClickListener {
        void onDeleteClick(Table table);
    }

    List<Table> tableList;
    List<Table> altList;
    Context context;
    boolean isAddAction;
    OnItemClickListener addListener;
    OnDeleteClickListener deleteListener;

    public TableAdapter(Context context, List<Table> tableList, List<Table> altList,
                        boolean isAddAction,
                        OnItemClickListener addListener,
                        OnDeleteClickListener deleteListener) {
        this.context = context;
        this.tableList = tableList;
        this.altList = altList;
        this.isAddAction = isAddAction;
        this.addListener = addListener;
        this.deleteListener = deleteListener;
    }


    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view= LayoutInflater.from(context).inflate(R.layout.table_list,null);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        Table table = tableList.get(position);
        //Toast.makeText(context,table+"",Toast.LENGTH_SHORT).show();
        holder.textTableID.setText(String.valueOf(table.getTable_id())+String.valueOf(table.getResto_id()));
        holder.textCategory.setText(table.getCategory()); // ✅ category is a String
        holder.textCapacity.setText(String.valueOf(table.getCapacity())); // ✅ Convert int to String
        holder.textCharges.setText(String.valueOf(table.getCharge()));

        holder.itemView.setOnClickListener(v -> {
            if (isAddAction && addListener != null)
                addListener.onItemClick(table);
        });
        holder.btnDelete.setVisibility(isAddAction ? View.GONE : View.VISIBLE);
        holder.btnDelete.setOnClickListener(v -> {
            if (!isAddAction && deleteListener != null)
                deleteListener.onDeleteClick(table);
        });

    }

    @Override
    public int getItemCount() {
        return tableList.size();
    }

    class MyViewHolder extends RecyclerView.ViewHolder{
        TextView textCategory,textCapacity,textCharges,textTableID;
        Button btnDelete;
        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            textTableID=itemView.findViewById(R.id.textTableID);
            textCategory=itemView.findViewById(R.id.textCategory);
            textCapacity=itemView.findViewById(R.id.textCapacity);
            textCharges=itemView.findViewById(R.id.textCharges);
            btnDelete = itemView.findViewById(R.id.btnDelete);
        }
    }

}

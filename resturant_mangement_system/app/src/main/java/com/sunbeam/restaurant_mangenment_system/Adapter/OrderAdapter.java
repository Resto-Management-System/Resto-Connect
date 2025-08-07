package com.sunbeam.restaurant_mangenment_system.Adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Adapter;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.sunbeam.restaurant_mangenment_system.Class.Item;
import com.sunbeam.restaurant_mangenment_system.Class.Table;
import com.sunbeam.restaurant_mangenment_system.R;

import java.util.List;

public class OrderAdapter extends RecyclerView.Adapter<OrderAdapter.MyViewHolder> {
    Context context;
    List<Object> combineList;

    public OrderAdapter(Context context, List<Object> combineList) {
        this.context = context;
        this.combineList=combineList;

    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view= LayoutInflater.from(context).inflate(R.layout.order_list,null);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        Object combine=combineList.get(position);
        if (combine instanceof Table){
            holder.textID.setText(" "+((Table) combine).getResto_id()+((Table) combine).getTable_id());
            holder.textCapacity.setText(" "+((Table) combine).getCapacity());
            holder.textCategory.setText(" "+((Table) combine).getCategory());
            holder.textCharges.setText(" "+((Table) combine).getCharge());
        } else if (combine instanceof Item) {
            holder.textID.setText(" "+((Item) combine).getResto_id()+((Item) combine).getItem_id());
            holder.textCapacity.setText("1");
            holder.textCategory.setText(" "+((Item) combine).getCategory());
            holder.textCharges.setText(" "+((Item) combine).getPrice());
        }

    }

    @Override
    public int getItemCount() {
        return combineList.size();
    }

    class MyViewHolder extends RecyclerView.ViewHolder{
        TextView textID,textCategory,textCapacity,textCharges;
        Button btnDelete;
        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            textID=itemView.findViewById(R.id.textID);
            textCategory=itemView.findViewById(R.id.textCategory);
            textCapacity=itemView.findViewById(R.id.textCapacity);
            textCharges=itemView.findViewById(R.id.textCharges);
            btnDelete=itemView.findViewById(R.id.btnDelete);
        }
    }
}

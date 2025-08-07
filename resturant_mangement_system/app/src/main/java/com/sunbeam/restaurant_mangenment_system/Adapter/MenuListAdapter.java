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

public class MenuListAdapter extends RecyclerView.Adapter<MenuListAdapter.MyViewHolder> {
    public interface OnItemClickListener {
        void onItemClick(Item item);
    }

    public interface OnDeleteClickListener {
        void onDeleteClick(Item item);
    }

    List<Item> menuList;
    List<Item> altList;
    Context context;
    boolean isAddAction;
    OnItemClickListener addListener;
    OnDeleteClickListener deleteListener;

    public MenuListAdapter(Context context, List<Item> menuList,List<Item> altList,
                           boolean isAddAction,
                           OnItemClickListener addListener,
                           OnDeleteClickListener deleteListener) {
        this.context = context;
        this.menuList = menuList;
        this.altList = altList;
        this.isAddAction = isAddAction;
        this.addListener = addListener;
        this.deleteListener = deleteListener;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.menu_list_item,null);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        Item item = menuList.get(position);
        holder.textItemName.setText(item.getItem_name());
        holder.textItemCategory.setText("Category: " + item.getCategory());
        holder.textItemPrice.setText("Price: ₹" + item.getPrice());

        holder.itemView.setOnClickListener(v -> {
            if (isAddAction && addListener != null)
                addListener.onItemClick(item);
        });
        holder.btnDelete.setVisibility(isAddAction ? View.GONE : View.VISIBLE);
        holder.btnDelete.setOnClickListener(v -> {
            if (!isAddAction && deleteListener != null)
                deleteListener.onDeleteClick(item);
        });
    }

    @Override
    public int getItemCount() {
        return menuList.size();
    }

    public static class MyViewHolder extends RecyclerView.ViewHolder {
        TextView textItemName, textItemCategory, textItemPrice;
        Button btnDelete;
        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            textItemName = itemView.findViewById(R.id.textItemName);
            textItemCategory = itemView.findViewById(R.id.textItemCategory);
            textItemPrice = itemView.findViewById(R.id.textItemPrice);
            btnDelete=itemView.findViewById(R.id.btnDelete);
        }
    }
}


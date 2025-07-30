package com.sunbeam.restaurant_mangenment_system.Adapter;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.widget.PopupMenu;
import androidx.recyclerview.widget.RecyclerView;

import com.sunbeam.restaurant_mangenment_system.Class.PrefsHelper;
import com.sunbeam.restaurant_mangenment_system.Class.Table;
import com.sunbeam.restaurant_mangenment_system.R;
import com.sunbeam.restaurant_mangenment_system.Utils.RetrofitClient;
import com.sunbeam.restaurant_mangenment_system.activity.addTableActivity;

import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

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
        Table table = tableList.get(position);
        //Toast.makeText(context,table+"",Toast.LENGTH_SHORT).show();

        holder.textCategory.setText(table.getCategory()); // ✅ category is a String
        holder.textCapacity.setText(String.valueOf(table.getCapacity())); // ✅ Convert int to String
        holder.textCharges.setText(String.valueOf(table.getCharge()));

        holder.itemView.setOnClickListener(v -> {
            // Show popup menu
            PopupMenu popup = new PopupMenu(context, v);
            popup.getMenuInflater().inflate(R.menu.menu_table_item, popup.getMenu());

            popup.setOnMenuItemClickListener(item -> {
                if (item.getItemId() == R.id.action_delete) {
                    // Call delete method

                    deleteTable(table.getTable_id(), position);  // implement this
                    return true;
                } else if (item.getItemId() == R.id.action_update) {
                    Intent intent = new Intent(context, addTableActivity.class);
                    intent.putExtra("isUpdate", true);
                    intent.putExtra("tableId", table.getTable_id());
                    intent.putExtra("category", table.getCategory());
                    intent.putExtra("capacity", table.getCapacity());
                    intent.putExtra("charge", table.getCharge());
                    context.startActivity(intent);
                    return true;
                }
                return false;
            });

            popup.show();
        });
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
    private void deleteTable(int tableId, int position) {
        String token = PrefsHelper.getToken(context);
        String bearerToken = "Bearer " + token;

        RetrofitClient.getInstance().getApi().deleteTable(bearerToken, tableId).enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                if (response.isSuccessful()) {
                    tableList.remove(position);
                    notifyItemRemoved(position);
                    Toast.makeText(context, "Table deleted", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(context, "Failed to delete table", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Toast.makeText(context, "Network error", Toast.LENGTH_SHORT).show();
            }
        });
    }
}

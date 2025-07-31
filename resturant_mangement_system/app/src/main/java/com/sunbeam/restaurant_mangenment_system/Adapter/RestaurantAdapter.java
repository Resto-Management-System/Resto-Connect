package com.sunbeam.restaurant_mangenment_system.Adapter;



import static androidx.core.content.ContextCompat.startActivity;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.sunbeam.restaurant_mangenment_system.Class.Restaurant;
import com.sunbeam.restaurant_mangenment_system.R;
import com.sunbeam.restaurant_mangenment_system.activity.BookTableActivity;

import java.util.List;

public class RestaurantAdapter extends RecyclerView.Adapter<RestaurantAdapter.MyViewHolder> {

    Context context;
    List<Restaurant> restoList;

    public RestaurantAdapter(Context context, List<Restaurant> restoList) {
        this.context = context;
        this.restoList = restoList;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view= LayoutInflater.from(context).inflate(R.layout.resto_list,null);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        Restaurant restaurant=restoList.get(position);
        holder.textRestoName.setText(restaurant.getName());
        holder.textAddress.setText(restaurant.getLoction());

        holder.itemView.setOnClickListener(v->{
            Intent intent=new Intent(context, BookTableActivity.class);
            intent.putExtra("resto_id",restaurant.getResto_id());
            context.startActivity(intent);

        });



    }

    @Override
    public int getItemCount() {
        return restoList.size();
    }

    class MyViewHolder extends RecyclerView.ViewHolder{
        TextView textRestoName,textAddress;
        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            textRestoName=itemView.findViewById(R.id.textRestoName);
            textAddress=itemView.findViewById(R.id.textAddress);
        }
    }
}

package com.sunbeam.restaurant_mangenment_system.Adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.sunbeam.restaurant_mangenment_system.Class.Cart;
import com.sunbeam.restaurant_mangenment_system.R;

import org.json.JSONArray;

import java.util.List;

public class MyBokkingAdapter extends RecyclerView.Adapter<MyBokkingAdapter.MyViewHolder> {

    Context context;
    List<Cart> bookingList;

    public MyBokkingAdapter(Context context, List<Cart> bookingList) {
        this.context = context;
        this.bookingList = bookingList;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view= LayoutInflater.from(context).inflate(R.layout.my_booking_list,null);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        Cart cart=bookingList.get(position);

        holder.textViewBookingID.setText(String.valueOf(cart.getBooking_id()));
        holder.textViewTotal.setText(String.valueOf(cart.getTotal_amount()));
        holder.textViewrestoName.setText(cart.getResto_name());

    }

    @Override
    public int getItemCount() {
        return bookingList.size();
    }

    class MyViewHolder extends RecyclerView.ViewHolder{
        TextView textViewBookingID,textViewTotal,textViewrestoName;
        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            textViewTotal=itemView.findViewById(R.id.textViewTotal);
            textViewBookingID=itemView.findViewById(R.id.textViewBookingID);
            textViewrestoName=itemView.findViewById(R.id.textViewrestoName);
        }
    }
}

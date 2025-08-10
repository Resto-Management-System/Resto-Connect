package com.sunbeam.restaurant_mangenment_system.Fragments;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.sunbeam.restaurant_mangenment_system.Adapter.MyBokkingAdapter;
import com.sunbeam.restaurant_mangenment_system.Class.Cart;
import com.sunbeam.restaurant_mangenment_system.Class.PrefsHelper;
import com.sunbeam.restaurant_mangenment_system.Class.Table;
import com.sunbeam.restaurant_mangenment_system.R;
import com.sunbeam.restaurant_mangenment_system.Utils.RetrofitClient;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class MyBookingFragment extends Fragment {

    RecyclerView recycleViewMyBooking;
    List<Cart> bookingList;
    MyBokkingAdapter myBokkingAdapter;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_my_booking, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        recycleViewMyBooking=view.findViewById(R.id.recycleViewMyBooking);


        bookingList=new ArrayList<>();
        myBokkingAdapter=new MyBokkingAdapter(getContext(),bookingList);
        recycleViewMyBooking.setAdapter(myBokkingAdapter);
        recycleViewMyBooking.setLayoutManager(new LinearLayoutManager(getContext()));

    }

    @Override
    public void onResume() {
        super.onResume();
        getData();
    }

    public void  getData(){
        PrefsHelper prefsHelper=new PrefsHelper();

        String token=prefsHelper.getToken(getContext());

        String BearerToken="Bearer"+" "+token;
        RetrofitClient.getInstance().getApi().getBookings(BearerToken).enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                try {
                    if (!response.isSuccessful() || response.body() == null) {
                        Toast.makeText(getContext(), "Server error or empty response", Toast.LENGTH_SHORT).show();
                        return;
                    }

                    String json = response.body().string();
                    Log.d("RAW_RESPONSE", json);

                    JSONObject obj = new JSONObject(json);

                    // ✅ Get data as JSONArray
                    JSONArray dataArray = obj.getJSONArray("data");

                    // Example: Loop through array
                    for (int i = 0; i < dataArray.length(); i++) {
                        JSONObject booking = dataArray.getJSONObject(i);
                        Cart cart=new Cart();
                        cart.setBooking_id(booking.getInt("booking_id"));
                        cart.setResto_id(booking.getInt("resto_id"));
//                        cart.setTableList((booking.get);
                        cart.setStart_time(booking.getString("start_time"));
                        cart.setEnd_time(booking.getString("end_time"));
                        cart.setBooking_status(booking.getString("booking_status"));
                        cart.setResto_name(booking.getString("restaurant_name"));
                        cart.setResto_loction(booking.getString("restaurant_location"));
                        cart.setOrder_id(booking.getInt("order_id"));
                        cart.setDetail_id(booking.getInt("detail_id"));
                        cart.setItem_id(booking.getInt("item_id"));
                        cart.setItem_name(booking.getString("item_name"));
                        cart.setPrice(booking.getInt("price"));
                        cart.setMenu_category(booking.getString("menu_category"));
                        cart.setQuantity(booking.optInt("quantity"));
                        cart.setTable_id(booking.getInt("table_id"));
                        cart.setTable_capacity(booking.getInt("table_capacity"));
                        cart.setTable_charge(booking.getInt("table_charge"));
                        cart.setTable_category(booking.getString("table_category"));
                        cart.setBill_id(booking.getInt("bill_id"));
                        cart.setItem_total(booking.getInt("items_total"));
                        cart.setTotal_amount(booking.getInt("total_amount"));
                        cart.setBill_status(booking.getString("bill_status"));

                        bookingList.add(cart);
                        Log.d("BOOKING_INFO"," "+booking);
                    }
                    myBokkingAdapter.notifyDataSetChanged();

                    Toast.makeText(getContext(), "Bookings found: " + dataArray.length(), Toast.LENGTH_LONG).show();

                } catch (Exception e) {
                    Log.e("PARSE_ERR", "Error parsing", e);
                    Toast.makeText(getContext(), "Error parsing response", Toast.LENGTH_SHORT).show();
                }
            }



            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Log.e("API_ERR", "Failed", t);
                Toast.makeText(getContext(), "Network error", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
package com.sunbeam.restaurant_mangenment_system.activity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.sunbeam.restaurant_mangenment_system.Adapter.OrderAdapter;
import com.sunbeam.restaurant_mangenment_system.Class.BookingTable;
import com.sunbeam.restaurant_mangenment_system.Class.Item;
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

public class PalceOrderActivity extends AppCompatActivity {

    int resto_id;
    List<Table> tableList;
    List<Item> menuList;
    RecyclerView recycleViewPlaceOrder;
    List<Object> combineList;
    OrderAdapter orderAdapter;
    TextView textTotalPrice;
    Button placeOrder;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_palce_order);
        resto_id=getIntent().getIntExtra("resto_id",0);
        tableList=getIntent().getParcelableArrayListExtra("tables");
        menuList=getIntent().getParcelableArrayListExtra("menu");

        combineList=new ArrayList<>();
        combineList.addAll(tableList);
        combineList.addAll(menuList);

        Toast.makeText(this, " "+combineList.toString(), Toast.LENGTH_SHORT).show();
        recycleViewPlaceOrder=findViewById(R.id.recycleViewPlaceOrder);
        textTotalPrice=findViewById(R.id.textTotalPrice);
        placeOrder=findViewById(R.id.placeOrder);

        orderAdapter=new OrderAdapter(PalceOrderActivity.this,combineList);
        recycleViewPlaceOrder.setAdapter(orderAdapter);
        recycleViewPlaceOrder.setLayoutManager(new LinearLayoutManager(this));
        updateTotalPrice();


    }
    public void placeOrder(View view){
        String Start_time = "2025-08-09 13:00:00";
        String end_time = "2025-08-09 14:30:00";
        PrefsHelper prefsHelper=new PrefsHelper();

        String token=prefsHelper.getToken(this);
        int total=updateTotalPrice();
        int charge=updateTablePrice();
        int price=updateItemPrice();

        String BearerToken="Bearer"+" "+token;
        BookingTable bookingTable=new BookingTable(tableList,menuList,Start_time,end_time,charge,price,total);
        RetrofitClient.getInstance().getApi().BookingTable(BearerToken,resto_id,bookingTable).enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                try{
                    if (!response.isSuccessful() || response.body() == null) {
                        Toast.makeText(PalceOrderActivity.this, "Server error or empty response", Toast.LENGTH_SHORT).show();
                        return;
                    }

                    String json = response.body().string();
                    Log.d("RAW_RESPONSE", json);

                    JSONObject jsonObject = new JSONObject(json);

                    // If you know "data" is a plain message
                    String message = jsonObject.getString("data");

                    Toast.makeText(PalceOrderActivity.this, message, Toast.LENGTH_SHORT).show();
                    Intent intent=new Intent(PalceOrderActivity.this,LoadActivity.class);
                    startActivity(intent);
                    finish();


                }catch (Exception e) {
                    Log.e("PARSE_ERR", "Error parsing", e);
                    Toast.makeText(PalceOrderActivity.this, "Error parsing response", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Log.e("API_ERR", "Failed", t);
                Toast.makeText(PalceOrderActivity.this, "Network error", Toast.LENGTH_SHORT).show();
            }
        });
    }
    public int updateTotalPrice() {
        int total = 0;
        for(Table table: tableList){
            total +=table.getCharge();
        }
        for (Item item : menuList) {
            total += item.getPrice();
        }
        textTotalPrice.setText("Total Price: ₹" + total);
        return total;
    }
    public  int updateTablePrice(){
        int charge=0;
        for(Table table: tableList){
            charge +=table.getCharge();
        }
        return charge;
    }
    public int updateItemPrice(){
        int price=0;
        for (Item item : menuList) {
            price += item.getPrice();
        }
        return price;
    }
}
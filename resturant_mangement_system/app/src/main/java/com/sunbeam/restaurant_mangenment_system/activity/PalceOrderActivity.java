package com.sunbeam.restaurant_mangenment_system.activity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.sunbeam.restaurant_mangenment_system.Adapter.OrderAdapter;
import com.sunbeam.restaurant_mangenment_system.Class.Item;
import com.sunbeam.restaurant_mangenment_system.Class.PrefsHelper;
import com.sunbeam.restaurant_mangenment_system.Class.Table;
import com.sunbeam.restaurant_mangenment_system.R;
import com.sunbeam.restaurant_mangenment_system.Utils.RetrofitClient;

import java.util.ArrayList;
import java.util.List;

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
        PrefsHelper prefsHelper=new PrefsHelper();

        String token=prefsHelper.getToken(this);

        String BearerToken="Bearer"+" "+token;
        RetrofitClient.getInstance().getApi();
    }
    public void updateTotalPrice() {
        int total = 0;
        for(Table table: tableList){
            total +=table.getCharge();
        }
        for (Item item : menuList) {
            total += item.getPrice();
        }
        textTotalPrice.setText("Total Price: ₹" + total);
    }
}
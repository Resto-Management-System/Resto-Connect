package com.sunbeam.restaurant_mangenment_system.activity;

import android.os.Bundle;
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
import com.sunbeam.restaurant_mangenment_system.Class.Table;
import com.sunbeam.restaurant_mangenment_system.R;

import java.util.ArrayList;
import java.util.List;

public class PalceOrderActivity extends AppCompatActivity {

    int resto_id;
    List<Table> tableList;
    List<Item> menuList;
    RecyclerView recycleViewPlaceOrder;
    List<Object> combineList;
    OrderAdapter orderAdapter;
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

        orderAdapter=new OrderAdapter(PalceOrderActivity.this,combineList);
        recycleViewPlaceOrder.setAdapter(orderAdapter);
        recycleViewPlaceOrder.setLayoutManager(new LinearLayoutManager(this));


    }
}
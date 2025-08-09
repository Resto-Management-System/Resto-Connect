package com.sunbeam.restaurant_mangenment_system.activity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Parcelable;
import android.util.Log;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.sunbeam.restaurant_mangenment_system.Adapter.MenuListAdapter;
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

public class MenuListActivity extends AppCompatActivity {
    RecyclerView recyclerViewMenuList,recyclerViewMenuListselected;
    int resto_id;
    List<Item> menuList,orderMenuList;
    MenuListAdapter availableAdapter;
    MenuListAdapter orderedAdapter;
    TextView textTotalPrice,texttablePrice;
    List<Table> selectedTables;
    Button btnOrder;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_menu_list);
        recyclerViewMenuListselected=findViewById(R.id.recyclerViewMenuListselected);
        recyclerViewMenuList=findViewById(R.id.recyclerViewMenuList);
        textTotalPrice=findViewById(R.id.textTotalPrice);
        texttablePrice=findViewById(R.id.texttablePrice);
        btnOrder=findViewById(R.id.btnOrder);

        resto_id=getIntent().getIntExtra("resto_id",0);
        selectedTables= getIntent().getParcelableArrayListExtra("selectedTables");

        menuList=new ArrayList<>();
        orderMenuList=new ArrayList<>();

        availableAdapter=new MenuListAdapter(MenuListActivity.this
                ,menuList,
                orderMenuList
                ,true
                ,item->{
            menuList.remove(item);
            orderMenuList.add(item);
            availableAdapter.notifyDataSetChanged();
            orderedAdapter.notifyDataSetChanged();
            updateTotalPrice();
        },null);

        orderedAdapter=new MenuListAdapter(MenuListActivity.this
                ,orderMenuList
                ,menuList
                ,false
                ,null
                ,item -> {
           orderMenuList.remove(item);
           menuList.add(item);
           orderedAdapter.notifyDataSetChanged();
           availableAdapter.notifyDataSetChanged();
           updateTotalPrice();
        });

        recyclerViewMenuList.setAdapter(availableAdapter);
        recyclerViewMenuList.setLayoutManager(new LinearLayoutManager(this));

        recyclerViewMenuListselected.setAdapter(orderedAdapter);
        recyclerViewMenuListselected.setLayoutManager(new LinearLayoutManager(this));

        btnOrder.setOnClickListener(v -> {
            Intent intent=new Intent(MenuListActivity.this,PalceOrderActivity.class);
            intent.putExtra("resto_id",resto_id);
            intent.putParcelableArrayListExtra("tables",new ArrayList<>(selectedTables));
            intent.putParcelableArrayListExtra("menu", new ArrayList<>(orderMenuList));
            startActivity(intent);

        });



    }

    @Override
    protected void onResume() {
        super.onResume();
        getMenu();
        int total = 0;
        for(Table table: selectedTables){
            total +=table.getCharge();
        }
        texttablePrice.setText("Table Price: ₹"+total);
    }

    public void getMenu(){
        PrefsHelper prefsHelper=new PrefsHelper();

        String token=prefsHelper.getToken(this);

        String BearerToken="Bearer"+" "+token;
        RetrofitClient.getInstance().getApi().getMenu(BearerToken,resto_id).enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                try {
                    if (!response.isSuccessful() || response.body() == null) {
                        Toast.makeText(MenuListActivity.this, "Server error or empty response", Toast.LENGTH_SHORT).show();
                        return;
                    }

                    String json = response.body().string();
                    Log.d("RAW_RESPONSE", json);

                    JSONObject obj = new JSONObject(json);
                    JSONArray dataArray =obj.getJSONArray("data");
                    for (int i = 0; i < dataArray.length(); i++){
                        JSONObject object=dataArray.getJSONObject(i);
                        Item item=new Item();
                        item.setItem_name(object.getString("item_name"));
                        item.setItem_id(object.getInt("item_id"));
                        item.setCategory(object.getString("category"));
                        item.setPrice(object.getInt("price"));
                        item.setResto_id(object.getInt("resto_id"));
                        menuList.add(item);
                        //Toast.makeText(MenuListActivity.this," "+item.toString(),Toast.LENGTH_SHORT).show();

                    }
                    availableAdapter.notifyDataSetChanged();
                    orderedAdapter.notifyDataSetChanged();


                    //restaurantAdapter.notifyDataSetChanged(); // Refresh RecyclerView

                } catch (Exception e) {
                    Log.e("PARSE_ERR", "Error parsing", e);
                    Toast.makeText(MenuListActivity.this, "Error parsing response", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Log.e("API_ERR", "Failed", t);
                Toast.makeText(MenuListActivity.this, "Network error", Toast.LENGTH_SHORT).show();
            }
        });

    }
    public void updateTotalPrice() {
        int total = 0;
        for(Table table: selectedTables){
            total +=table.getCharge();
        }
        for (Item item : orderMenuList) {
            total += item.getPrice();
        }
        textTotalPrice.setText("Total Price: ₹" + total);
    }
}
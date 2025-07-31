package com.sunbeam.restaurant_mangenment_system.activity;

import static java.security.AccessController.getContext;

import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.RecyclerView;

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

public class BookTableActivity extends AppCompatActivity {
    RecyclerView recycleViewTable;
    int resto_id;
    List<Table> tableList;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_book_table);
        recycleViewTable=findViewById(R.id.recycleViewTable);
        resto_id=getIntent().getIntExtra("resto_id",0);
        tableList=new ArrayList<>();
        getTable();
    }
    public void getTable(){
        PrefsHelper prefsHelper=new PrefsHelper();

        String token=prefsHelper.getToken(this);

        String BearerToken="Bearer"+" "+token;
        RetrofitClient.getInstance().getApi().getTables(BearerToken,resto_id).enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                try {
                    if (!response.isSuccessful() || response.body() == null) {
                        Toast.makeText(BookTableActivity.this, "Server error or empty response", Toast.LENGTH_SHORT).show();
                        return;
                    }

                    String json = response.body().string();
                    Log.d("RAW_RESPONSE", json);

                    JSONObject obj = new JSONObject(json);
                    JSONArray dataArray =obj.getJSONArray("data");
                    for (int i = 0; i < dataArray.length(); i++){
                        JSONObject object=dataArray.getJSONObject(i);

                        Table table=new Table();
                        table.setResto_id(object.getInt("resto_id"));
                        table.setTable_id(object.getInt("table_id"));
                        table.setCapacity(object.getInt("capacity"));
                        table.setCharge(object.getInt("charge"));
                        table.setCategory(object.getString("category"));
                        tableList.add(table);
                        Toast.makeText(BookTableActivity.this," "+table.toString(),Toast.LENGTH_SHORT).show();

                    }



                    //restaurantAdapter.notifyDataSetChanged(); // Refresh RecyclerView

                } catch (Exception e) {
                    Log.e("PARSE_ERR", "Error parsing", e);
                    Toast.makeText(BookTableActivity.this, "Error parsing response", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Log.e("API_ERR", "Failed", t);
                Toast.makeText(BookTableActivity.this, "Network error", Toast.LENGTH_SHORT).show();
            }
        });

    }
}
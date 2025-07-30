package com.sunbeam.restaurant_mangenment_system.activity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.sunbeam.restaurant_mangenment_system.Class.MenuItem;
import com.sunbeam.restaurant_mangenment_system.Interface.API;
import com.sunbeam.restaurant_mangenment_system.R;
import com.sunbeam.restaurant_mangenment_system.Utils.RetrofitClient;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AddMenuItemActivity extends AppCompatActivity {

    private EditText editItemName, editPrice, editCategory;
    private Button btnSave;
    private int restoId = 1; // Replace with logged-in user's restaurant ID

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_menu_item);

        editItemName = findViewById(R.id.editItemName);
        editPrice = findViewById(R.id.editPrice);
        editCategory = findViewById(R.id.editCategory);
        btnSave = findViewById(R.id.btnSave);

        btnSave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String name = editItemName.getText().toString();
                String priceStr = editPrice.getText().toString();
                String category = editCategory.getText().toString();

                if (name.isEmpty() || priceStr.isEmpty() || category.isEmpty()) {
                    Toast.makeText(AddMenuItemActivity.this, "All fields are required", Toast.LENGTH_SHORT).show();
                    return;
                }

                double price = Double.parseDouble(priceStr);

                API api = RetrofitClient.getInstance().create(API.class);
                MenuItem newItem = new MenuItem(name, price, category);
                Call<ResponseBody> call = api.addMenuItem(restoId, newItem);

                call.enqueue(new Callback<ResponseBody>() {
                    @Override
                    public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                        if (response.isSuccessful()) {
                            Toast.makeText(AddMenuItemActivity.this, "Item added successfully", Toast.LENGTH_SHORT).show();
                            finish(); // go back to MenuListFragment
                        } else {
                            Toast.makeText(AddMenuItemActivity.this, "Failed to add item", Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<ResponseBody> call, Throwable t) {
                        Toast.makeText(AddMenuItemActivity.this, "Network error", Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });
    }
}
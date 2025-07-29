package com.sunbeam.restaurant_mangenment_system.activity;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.sunbeam.restaurant_mangenment_system.Class.Table;
import com.sunbeam.restaurant_mangenment_system.R;
import com.sunbeam.restaurant_mangenment_system.Utils.RetrofitClient;

import java.util.Arrays;
import java.util.List;

public class addTableActivity extends AppCompatActivity {
    EditText editCapcity,editCharges;
    Spinner spinnerCategory;
    private String selectedCategory = null;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_add_table);
        editCapcity=findViewById(R.id.editCapcity);
        editCharges=findViewById(R.id.editCharges);
        spinnerCategory = findViewById(R.id.spinnerCategory);

        spinnerCategory.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                selectedCategory = parent.getItemAtPosition(position).toString();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
                selectedCategory = null;
            }
        });

    }
    public void addTable(View view){
        String capacityStr = editCapcity.getText().toString().trim();
        String chargesStr = editCharges.getText().toString().trim();
        if (capacityStr.isEmpty() || chargesStr.isEmpty() || selectedCategory == null || selectedCategory.equals("Select Category")) {
            Toast.makeText(this, "All fields are required", Toast.LENGTH_SHORT).show();
            return;
        }
        Table table=new Table();
        table.setCapacity(Integer.parseInt(capacityStr));
        table.setCharge(Integer.parseInt(chargesStr));
        table.setCategory(selectedCategory);
        Toast.makeText(this,""+table.toString(),Toast.LENGTH_SHORT).show();
        RetrofitClient.getInstance().getApi().getTables()
    }
}
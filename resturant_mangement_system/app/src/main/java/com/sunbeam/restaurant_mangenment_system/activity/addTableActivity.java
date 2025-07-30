package com.sunbeam.restaurant_mangenment_system.activity;

import static java.security.AccessController.getContext;

import android.os.Bundle;
import android.util.Log;
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

import com.sunbeam.restaurant_mangenment_system.Class.PrefsHelper;
import com.sunbeam.restaurant_mangenment_system.Class.Table;
import com.sunbeam.restaurant_mangenment_system.R;
import com.sunbeam.restaurant_mangenment_system.Utils.RetrofitClient;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Arrays;
import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

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
        PrefsHelper prefsHelper=new PrefsHelper();

        String token= PrefsHelper.getToken(this);

        String BearerToken="Bearer"+" "+token;
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
        RetrofitClient.getInstance().getApi().addTable(BearerToken,table).enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                try {
                    if (!response.isSuccessful() || response.body() == null) {
                        Toast.makeText(addTableActivity.this, "Server error or empty response", Toast.LENGTH_SHORT).show();
                        return;
                    }

                    String json = response.body().string();
                    Log.d("RAW_RESPONSE", json);

                    JSONObject jsonObject = new JSONObject(json);

// Always check the type before accessing
                    if (jsonObject.get("data") instanceof JSONArray) {
                        JSONArray dataArray = jsonObject.getJSONArray("data");
                        // parse array as before
                    } else if (jsonObject.get("data") instanceof String) {
                        String message = jsonObject.getString("data");
                        Toast.makeText(getApplicationContext(), message, Toast.LENGTH_SHORT).show();
                    }
                    setResult(RESULT_OK);
                    finish();



                } catch (Exception e) {
                    Log.e("PARSE_ERR", "Error parsing", e);
                    Toast.makeText(addTableActivity.this,"Error parsing response",Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Log.e("API_ERR", "Failed", t);
                Toast.makeText(addTableActivity.this, "Network error", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
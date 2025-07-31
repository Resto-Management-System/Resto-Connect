package com.sunbeam.restaurant_mangenment_system.activity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.sunbeam.restaurant_mangenment_system.Class.User;
import com.sunbeam.restaurant_mangenment_system.R;
import com.sunbeam.restaurant_mangenment_system.Utils.RetrofitClient;

import org.json.JSONObject;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegisterCustomerActivity extends AppCompatActivity {
    EditText editName,editEmail,editPassword,editPhone;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_register_customer);
        editName=findViewById(R.id.editName);
        editEmail=findViewById(R.id.editEmail);
        editPassword=findViewById(R.id.editPassword);
        editPhone=findViewById(R.id.editPhone);
    }
    public void Register(View view){
        User user=new User();
        user.setName(editName.getText().toString());
        user.setEmail(editEmail.getText().toString());
        user.setPasswd(editPassword.getText().toString());
        user.setPhone(Integer.parseInt(editPhone.getText().toString()));
        RetrofitClient.getInstance().getApi().register(user).enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                try {
                    Log.e("SERVER_RESPONSE", "Code: " + response.code());

                    if (!response.isSuccessful() || response.body() == null) {
                        Toast.makeText(RegisterCustomerActivity.this, "Server error or empty response", Toast.LENGTH_SHORT).show();
                        return;
                    }
                    String json = response.body().string();
                    Log.d("RAW_RESPONSE", json);
                    JSONObject obj = new JSONObject(json);
                    String token = obj.getString("data");
                    Toast.makeText(RegisterCustomerActivity.this, "Login successful!", Toast.LENGTH_SHORT).show();
                    // You can navigate to LoadActivity or Home screen here
                    Intent intent=new Intent(RegisterCustomerActivity.this,loginViewActivity.class);
                    startActivity(intent);
                    //textoutput.setText(token);
                } catch (Exception e) {
                    Log.e("PARSE_ERR", "Error parsing", e);
                    Toast.makeText(RegisterCustomerActivity.this, "Invalid Email or Password", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {

            }
        });

    }
}
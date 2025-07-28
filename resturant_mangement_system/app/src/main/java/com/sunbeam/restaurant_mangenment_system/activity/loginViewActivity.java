package com.sunbeam.restaurant_mangenment_system.activity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
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

public class loginViewActivity extends AppCompatActivity {
    EditText editEmail,editPassword;
    //TextView textoutput;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_login_view);
        editEmail=findViewById(R.id.editEmail);
        editPassword=findViewById(R.id.editPassword);
        //textoutput=findViewById(R.id.textoutput);
    }
    public void Login(View view){
        User user=new User();
        user.setEmail(editEmail.getText().toString());
        user.setPasswd(editPassword.getText().toString());
        RetrofitClient.getInstance().getApi().login(user).enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                try{
                    if(!response.isSuccessful() || response.body() == null){
                        Toast.makeText(loginViewActivity.this, "Server error or empty response", Toast.LENGTH_SHORT).show();
                        return;
                    }
                    String json = response.body().string();
                    Log.d("RAW_RESPONSE", json);

                    JSONObject obj = new JSONObject(json);
                    String token = obj.getString("data");
                    //textoutput.setText(token);


                } catch (Exception e) {
                    Log.e("PARSE_ERR", "Error parsing", e);
                    Toast.makeText(loginViewActivity.this, "Parsing error", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Log.e("API_ERR", "Failed", t);
                Toast.makeText(loginViewActivity.this, "Network error", Toast.LENGTH_SHORT).show();
            }
        });

    }
}
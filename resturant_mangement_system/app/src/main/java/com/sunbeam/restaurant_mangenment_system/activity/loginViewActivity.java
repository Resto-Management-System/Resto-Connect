package com.sunbeam.restaurant_mangenment_system.activity;

import android.content.Intent;
import android.content.SharedPreferences;
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

import com.sunbeam.restaurant_mangenment_system.Class.PrefsHelper;
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
    SharedPreferences preferences;
    SharedPreferences.Editor editor;
    PrefsHelper prefsHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_login_view);
        editEmail=findViewById(R.id.editEmail);
        editPassword=findViewById(R.id.editPassword);
        //textoutput=findViewById(R.id.textoutput);
        prefsHelper=new PrefsHelper();
//        preferences = getSharedPreferences("Authorition", MODE_PRIVATE);
//        editor=preferences.edit();
    }
    public void updateToken(String token) {
        prefsHelper.saveToken(this,token);
//        editor.putString("token", token);
//        editor.apply();
    }
    public void Login(View view){
        User user = new User();
        user.setEmail(editEmail.getText().toString());
        user.setPasswd(editPassword.getText().toString());

        // FIX: Correct Retrofit usage
        com.sunbeam.restaurant_mangenment_system.Interface.API api =
                RetrofitClient.getInstance().create(com.sunbeam.restaurant_mangenment_system.Interface.API.class);

        api.login(user).enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                try {
                    if (!response.isSuccessful() || response.body() == null) {
                        Toast.makeText(loginViewActivity.this, "Server error or empty response", Toast.LENGTH_SHORT).show();
                        return;
                    }
                    String json = response.body().string();
                    Log.d("RAW_RESPONSE", json);
                    JSONObject obj = new JSONObject(json);
                    String token = obj.getString("data");
                    updateToken(token);
<<<<<<< HEAD
                    Toast.makeText(loginViewActivity.this, "Login successful!", Toast.LENGTH_SHORT).show();
                    // You can navigate to LoadActivity or Home screen here
=======
                    Intent intent=new Intent(loginViewActivity.this,LoadActivity.class);
                    startActivity(intent);
                    //textoutput.setText(token);
>>>>>>> ca7d040396532d417ba3dea9efa3a57359ab276d
                } catch (Exception e) {
                    Log.e("PARSE_ERR", "Error parsing", e);
                    Toast.makeText(loginViewActivity.this, "Invalid Email or Password", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Log.e("API_ERR", "Failed", t);
                Toast.makeText(loginViewActivity.this, "Network error", Toast.LENGTH_SHORT).show();
            }
        });
    }

    public void Change(){

    }
}
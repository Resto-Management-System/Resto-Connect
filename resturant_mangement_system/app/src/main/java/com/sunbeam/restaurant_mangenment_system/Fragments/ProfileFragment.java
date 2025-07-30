package com.sunbeam.restaurant_mangenment_system.Fragments;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.sunbeam.restaurant_mangenment_system.Interface.API;
import com.sunbeam.restaurant_mangenment_system.R;
import com.sunbeam.restaurant_mangenment_system.Utils.RetrofitClient;

import org.json.JSONObject;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProfileFragment extends Fragment {
    TextView textName, textEmail, textPhone, textLocation, textRestoName;
    SharedPreferences prefs;
    API api;
    public ProfileFragment() {
        // Required empty public constructor
    }
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_profile,container,false);
        textName = view.findViewById(R.id.textName);
        textEmail= view.findViewById(R.id.textEmail);
        textLocation=view.findViewById(R.id.textLocation);
        textPhone = view.findViewById(R.id.textPhone);
        textRestoName = view.findViewById(R.id.textRestoName);
        prefs = getContext().getSharedPreferences("restaurant_management_system", Context.MODE_PRIVATE);
        String token = prefs.getString("token", "");
        int userId = prefs.getInt("user_id", 0);
         api= RetrofitClient.getInstance().getApi();
         fetchOwner(token,userId);


        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_profile, container, false);
    }

    private void fetchOwner(String token, int userId) {
        Call<ResponseBody> call=api.updateOwner("Bearer"+ token,userId);
        call.enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                if (response.isSuccessful()){
                    try{
                        String json = response.body().string();
                        JSONObject obj=new JSONObject(json);
                        JSONObject user=obj.getJSONObject("result");

                        textName.setText(user.getString("name"));
                        textEmail.setText(user.getString("email"));
                        textPhone.setText(user.getString("phone"));
                        textLocation.setText(user.getString("location"));
                        textRestoName.setText(user.getString("resto_name"));

                    }catch (Exception e) {
                        e.printStackTrace();
                    }

                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Toast.makeText(getContext(), "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
}
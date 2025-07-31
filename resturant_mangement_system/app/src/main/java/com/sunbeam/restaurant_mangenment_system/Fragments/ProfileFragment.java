package com.sunbeam.restaurant_mangenment_system.Fragments;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.sunbeam.restaurant_mangenment_system.Class.PrefsHelper;
import com.sunbeam.restaurant_mangenment_system.Class.Restaurant;
import com.sunbeam.restaurant_mangenment_system.Interface.API;
import com.sunbeam.restaurant_mangenment_system.R;
import com.sunbeam.restaurant_mangenment_system.Utils.RetrofitClient;

import org.json.JSONArray;
import org.json.JSONObject;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProfileFragment extends Fragment {
    TextView textName, textEmail, textPhone;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_profile, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        textName = view.findViewById(R.id.textName);
        textEmail= view.findViewById(R.id.textEmail);
        textPhone = view.findViewById(R.id.textPhone);
        getProfile();
    }

    @Override
    public void onResume() {
        super.onResume();

    }

    public void getProfile(){
        PrefsHelper prefsHelper=new PrefsHelper();

        String token=prefsHelper.getToken(getContext());

        String BearerToken="Bearer"+" "+token;
        RetrofitClient.getInstance().getApi().getUser(BearerToken).enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                try {
                    if (!response.isSuccessful() || response.body() == null) {
                        Toast.makeText(getContext(), "Server error or empty response", Toast.LENGTH_SHORT).show();
                        return;
                    }

                    String json = response.body().string();
                    Log.d("RAW_RESPONSE", json);
                    JSONObject obj = new JSONObject(json);
                    JSONObject data = obj.getJSONObject("data");
                    textName.setText("Name : "+data.getString("name"));
                    textEmail.setText("Email : "+data.getString("email"));
                    textPhone.setText("Phone : "+data.getString("phone"));

                    //restaurantAdapter.notifyDataSetChanged(); // Refresh RecyclerView

                } catch (Exception e) {
                    Log.e("PARSE_ERR", "Error parsing", e);
                    Toast.makeText(getContext(), "Error parsing response", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Log.e("API_ERR", "Failed", t);
                Toast.makeText(getContext(), "Network error", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
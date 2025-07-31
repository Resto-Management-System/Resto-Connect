package com.sunbeam.restaurant_mangenment_system.Fragments;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.sunbeam.restaurant_mangenment_system.Adapter.RestaurantAdapter;
import com.sunbeam.restaurant_mangenment_system.Class.PrefsHelper;
import com.sunbeam.restaurant_mangenment_system.Class.Restaurant;
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


public class RestaurantListFragment extends Fragment {
    RecyclerView recycleViewResto;
    List<Restaurant> restoList;

    RestaurantAdapter restaurantAdapter;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_restaurant_list, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        recycleViewResto=view.findViewById(R.id.recycleViewResto);
        restoList=new ArrayList<>();
        restaurantAdapter=new RestaurantAdapter(getContext(),restoList);
        recycleViewResto.setAdapter(restaurantAdapter);
        recycleViewResto.setLayoutManager(new GridLayoutManager(getContext(),1));
    }

    @Override
    public void onResume() {
        super.onResume();
        getRestaurants();
    }

    public void getRestaurants(){
        PrefsHelper prefsHelper=new PrefsHelper();

        String token=prefsHelper.getToken(getContext());

        String BearerToken="Bearer"+" "+token;
        RetrofitClient.getInstance().getApi().getResto(BearerToken).enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                try {
                    if (!response.isSuccessful() || response.body() == null) {
                        Toast.makeText(getContext(), "Server error or empty response", Toast.LENGTH_SHORT).show();
                        return;
                    }

                    String json = response.body().string();
                    Log.d("RAW_RESPONSE", json);

                    JSONObject jsonObject = new JSONObject(json);
                    JSONArray dataArray = jsonObject.getJSONArray("data");

                    restoList.clear(); // Clear previous data

                    for (int i = 0; i < dataArray.length(); i++) {
                        JSONObject obj = dataArray.getJSONObject(i);

                        Restaurant restaurant = new Restaurant();
                        //table.setId(obj.getInt("id"));
                        restaurant.setResto_id(obj.getInt("resto_id"));
                        restaurant.setOwner_id(obj.getInt("owner_id"));
                        restaurant.setName(obj.getString("name"));
                        restaurant.setLoction(obj.getString("location"));

                        restoList.add(restaurant);
                    }

                    restaurantAdapter.notifyDataSetChanged(); // Refresh RecyclerView

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
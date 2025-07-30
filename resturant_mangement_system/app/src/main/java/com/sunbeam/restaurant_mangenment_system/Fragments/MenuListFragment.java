package com.sunbeam.restaurant_mangenment_system.Fragments;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.sunbeam.restaurant_mangenment_system.Adapter.MenuItemAdapter;
import com.sunbeam.restaurant_mangenment_system.Class.ApiResponse;
import com.sunbeam.restaurant_mangenment_system.Class.MenuItem;
import com.sunbeam.restaurant_mangenment_system.Interface.API;
import com.sunbeam.restaurant_mangenment_system.R;
import com.sunbeam.restaurant_mangenment_system.Utils.RetrofitClient;
import com.sunbeam.restaurant_mangenment_system.activity.AddMenuItemActivity;

import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MenuListFragment extends Fragment {

    private RecyclerView recyclerView;
    private MenuItemAdapter adapter;

    private FloatingActionButton fab;

    private int restoId = 1; // Replace with logged-in user's restaurant ID

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_menu_list, container, false);
        recyclerView = view.findViewById(R.id.recyclerMenuItems);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        fab = view.findViewById(R.id.fabAddMenuItem);

        fab.setOnClickListener(v -> {
            Intent intent = new Intent(getContext(), AddMenuItemActivity.class);
            startActivity(intent);
        });
        fetchMenuItems();
        return view;
    }

    @Override
    public void onResume() {
        super.onResume();
        fetchMenuItems();

    }

    private void fetchMenuItems() {
        API api = RetrofitClient.getApi();
        api.getMenuItems(restoId).enqueue(new Callback<ApiResponse<List<MenuItem>>>() {
            @Override
            public void onResponse(Call<ApiResponse<List<MenuItem>>> call, Response<ApiResponse<List<MenuItem>>> response) {
                if (response.isSuccessful() && response.body() != null && "success".equals(response.body().getStatus())) {
                    List<MenuItem> items = response.body().getData();
                    adapter = new MenuItemAdapter(items);
                    recyclerView.setAdapter(adapter);
                } else {
                    Toast.makeText(getContext(), "Failed to load menu", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ApiResponse<List<MenuItem>>> call, Throwable t) {
                Toast.makeText(getContext(), "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.e("MenuAPI", "onFailure: ", t);
            }
        });
    }
}


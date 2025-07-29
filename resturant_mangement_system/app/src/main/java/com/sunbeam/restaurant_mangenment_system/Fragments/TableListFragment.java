package com.sunbeam.restaurant_mangenment_system.Fragments;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.Toast;

import com.sunbeam.restaurant_mangenment_system.Adapter.TableAdapter;
import com.sunbeam.restaurant_mangenment_system.Class.PrefsHelper;
import com.sunbeam.restaurant_mangenment_system.Class.Table;
import com.sunbeam.restaurant_mangenment_system.R;
import com.sunbeam.restaurant_mangenment_system.Utils.RetrofitClient;
import com.sunbeam.restaurant_mangenment_system.activity.addTableActivity;
import com.sunbeam.restaurant_mangenment_system.activity.loginViewActivity;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class TableListFragment extends Fragment {
    RecyclerView recyclerViewTable;
    List<Table> tableList;
    TableAdapter tableAdapter;
    Toolbar toolbar;

    Context getContext;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        if(getActivity() != null && ((AppCompatActivity) getActivity()).getSupportActionBar() != null) {
            ((AppCompatActivity) getActivity()).getSupportActionBar().hide();
        }
        return inflater.inflate(R.layout.fragment_table_list, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        recyclerViewTable=view.findViewById(R.id.recyclerViewTable);
        tableList=new ArrayList<>();
        tableAdapter=new TableAdapter(getContext(),tableList);
        recyclerViewTable.setAdapter(tableAdapter);
        recyclerViewTable.setLayoutManager(new GridLayoutManager(getContext(),1));
        Toolbar toolbar = view.findViewById(R.id.toolbar);
        ((AppCompatActivity) getActivity()).setSupportActionBar(toolbar);

        // Hide default title if needed
        ((AppCompatActivity) getActivity()).getSupportActionBar().setDisplayShowTitleEnabled(false);
        toolbar.setTitle("Tables");

        // Add navigation button (icon)
        ImageView btnAddTable = view.findViewById(R.id.btnAddTable);

        btnAddTable.setOnClickListener(v -> {
            Intent intent = new Intent(getActivity(), addTableActivity.class);
            startActivity(intent);
        });


    }

    @Override
    public void onResume() {
        super.onResume();
        getTable();
    }

    @Override
    public void onViewStateRestored(@Nullable Bundle savedInstanceState) {
        super.onViewStateRestored(savedInstanceState);

    }

    public void getTable(){
        PrefsHelper prefsHelper=new PrefsHelper();

        String token=prefsHelper.getToken(getContext());

        String BearerToken="Bearer"+" "+token;
        RetrofitClient.getInstance().getApi().getTables(BearerToken).enqueue(new Callback<ResponseBody>() {
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

                    tableList.clear(); // Clear previous data

                    for (int i = 0; i < dataArray.length(); i++) {
                        JSONObject obj = dataArray.getJSONObject(i);

                        Table table = new Table();
                        //table.setId(obj.getInt("id"));
                        table.setCategory(obj.getString("category"));
                        table.setCapacity(obj.getInt("capacity"));
                        table.setCharge(obj.getInt("charge"));

                        tableList.add(table);
                    }

                    tableAdapter.notifyDataSetChanged(); // Refresh RecyclerView

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
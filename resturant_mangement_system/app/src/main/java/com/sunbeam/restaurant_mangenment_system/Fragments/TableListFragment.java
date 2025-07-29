package com.sunbeam.restaurant_mangenment_system.Fragments;

import android.content.Context;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.sunbeam.restaurant_mangenment_system.Adapter.TableAdapter;
import com.sunbeam.restaurant_mangenment_system.Class.PrefsHelper;
import com.sunbeam.restaurant_mangenment_system.Class.Table;
import com.sunbeam.restaurant_mangenment_system.R;
import com.sunbeam.restaurant_mangenment_system.Utils.RetrofitClient;
import com.sunbeam.restaurant_mangenment_system.activity.loginViewActivity;

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
//        toolbar = view.findViewById(R.id.toolbar);
//        ((AppCompatActivity) getActivity()).setSupportActionBar(toolbar);

    }

    @Override
    public void onResume() {
        super.onResume();

    }

    @Override
    public void onViewStateRestored(@Nullable Bundle savedInstanceState) {
        super.onViewStateRestored(savedInstanceState);
        //getTable();
    }

    public void getTable(){
        PrefsHelper prefsHelper=new PrefsHelper();

        String token=prefsHelper.getToken(getContext());

        String BearerToken="Bearer"+token;
        RetrofitClient.getInstance().getApi().getTables(BearerToken).enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                try{
                    if(!response.isSuccessful() || response.body() == null){
                        Toast.makeText(getContext(), "Server error or empty response", Toast.LENGTH_SHORT).show();
                        return;
                    }
                    String json = response.body().string();
                    Log.d("RAW_RESPONSE", json);
                    JSONObject obj = new JSONObject(json);

                    //Intent intent=new Intent();
                    //textoutput.setText(token);
                } catch (Exception e) {
                    Log.e("PARSE_ERR", "Error parsing", e);
                    Toast.makeText(getContext(), "Invalid Email or Password", Toast.LENGTH_SHORT).show();
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
package com.sunbeam.restaurant_mangenment_system.Fragments;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.sunbeam.restaurant_mangenment_system.Adapter.TableAdapter;
import com.sunbeam.restaurant_mangenment_system.Class.Table;
import com.sunbeam.restaurant_mangenment_system.R;
import com.sunbeam.restaurant_mangenment_system.Utils.RetrofitClient;

import java.util.ArrayList;
import java.util.List;


public class TableListFragment extends Fragment {
    RecyclerView recyclerViewTable;
    List<Table> tableList;
    TableAdapter tableAdapter;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_table_list, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        recyclerViewTable=view.findViewById(R.id.recyclerViewTable);
        tableList=new ArrayList<>();
        tableAdapter=new TableAdapter(getContext(),tableList);
    }

    @Override
    public void onResume() {
        super.onResume();

    }
    public void getTable(){
        RetrofitClient.getInstance().getApi().getTables()
    }
}
package com.sunbeam.restaurant_mangenment_system.activity;

import android.os.Bundle;

import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.viewpager2.widget.ViewPager2;

import com.google.android.material.tabs.TabLayout;
import com.google.android.material.tabs.TabLayoutMediator;
import com.sunbeam.restaurant_mangenment_system.Adapter.MainFragmentAdapter;
import com.sunbeam.restaurant_mangenment_system.R;

public class LoadActivity extends AppCompatActivity {
    ViewPager2 viewPager2;
    TabLayout tabLayout;
    MainFragmentAdapter mainFragmentAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_load);
        viewPager2 = findViewById(R.id.viewPager2);
        tabLayout = findViewById(R.id.tabLayout);
        mainFragmentAdapter = new MainFragmentAdapter(this);
        viewPager2.setAdapter(mainFragmentAdapter);

        // to create the tabs as per the fragments that we have.
        new TabLayoutMediator(tabLayout, viewPager2, new TabLayoutMediator.TabConfigurationStrategy() {
            @Override
            public void onConfigureTab(@NonNull TabLayout.Tab tab, int position) {
                switch (position){
                    case 0:
                        tab.setIcon(R.drawable.menulist);
                        break;
                    case 1:
                        tab.setIcon(R.drawable.tablelist);
                        break;
                    case 2:
                        tab.setIcon(R.drawable.profile);
                        break;
                }
            }
        }).attach();


    }
}
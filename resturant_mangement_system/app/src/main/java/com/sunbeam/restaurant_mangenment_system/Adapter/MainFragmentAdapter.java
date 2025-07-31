package com.sunbeam.restaurant_mangenment_system.Adapter;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.viewpager2.adapter.FragmentStateAdapter;


import com.sunbeam.restaurant_mangenment_system.Fragments.MyBookingFragment;
import com.sunbeam.restaurant_mangenment_system.Fragments.ProfileFragment;
import com.sunbeam.restaurant_mangenment_system.Fragments.RestaurantListFragment;


public class MainFragmentAdapter extends FragmentStateAdapter  {

    public MainFragmentAdapter(@NonNull FragmentActivity fragmentActivity) {
        super(fragmentActivity);
    }

    @NonNull
    @Override
    public Fragment createFragment(int position) {
        switch (position){
            case 0: return new RestaurantListFragment();
            case 1: return new MyBookingFragment();
            case 2: return new ProfileFragment();
        }
        return null;
    }

    @Override
    public int getItemCount() {
        return 3;
    }
}

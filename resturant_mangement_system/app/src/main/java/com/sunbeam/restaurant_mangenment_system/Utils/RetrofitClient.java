package com.sunbeam.restaurant_mangenment_system.Utils;

import com.sunbeam.restaurant_mangenment_system.Interface.API;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.converter.scalars.ScalarsConverterFactory;

public class RetrofitClient {
    private static RetrofitClient retrofitClient;
    private API api;

    private RetrofitClient() {
        api = new Retrofit.Builder()
                .baseUrl(API.BASE_URL)
                .addConverterFactory(ScalarsConverterFactory.create())
                .addConverterFactory(GsonConverterFactory.create())
                .build()
                .create(API.class);
    }

    public static RetrofitClient getInstance() {
        if (retrofitClient == null) {   // ✅ Fix here
            retrofitClient = new RetrofitClient();
        }
        return retrofitClient;
    }

    public API getApi() {
        return api;
    }
}

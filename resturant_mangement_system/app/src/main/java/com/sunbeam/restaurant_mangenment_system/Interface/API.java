package com.sunbeam.restaurant_mangenment_system.Interface;

import static android.content.Context.MODE_PRIVATE;

import android.content.Context;
import android.content.SharedPreferences;

import com.sunbeam.restaurant_mangenment_system.Class.PrefsHelper;
import com.sunbeam.restaurant_mangenment_system.Class.User;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface API {
    public static final String BASE_URL="http://192.168.189.65:3000";


    @POST("/user/signin")
    public Call<ResponseBody> login(@Body User user);
    @GET("")
    public Call<ResponseBody> getTables(@Header("Authorization") String token);
}

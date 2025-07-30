package com.sunbeam.restaurant_mangenment_system.Interface;

import static android.content.Context.MODE_PRIVATE;

import android.content.Context;
import android.content.SharedPreferences;

import com.sunbeam.restaurant_mangenment_system.Class.ApiResponse;
import com.sunbeam.restaurant_mangenment_system.Class.MenuItem;
import com.sunbeam.restaurant_mangenment_system.Class.PrefsHelper;
import com.sunbeam.restaurant_mangenment_system.Class.User;

import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface API {
    public static final String BASE_URL="http://192.168.189.65:3000";


    @POST("/user/signin")
    public Call<ResponseBody> login(@Body User user);
    @GET("")
    public Call<ResponseBody> getTables(@Header("Authorization") String token);

    @GET("restaurant/{resto_id}/menu_items")
    Call<ApiResponse<List<MenuItem>>> getMenuItems(@Path("resto_id") int restoId);

    @POST("restaurant/{resto_id}/menu_items")
    Call<ResponseBody> addMenuItem(
            @Path("resto_id") int restoId,
            @Body MenuItem item
    );

}

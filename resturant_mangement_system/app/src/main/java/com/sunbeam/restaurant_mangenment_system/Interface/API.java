package com.sunbeam.restaurant_mangenment_system.Interface;

<<<<<<< HEAD
import static android.content.Context.MODE_PRIVATE;

import android.content.Context;
import android.content.SharedPreferences;

import com.sunbeam.restaurant_mangenment_system.Class.ApiResponse;
import com.sunbeam.restaurant_mangenment_system.Class.MenuItem;
import com.sunbeam.restaurant_mangenment_system.Class.PrefsHelper;
=======
import com.sunbeam.restaurant_mangenment_system.Class.Table;
>>>>>>> ca7d040396532d417ba3dea9efa3a57359ab276d
import com.sunbeam.restaurant_mangenment_system.Class.User;

import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
<<<<<<< HEAD
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
=======
import retrofit2.http.DELETE;
>>>>>>> ca7d040396532d417ba3dea9efa3a57359ab276d
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.PATCH;
import retrofit2.http.POST;
<<<<<<< HEAD
=======
import retrofit2.http.PUT;
>>>>>>> ca7d040396532d417ba3dea9efa3a57359ab276d
import retrofit2.http.Path;

public interface API {
<<<<<<< HEAD
    public static final String BASE_URL="http://10.153.187.212:3000";
=======
    public static final String BASE_URL="http://10.153.187.65:3000";
>>>>>>> eec930f40052ce74e1ed9392d91554617925fe96


    @POST("/user/signin")
    public Call<ResponseBody> login(@Body User user);
    @GET("/resto/table")
    public Call<ResponseBody> getTables(@Header("Authorization") String token);
<<<<<<< HEAD

    @GET("restaurant/{resto_id}/menu_items")
    Call<ApiResponse<List<MenuItem>>> getMenuItems(@Path("resto_id") int restoId);

    @POST("restaurant/{resto_id}/menu_items")
    Call<ResponseBody> addMenuItem(
            @Path("resto_id") int restoId,
            @Body MenuItem item
    );

=======
    @POST("/resto/")
    public Call<ResponseBody> addTable(@Header("Authorization") String token, @Body Table table);
<<<<<<< HEAD

    @PUT("/user/updateProfile/{id}")
    Call<ResponseBody> updateOwner(
            @Header("Authorization") String token,
            @Path("id") int ownerId
    );

=======
    @DELETE("table/{id}")
    Call<ResponseBody> deleteTable(@Header("Authorization") String token, @Path("id") int id);
    @PATCH("table/{id}")
    Call<ResponseBody> updateTable(@Header("Authorization") String token, @Path("id") int id, @Body Table table);
>>>>>>> eec930f40052ce74e1ed9392d91554617925fe96

>>>>>>> ca7d040396532d417ba3dea9efa3a57359ab276d
}

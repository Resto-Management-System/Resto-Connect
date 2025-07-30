package com.sunbeam.restaurant_mangenment_system.Interface;

import com.sunbeam.restaurant_mangenment_system.Class.Table;
import com.sunbeam.restaurant_mangenment_system.Class.User;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.PATCH;
import retrofit2.http.POST;
import retrofit2.http.PUT;
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

}

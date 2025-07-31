package com.sunbeam.restaurant_mangenment_system.Interface;

import com.sunbeam.restaurant_mangenment_system.Class.User;

import java.util.List;

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
    public static final String BASE_URL="http://192.168.178.65:3000";

    @POST("/user/signup/user")
    public Call<ResponseBody> register(@Body User user);
    @POST("/user/signin")
    public Call<ResponseBody> login(@Body User user);
    @GET("/resto/")
    public Call<ResponseBody> getResto(@Header("Authorization") String token);
    @GET("/")
    public Call<ResponseBody> getUser(@Header("Authorization") String token);





    @GET("/resto/table")
    public Call<ResponseBody> getTables(@Header("Authorization") String token);
    @PUT("/user/updateProfile/{id}")
    Call<ResponseBody> updateOwner(
            @Header("Authorization") String token,
            @Path("id") int ownerId
    );



}

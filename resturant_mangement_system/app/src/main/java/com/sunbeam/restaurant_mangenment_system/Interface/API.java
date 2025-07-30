package com.sunbeam.restaurant_mangenment_system.Interface;

import com.sunbeam.restaurant_mangenment_system.Class.Table;
import com.sunbeam.restaurant_mangenment_system.Class.User;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface API {
    public static final String BASE_URL="http://10.153.187.212:3000";


    @POST("/user/signin")
    public Call<ResponseBody> login(@Body User user);
    @GET("/resto/table")
    public Call<ResponseBody> getTables(@Header("Authorization") String token);
    @POST("/resto/")
    public Call<ResponseBody> addTable(@Header("Authorization") String token, @Body Table table);

    @PUT("/user/updateProfile/{id}")
    Call<ResponseBody> updateOwner(
            @Header("Authorization") String token,
            @Path("id") int ownerId
    );


}

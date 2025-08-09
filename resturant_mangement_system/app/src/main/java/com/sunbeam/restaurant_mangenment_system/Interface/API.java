package com.sunbeam.restaurant_mangenment_system.Interface;

import com.sunbeam.restaurant_mangenment_system.Class.BookingTable;
import com.sunbeam.restaurant_mangenment_system.Class.Item;
import com.sunbeam.restaurant_mangenment_system.Class.Table;
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
    public static final String BASE_URL="http://192.168.43.65:3000";

    @POST("/user/signup/user")
    public Call<ResponseBody> register(@Body User user);
    @POST("/user/signin")
    public Call<ResponseBody> login(@Body User user);
    @GET("/resto/")
    public Call<ResponseBody> getResto(@Header("Authorization") String token);
    @GET("/user/")
    public Call<ResponseBody> getUser(@Header("Authorization") String token);
    @GET("/menu/resto/{resto_id}")
    public Call<ResponseBody> getMenu(@Header("Authorization") String token,@Path("resto_id") int resto_id);

    @POST("/user/order/{resto_id}")
    public Call<ResponseBody> BookingTable(@Header("Authorization") String token, @Path("resto_id") int resto_id,
                                           @Body BookingTable bookingTable);

    @GET("/user/orders")
    public Call<ResponseBody> getBookings(@Header("Authorization") String token);

    @GET("/table/resto/{resto_id}")
    public Call<ResponseBody> getTables(@Header("Authorization") String token,@Path("resto_id") int resto_id);




    @PUT("/user/updateProfile/{id}")
    Call<ResponseBody> updateOwner(
            @Header("Authorization") String token,
            @Path("id") int ownerId
    );



}

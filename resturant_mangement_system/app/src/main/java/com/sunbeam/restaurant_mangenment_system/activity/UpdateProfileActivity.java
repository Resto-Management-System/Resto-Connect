package com.sunbeam.restaurant_mangenment_system.activity;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.sunbeam.restaurant_mangenment_system.R;

public class UpdateProfileActivity extends AppCompatActivity {

    EditText editName, editEmail, editPhone, editLocation, editPassword,editrestoname;
    Button btnUpdate;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_update_profile);

        editName = findViewById(R.id.editName);
        editEmail = findViewById(R.id.editEmail);
        editPhone = findViewById(R.id.editPhone);
        editLocation = findViewById(R.id.editLocation);
        editPassword = findViewById(R.id.editPassword);
        editrestoname=findViewById(R.id.editrestoname);
        btnUpdate = findViewById(R.id.btnUpdate);

        btnUpdate.setOnClickListener(v -> {
            String name = editName.getText().toString().trim();
            String email = editEmail.getText().toString().trim();
            String phone = editPhone.getText().toString().trim();
            String location = editLocation.getText().toString().trim();
            String password = editPassword.getText().toString().trim();
            String resto_name= editrestoname.getText().toString().trim();


            if (name.isEmpty() || email.isEmpty() || phone.isEmpty() || location.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show();
                return;
            }

            // 🧪 Here you can mock or log updated values
            Toast.makeText(this, "Updated Successfully:\n" +
                    "Name: " + name + "\nEmail: " + email + "\nPhone: " + phone, Toast.LENGTH_LONG).show();
        });
    }
}

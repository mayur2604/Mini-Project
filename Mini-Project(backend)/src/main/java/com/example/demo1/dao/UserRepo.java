package com.example.demo1.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo1.model.User;

public interface UserRepo extends JpaRepository<User, String> {
 @Query("select u.role from User u where u.name=:name and u.password=:password")
 public String getRole(@Param("name") String name,@Param("password") String password);
 
}

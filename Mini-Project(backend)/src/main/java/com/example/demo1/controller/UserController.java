package com.example.demo1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo1.dao.UserRepo;

@RestController
public class UserController {
	@Autowired
	UserRepo userRepo;
	@GetMapping("/login/{name}/{password}")
	@CrossOrigin(origins= {"http://localhost:3001","http://localhost:3000","http://localhost:3002"})
	public String getRole(@PathVariable String name,@PathVariable String password) {
		return userRepo.getRole(name, password);
	}
}

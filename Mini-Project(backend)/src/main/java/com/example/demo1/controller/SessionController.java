package com.example.demo1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo1.dao.SessionRepo;
import com.example.demo1.model.Session;

@RestController
public class SessionController {
	@Autowired
	SessionRepo sessionRepo;

	@GetMapping("/tables")
	@CrossOrigin(origins= {"http://localhost:3001","http://localhost:3000","http://localhost:3002"})
	public List<Session> getSessions() {
		return sessionRepo.findAll();
	}
	@PostMapping("/table")
	@CrossOrigin(origins= {"http://localhost:3001","http://localhost:3000"})
	public void createTable(@RequestBody Session s) {
		sessionRepo.save(s);
	}
	@DeleteMapping("/table")
	@CrossOrigin(origins= {"http://localhost:3001","http://localhost:3000"})
	public void deleteTable() {
		int tableId=(int)sessionRepo.count();
		sessionRepo.deleteById(tableId);
	}
	
}

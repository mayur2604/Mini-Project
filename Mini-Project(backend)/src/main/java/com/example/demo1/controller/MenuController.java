package com.example.demo1.controller;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo1.dao.MenuRepo;
import com.example.demo1.model.Menu;

@RestController
@Transactional
public class MenuController {
	@Autowired
	MenuRepo menuRepo;

	@GetMapping("/menu")
	@CrossOrigin(origins= {"http://localhost:3001","http://localhost:3000","http://localhost:3002"})
	public List<Menu> getMenu() {
		return menuRepo.findAll();
	}

	@PostMapping("/item")
	@CrossOrigin(origins= {"http://localhost:3001","http://localhost:3000"})
	public void createItem(@RequestBody Menu menu) {
		menuRepo.save(menu);
	}
	@DeleteMapping("/item/{itemName}")
	@CrossOrigin(origins= {"http://localhost:3001","http://localhost:3000"})
	public void deleteItem(@PathVariable String itemName) {
		menuRepo.deleteItem(itemName);
	}
	@PutMapping("/item/{itemPrice}/{itemName}")
	@CrossOrigin(origins= {"http://localhost:3001","http://localhost:3000"})
	public void editItemPrice(@PathVariable Integer itemPrice,@PathVariable String itemName) {
		menuRepo.editItemPrice(itemPrice, itemName);
		
	}
	@PostMapping("/category/{category}")
	@CrossOrigin(origins="http://localhost:3000")
	public void addCategory(@PathVariable String category) {
		Menu m=new Menu();
		m.setItemCategory(category);
		menuRepo.save(m);
	}
	@DeleteMapping("/category/{category}")
	@CrossOrigin(origins="http://localhost:3000")
	public void deleteCategory(@PathVariable String category) {
		menuRepo.deleteCategory(category);
	}
	
}

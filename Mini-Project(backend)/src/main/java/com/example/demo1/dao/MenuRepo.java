package com.example.demo1.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo1.model.Menu;

public interface MenuRepo extends JpaRepository<Menu, Integer> {

	@Query("delete from Menu m where m.itemName=:itemName")
	@Modifying
	public void deleteItem(@Param("itemName") String itemName);

	@Query("update Menu m set m.itemPrice=:itemPrice where m.itemName=:itemName")
	@Modifying
	public void editItemPrice(@Param("itemPrice") Integer itemPrice, @Param("itemName") String itemName);

	@Query("delete from Menu m where m.itemCategory=:category")
	@Modifying
	public void deleteCategory(@Param("category") String category);

}

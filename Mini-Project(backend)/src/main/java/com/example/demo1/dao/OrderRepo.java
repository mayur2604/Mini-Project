package com.example.demo1.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo1.model.RestaurantOrder;

public interface OrderRepo extends JpaRepository<RestaurantOrder, String> {

	@Query("select r from RestaurantOrder r where r.tableId=:tableId and r.itemName=:itemName ")
	public List<RestaurantOrder> getOrder(@Param("itemName") String itemName, @Param("tableId") Integer tableId);

	@Query("update RestaurantOrder r set r.quantity=:quantity where r.tableId=:tableId and r.itemName=:itemName and r.status=:status")
	@Modifying
	public void updateOrder(@Param("itemName") String itemName, @Param("tableId") Integer tableId,
			@Param("quantity") Integer quantity, @Param("status") String status);

	@Query("delete from RestaurantOrder r where r.itemName=:itemName and r.tableId=:tableId")
	@Modifying
	public void deleteOrder(@Param("itemName") String itemName, @Param("tableId") Integer tableId);

	@Query("select r from RestaurantOrder r where r.tableId=:tableId and r.status=:status")
	public List<RestaurantOrder> getOrderByTableId(@Param("tableId") Integer tableId,@Param("status") String status);

	@Query("delete from RestaurantOrder r where r.tableId=:tableId")
	@Modifying
	public void deleteOrderByTableId(@Param("tableId") Integer tableId);

	@Query("select r from RestaurantOrder r where r.status=:status")
	public List<RestaurantOrder> getOrdersByStatus(@Param("status") String status);

	@Query("update RestaurantOrder r set r.status=:status where  r.tableId=:tableId and r.itemName=:itemName")
	@Modifying
	public void updateStatus(@Param("itemName") String itemName, @Param("tableId") Integer tableId,
			@Param("status") String status);
}

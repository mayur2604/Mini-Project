package com.example.demo1.model;

import java.util.List;

public class Bill {
Integer tableId;
List<RestaurantOrder> orders;
Integer amount;
Integer noOfItems;
public Integer getTableId() {
	return tableId;
}
public void setTableId(Integer tableId) {
	this.tableId = tableId;
}
public List<RestaurantOrder> getOrders() {
	return orders;
}
public void setOrders(List<RestaurantOrder> orders) {
	this.orders = orders;
}
public Integer getAmount() {
	return amount;
}
public void setAmount(Integer amount) {
	this.amount = amount;
}
public Integer getNoOfItems() {
	return noOfItems;
}
public void setNoOfItems(Integer noOfItems) {
	this.noOfItems = noOfItems;
}
}

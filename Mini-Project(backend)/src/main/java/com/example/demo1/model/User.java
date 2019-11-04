package com.example.demo1.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {
	@Id
String name;
String password;
String role;
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public String getPassword() {
	return password;
}
public void setPassword(String password) {
	this.password = password;
}
public String getRole() {
	return role;
}
public void setRole(String role) {
	role = role;
}
}

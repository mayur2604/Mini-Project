package com.example.demo1.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo1.model.Session;

public interface SessionRepo extends JpaRepository<Session, Integer> {

	@Query("update Session s set s.amount=:amount,s.noOfItems=:noOfItems where s.tableId=:tableId")
	@Modifying
	public void modifySession(@Param("tableId") Integer tableId, @Param("amount") Integer amount,
			@Param("noOfItems") Integer noOfItems);

	@Query("select s.tableId from Session s")
	public List<Integer> getTableIds();

}

package com.example.demo1.model;



import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity

public class Session {
	
	@Id
	private Integer tableId;
	private Integer amount;
	private Integer noOfItems;

	public Integer getTableId() {
		return tableId;
	}

	public void setTableId(Integer tableId) {
		this.tableId = tableId;
	}

	public Integer getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public Integer getNoOfItems() {
		return noOfItems;
	}

	public void setNoOfItems(Integer noOfItems) {
		this.noOfItems = noOfItems;
	}
	public String toString() {
		return tableId+" ";
	}

}

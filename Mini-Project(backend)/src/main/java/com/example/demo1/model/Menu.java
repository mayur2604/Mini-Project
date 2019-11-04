package com.example.demo1.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.transaction.Transactional;

@Entity
@SequenceGenerator(initialValue = 13,name="seq")
public class Menu {
	@GeneratedValue(generator = "seq",strategy = GenerationType.SEQUENCE)
	@Id
	Integer itemId;
	String itemName;
	Integer itemPrice;
	String itemCategory;

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public Integer getItemPrice() {
		return itemPrice;
	}

	public void setItemPrice(Integer itemPrice) {
		this.itemPrice = itemPrice;
	}

	public String getItemCategory() {
		return itemCategory;
	}

	public void setItemCategory(String itemCategory) {
		this.itemCategory = itemCategory;
	}
	public String toString() {
		return itemName+" "+itemPrice+" "+itemCategory;
	}

}

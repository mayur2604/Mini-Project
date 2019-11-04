package com.example.demo1.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo1.dao.OrderRepo;
import com.example.demo1.dao.SessionRepo;
import com.example.demo1.model.Bill;
import com.example.demo1.model.RestaurantOrder;
import com.example.demo1.model.Session;

@RestController
@Transactional
public class OrderController {
	@Autowired
	OrderRepo orderRepo;

	@Autowired
	SessionRepo sessionRepo;

	@GetMapping("/orders")
	@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001", "http://localhost:3002" })
	public List<RestaurantOrder> getOrders() {
		return orderRepo.findAll();
	}

	@GetMapping("/preparingOrders")
	@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001", "http://localhost:3002" })
	public List<RestaurantOrder> getPreparingOrders() {
		return orderRepo.getOrdersByStatus("preparing");
	}
	
	
	@PostMapping("/order/{tableId}/{amount}/{noOfItems}/{type}")
	@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3002" })
	public boolean addOrder(@RequestBody RestaurantOrder order, @PathVariable Integer tableId,
			@PathVariable Integer amount, @PathVariable Integer noOfItems, @PathVariable String type) {
		System.out.println(order);

		List<RestaurantOrder> l = orderRepo.getOrder(order.getItemName(), tableId);
		if (type.equals("old") && l.size() > 0 && l.get(0).getStatus().equals("done"))
			return false;
		sessionRepo.modifySession(tableId, amount, noOfItems);
		if (type.equals("new") && l.size()>0 && l.get(0).getStatus().equals("done")) {
			orderRepo.save(order);
			return true;
		}
		if (l.size() == 0)
			orderRepo.save(order);
		else {

			orderRepo.updateOrder(order.getItemName(), tableId, order.getQuantity(), "preparing");
		}
		return true;
	}

	@PostMapping("/status")
	@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3000" })
	public void changeStatus(@RequestBody RestaurantOrder order) {
		orderRepo.updateStatus(order.getItemName(), order.getTableId(), "done");

	}

	@PostMapping("/order/{itemPrice}")
	@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3000" })
	public void deleteOrder(@RequestBody RestaurantOrder r, @PathVariable Integer itemPrice) {
		System.out.println(r + " " + itemPrice);
		orderRepo.deleteOrder(r.getItemName(), r.getTableId());
		Optional<Session> s = sessionRepo.findById(r.getTableId());
		sessionRepo.modifySession(r.getTableId(), s.get().getAmount() - r.getQuantity() * itemPrice,
				s.get().getNoOfItems() - r.getQuantity());
	}

	@GetMapping("/bills")
	@CrossOrigin(origins = { "http://localhost:3001", "http://localhost:3000" })
	public List<Bill> getBills() {
		List<Integer> tables = sessionRepo.getTableIds();
		List<Bill> bills = new ArrayList<>();
		for (Integer tableId : tables) {
			Bill bill = new Bill();
			bill.setTableId(tableId);
			bill.setOrders(orderRepo.getOrderByTableId(tableId,"done"));
			Optional<Session> s = sessionRepo.findById(tableId);
			bill.setAmount(s.get().getAmount());
			bill.setNoOfItems(s.get().getNoOfItems());
			bills.add(bill);
		}
		return bills;
	}

	@PostMapping("/closeSession/{tableId}")
	@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3002" })
	public void closeSession(@PathVariable Integer tableId) {
		orderRepo.deleteOrderByTableId(tableId);
		sessionRepo.modifySession(tableId, 0, 0);
	}
}

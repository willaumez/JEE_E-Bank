package com.mybank.ebankingbackend.repositories;

import com.mybank.ebankingbackend.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
    @Query("select c from Customer c where c.name like :kw or c.email like :kw")
    List<Customer> searchCustomer(@Param("kw") String keyword);

    @Query("select c from Customer c where c.email like :email")
    Customer findCustomerByEmail(@Param("email") String email);
}
package com.mybank.ebankingbackend.repositories;

import com.mybank.ebankingbackend.entities.BankAccount;
import com.mybank.ebankingbackend.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BankAccountRepository extends JpaRepository<BankAccount,String> {

    @Query("select c from BankAccount c where c.id like :kw or c.customer.name like :kw")
    List<BankAccount> searchAccounts(@Param("kw") String keyword);

    @Query("SELECT c FROM BankAccount c WHERE c.customer.id = :id")
    List<BankAccount> findBankAccountByCustomerId(@Param("id") String id);

}
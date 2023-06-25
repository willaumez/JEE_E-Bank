package com.mybank.ebankingbackend.services;

import com.mybank.ebankingbackend.dtos.*;
import com.mybank.ebankingbackend.exceptions.BalanceNotSufficientException;
import com.mybank.ebankingbackend.exceptions.BankAccountNotFoundException;
import com.mybank.ebankingbackend.exceptions.CustomerNotFoundException;

import java.util.List;

public interface BankAccountService {


    CustomerDTO saveCustomer(CustomerDTO customerDTO);

    CurrentBankAccountDTO saveCurrentBankAccount(double initialBalance, double overDraft, Long customerId) throws
            CustomerNotFoundException;

    SavingBankAccountDTO saveSavingBankAccount(double initialBalance, double interestRate, Long customerId) throws
            CustomerNotFoundException;

    List<CustomerDTO> listCustomers();

    BankAccountDTO getBankAccount(String accountId) throws BankAccountNotFoundException;

    void debit(String accountId, double amount, String description) throws BankAccountNotFoundException,
            BalanceNotSufficientException;

    void credit(String accountId, double amount, String description) throws BankAccountNotFoundException;

    void transfer(String accountIdSource, String accountIdDestination, double amount) throws
            BankAccountNotFoundException, BalanceNotSufficientException;

    List<BankAccountDTO> bankAccountList();

    List<BankAccountDTO> customerBankAccounts(String accountId) throws BankAccountNotFoundException;

    CustomerDTO getCustomer(Long customerId) throws CustomerNotFoundException;
    CustomerDTO login(String email)throws CustomerNotFoundException;
    CustomerDTO updateCustomer(CustomerDTO customerDTO);

    void deleteCustomer(Long customerId);

    List<AccountOperationDTO> accountHistory(String accountId);

    AccountHistoryDTO getAccountHistory(String accountId, int page, int size) throws BankAccountNotFoundException;


    List<CustomerDTO> searchCustomer(String keyword);
    List<BankAccountDTO> searchAccounts(String keyword);



}

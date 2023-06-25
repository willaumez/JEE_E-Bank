package com.mybank.ebankingbackend.mappers;

import com.mybank.ebankingbackend.dtos.AccountOperationDTO;
import com.mybank.ebankingbackend.dtos.CurrentBankAccountDTO;
import com.mybank.ebankingbackend.dtos.CustomerDTO;
import com.mybank.ebankingbackend.dtos.SavingBankAccountDTO;
import com.mybank.ebankingbackend.entities.AccountOperation;
import com.mybank.ebankingbackend.entities.CurrentAccount;
import com.mybank.ebankingbackend.entities.Customer;
import com.mybank.ebankingbackend.entities.SavingAccount;

public interface BankAccountMapper {
    CustomerDTO fromCustomer(Customer customer);
    Customer fromCustomerDTO(CustomerDTO customerDTO);
    SavingBankAccountDTO fromSavingBankAccount(SavingAccount savingAccount);
    SavingAccount fromSavingBankAccountDTO(SavingBankAccountDTO savingBankAccountDTO);
    CurrentBankAccountDTO fromCurrentBankAccount(CurrentAccount currentAccount);
    CurrentAccount fromCurrentBankAccountDTO(CurrentBankAccountDTO currentBankAccountDTO);
    AccountOperationDTO fromAccountOperation(AccountOperation accountOperation);

}

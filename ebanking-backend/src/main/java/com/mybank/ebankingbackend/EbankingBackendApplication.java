package com.mybank.ebankingbackend;

import com.mybank.ebankingbackend.dtos.BankAccountDTO;
import com.mybank.ebankingbackend.dtos.CurrentBankAccountDTO;
import com.mybank.ebankingbackend.dtos.CustomerDTO;
import com.mybank.ebankingbackend.dtos.SavingBankAccountDTO;
import com.mybank.ebankingbackend.entities.*;
import com.mybank.ebankingbackend.enums.AccountStatus;
import com.mybank.ebankingbackend.enums.OperationType;
import com.mybank.ebankingbackend.enums.RoleType;
import com.mybank.ebankingbackend.exceptions.CustomerNotFoundException;
import com.mybank.ebankingbackend.repositories.AccountOperationRepository;
import com.mybank.ebankingbackend.repositories.BankAccountRepository;
import com.mybank.ebankingbackend.repositories.CustomerRepository;
import com.mybank.ebankingbackend.services.BankAccountService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

@SpringBootApplication
public class EbankingBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(EbankingBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner start(BankAccountService bankAccountService) {
        return args -> {
           /* Stream.of("Hassan", "Yassine", "Aicha", "Owani", "Sana", "Jency", "Williams").forEach(name -> {
                CustomerDTO customer = new CustomerDTO();
                customer.setName(name);
                customer.setRole(RoleType.ADMIN);
                customer.setPassword("admin");
                customer.setEmail(name + "@gmail.com");
                bankAccountService.saveCustomer(customer);
            });

            bankAccountService.listCustomers().forEach(customer -> {
                try {
                    bankAccountService.saveCurrentBankAccount(Math.random() * 90000, 9000, customer.getId());
                    bankAccountService.saveSavingBankAccount(Math.random() * 120000, 5.5, customer.getId());

                } catch (CustomerNotFoundException e) {
                    e.printStackTrace();
                }
            });

            List<BankAccountDTO> bankAccounts = bankAccountService.bankAccountList();
            for (BankAccountDTO bankAccount : bankAccounts) {
                for (int i = 0; i < 10; i++) {
                    String accountId;
                    if (bankAccount instanceof SavingBankAccountDTO) {
                        accountId = ((SavingBankAccountDTO) bankAccount).getId();
                    } else {
                        accountId = ((CurrentBankAccountDTO) bankAccount).getId();
                    }
                    bankAccountService.credit(accountId, 10000 + Math.random() * 120000, "Credit");
                    bankAccountService.debit(accountId, 1000 + Math.random() * 9000, "Debit");
                }
            }*/



        };
    }

}

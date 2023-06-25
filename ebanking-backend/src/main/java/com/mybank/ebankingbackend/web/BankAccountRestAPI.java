package com.mybank.ebankingbackend.web;

import com.mybank.ebankingbackend.dtos.*;
import com.mybank.ebankingbackend.exceptions.BalanceNotSufficientException;
import com.mybank.ebankingbackend.exceptions.BankAccountNotFoundException;
import com.mybank.ebankingbackend.exceptions.CustomerNotFoundException;
import com.mybank.ebankingbackend.services.BankAccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class BankAccountRestAPI {
    private BankAccountService bankAccountService;

    public BankAccountRestAPI(BankAccountService bankAccountService) {
        this.bankAccountService = bankAccountService;
    }

    @GetMapping("/accounts/{accountId}")
    public BankAccountDTO getBankAccount(@PathVariable String accountId) throws BankAccountNotFoundException {
        return bankAccountService.getBankAccount(accountId);
    }

    @GetMapping("/customer-accounts/{accountId}")
    public List<BankAccountDTO> getCustomerAccounts(@PathVariable String accountId) throws BankAccountNotFoundException {
        System.out.println("Customer-Id---" + accountId);
        return bankAccountService.customerBankAccounts(accountId);
    }

    @GetMapping("/accounts")
    public List<BankAccountDTO> listAccounts() {
        return bankAccountService.bankAccountList();
    }

    @GetMapping("/accounts/search")
    public List<BankAccountDTO> searchAccounts(@RequestParam(name = "keyword", defaultValue = "") String keyword) {
        return bankAccountService.searchAccounts("%" + keyword + "%");
    }

    @GetMapping("/accounts/{accountId}/operations")
    public List<AccountOperationDTO> getHistory(@PathVariable String accountId) {
        return bankAccountService.accountHistory(accountId);
    }

    @GetMapping("/accounts/{accountId}/pageOperations")
    public AccountHistoryDTO getAccountHistory(
            @PathVariable String accountId,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "5") int size) throws BankAccountNotFoundException {
        return bankAccountService.getAccountHistory(accountId, page, size);
    }

    @PostMapping("/accounts/debit")
    public DebitDTO debit(@RequestBody DebitDTO debitDTO) throws BankAccountNotFoundException, BalanceNotSufficientException {
        this.bankAccountService.debit(debitDTO.getAccountId(), debitDTO.getAmount(), debitDTO.getDescription());
        return debitDTO;
    }

    @PostMapping("/accounts/credit")
    public CreditDTO credit(@RequestBody CreditDTO creditDTO) throws BankAccountNotFoundException {
        this.bankAccountService.credit(creditDTO.getAccountId(), creditDTO.getAmount(), creditDTO.getDescription());
        return creditDTO;
    }

    @PostMapping("/accounts/transfer")
    public void transfer(@RequestBody TransferRequestDTO transferRequestDTO) throws BankAccountNotFoundException, BalanceNotSufficientException {
        this.bankAccountService.transfer(
                transferRequestDTO.getAccountSource(),
                transferRequestDTO.getAccountDestination(),
                transferRequestDTO.getAmount());
    }

    @PostMapping("/accounts/saveCurrentBankAccount")
    public CurrentBankAccountDTO saveCurrentBankAccount(@RequestBody CurrentBankAccountDTO accountDTO) throws CustomerNotFoundException {
        System.out.println("saveSavingBankAccount--"+accountDTO);
        this.bankAccountService.saveCurrentBankAccount(accountDTO.getBalance(), accountDTO.getOverDraft(), accountDTO.getCustomerDTO().getId());
        return accountDTO;
    }

    @PostMapping("/accounts/saveSavingBankAccount")
    public SavingBankAccountDTO saveSavingBankAccount(@RequestBody SavingBankAccountDTO accountDTO) throws CustomerNotFoundException {
        System.out.println("saveSavingBankAccount--"+accountDTO);
        this.bankAccountService.saveSavingBankAccount(accountDTO.getBalance(), accountDTO.getInterestRate(), accountDTO.getCustomerDTO().getId());
        return accountDTO;
    }


}
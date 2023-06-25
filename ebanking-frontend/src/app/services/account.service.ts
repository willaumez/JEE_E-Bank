import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {AccountsModel} from "../model/accounts.model";
import {AccountDetails} from "../model/Account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  constructor(private http:HttpClient) { }

  public getAccount(accountId: string, page: number, size: number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.backEndHost+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }

  public getAccountById(accountId: string):Observable<AccountsModel>{
    return this.http.get<AccountsModel>(environment.backEndHost+"/accounts/"+accountId);
  }

  public searchAccounts(keyword: string): Observable<Array<AccountsModel>> {
    return this.http.get<Array<AccountsModel>>(environment.backEndHost + "/accounts/search?keyword=" + keyword);
  }

  public getCustomerAccounts(customerId: string): Observable<Array<AccountsModel>> {
    console.log("data----",this.http.get<Array<AccountsModel>>(environment.backEndHost + "/customer-accounts/" + customerId));
    return this.http.get<Array<AccountsModel>>(environment.backEndHost + "/customer-accounts/" + customerId);
  }

  public debit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(environment.backEndHost+"/accounts/debit",data);
  }
  public credit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(environment.backEndHost+"/accounts/credit",data);
  }
  public transfer(accountSource: string,accountDestination: string, amount : number, description:string){
    let data={accountSource, accountDestination, amount, description }
    return this.http.post(environment.backEndHost+"/accounts/transfer",data);
  }

  public saveCurrentAccount(account: {} ):Observable<AccountsModel>{
    return this.http.post<AccountsModel>(environment.backEndHost+"/accounts/saveCurrentBankAccount", account);
  }

  public saveSavingAccount(account: {} ):Observable<AccountsModel>{
    return this.http.post<AccountsModel>(environment.backEndHost+"/accounts/saveSavingBankAccount", account);
  }


}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomerModel} from "../model/customer.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  constructor(private http:HttpClient) { }

  public getCustomers():Observable<Array<CustomerModel>>{
    return this.http.get<Array<CustomerModel>>(environment.backEndHost+"/customers");
  }

  public getCustomerAuth(email: string): Observable<CustomerModel>{
    return this.http.get<CustomerModel>(environment.backEndHost+"/customer/"+email);
  }

  public getCustomerById(id: number ): Observable<CustomerModel>{
    return this.http.get<CustomerModel>(environment.backEndHost+"/customers/"+id);
  }

  public searchCustomers(keyword: string ):Observable<Array<CustomerModel>>{
    return this.http.get<Array<CustomerModel>>(environment.backEndHost+"/customers/search?keyword="+keyword);
  }

  public saveCustomers(customer: CustomerModel ):Observable<CustomerModel>{
    return this.http.post<CustomerModel>(environment.backEndHost+"/customers", customer);
  }

  public deleteCustomers(id: number ){
    return this.http.delete(environment.backEndHost+"/customers/"+id);
  }

  public updateCustomer(customer: CustomerModel): Observable<CustomerModel> {
    return this.http.put<CustomerModel>(environment.backEndHost + "/customers/" + customer.id, customer);
  }



}

import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {catchError, Observable, throwError} from "rxjs";
import {CustomerModel} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{
  customers! : Observable<Array<CustomerModel>>;
  errorMessage! : String;

  searchFormGroup : FormGroup | undefined;

  constructor(private customerService : CustomerService, private fb : FormBuilder, private router: Router, public authService: AuthenticationService) {
  }
  ngOnInit() {

    //Formulaire
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    })

    //Requettes
    this.handleSearchCustomer();


  }

  handleSearchCustomer() {
    let kw= this.searchFormGroup?.value.keyword;
    this.customers= this.customerService.searchCustomers(kw).pipe(
      catchError(err =>{
        this.errorMessage= err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteCustomer(customer: CustomerModel) {
    let conf = confirm("Are you sur?")

    if (!conf) return;
    this.customerService.deleteCustomers(customer.id).subscribe({
      next: (resp)=>{
        this.handleSearchCustomer();
        //this.toast.success('Customer has been successfully deleted!', 'Succès');
        alert("Customer has been successfully deleted!  ")
      },
      error:err => {
        console.log(err);
      }
    });
  }

  handleCustomerAccounts(customer: CustomerModel) {
    if (this.authService.hasRole('ADMIN')){
      this.router.navigateByUrl("/admin/customer-accounts/"+customer.id, {state : customer});
    }
    else {
      this.router.navigateByUrl("/user/customer-accounts/"+customer.id, {state : customer});
    }
  }

  handleUpdateCustomer(customer: CustomerModel) {
    this.router.navigateByUrl("/admin/update-customer", {state : customer});
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, throwError} from "rxjs";
import {CustomerModel} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit{
  newCustomerFormGroup!: FormGroup;

  constructor(private fb : FormBuilder, private customerService : CustomerService, private router:Router) {
  }

  ngOnInit(): void {
    this.newCustomerFormGroup= this.fb.group({
      name : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      email : this.fb.control(null, [Validators.email, Validators.required]),
      role : this.fb.control("", [Validators.required]),
      password : this.fb.control("", [Validators.required]),
    })
  }

  handleSaveCustomer() {
    let customer:CustomerModel= this.newCustomerFormGroup?.value;
    this.customerService.saveCustomers(customer).subscribe({
      next: data=>{
        alert("Customer has been successfully saved!  ")
        this.router.navigateByUrl("/admin/customers");
      },
      error:err => {
        console.log(err);
      }
    });
  }
}

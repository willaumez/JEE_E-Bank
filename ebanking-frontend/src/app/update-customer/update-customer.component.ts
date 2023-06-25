import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerModel} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit{
  updateCustomerFormGroup!: FormGroup;
  customer!: CustomerModel; // Variable to store the customer ID

  constructor(private fb : FormBuilder, private customerService : CustomerService, private router:Router, private route: ActivatedRoute) {
    this.customer = (this.router.getCurrentNavigation()?.extras.state as CustomerModel);

  }

  ngOnInit(): void {
    this.updateCustomerFormGroup = this.fb.group({
      id : this.fb.control(this.customer.id),
      name : this.fb.control(this.customer.name, [Validators.required, Validators.minLength(4)]),
      email : this.fb.control(this.customer.email, [Validators.email, Validators.required]),
      role : this.fb.control(this.customer.role, [Validators.required]),
      password : this.fb.control(this.customer.password, [Validators.required]),
    });
  }

  handleUpdateCustomer() {
    let customer: CustomerModel = this.updateCustomerFormGroup?.value;
    if (!customer.id) {
      console.log("Customer ID is undefined. Aborting update.");
      return;
    }
    this.customerService.updateCustomer(customer).subscribe({
      next: data => {
        alert("Customer has been successfully updated!");
        this.router.navigateByUrl("/admin/customers");
      },
      error: err => {
        console.log(err);
      }
    });
  }



}

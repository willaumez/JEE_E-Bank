import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../services/account.service";
import {CustomerModel} from "../model/customer.model";
import {AccountsModel} from "../model/accounts.model";
import { Observable, of,} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {CustomerService} from "../services/customer.service";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {
  errorMessage!: string;
  customerId!: number;
  customer$!: Observable<CustomerModel>;
  accounts$!: Observable<AccountsModel[]>;
  errorTemplate: any;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private customerService: CustomerService,
              public authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.customerId = params['id'];
      this.customer$ = this.customerService.getCustomerById(this.customerId);
      console.log("this.customerId---",this.customerId);
    });

    this.handleCustomerAccounts();
  }

  handleCustomerAccounts() {
    this.accountService.getCustomerAccounts(this.customerId.toString())
      .subscribe(
        accounts => {
          this.accounts$ = of(accounts);
        },
        error => {
          this.errorMessage = error.message;
          console.error(error);
        }
      );
  }

  handleDetailAccount(id: string) {
    if (this.authService.hasRole('ADMIN')){
      this.router.navigateByUrl("/admin/account-operation/" + id);
    }
    else {
      this.router.navigateByUrl("/user/account-operation/" + id);
    }

  }

  handleAddAccounts(customer: CustomerModel) {
    this.router.navigateByUrl("/admin/add-account", {state: customer});
  }
}

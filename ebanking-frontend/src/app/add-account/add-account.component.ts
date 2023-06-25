import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerModel} from "../model/customer.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountsModel} from "../model/accounts.model";
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit{
  addAccountFormGroup!: FormGroup;
  customer!: CustomerModel;

  constructor(private fb : FormBuilder, private accountService : AccountService, private router:Router, private route: ActivatedRoute) {
    this.customer = (this.router.getCurrentNavigation()?.extras.state as CustomerModel);
  }

ngOnInit(): void {
    this.addAccountFormGroup = this.fb.group({
      type : this.fb.control("",[Validators.required]),
      balance : this.fb.control(null,[Validators.required]),
      interestRate : this.fb.control(null),
      overDraft : this.fb.control(null),
    });
  }
  handleSaveAccount() {
    let account:AccountsModel= this.addAccountFormGroup?.value;
    if (account.type == "SavingAccount"){
      let accountSaving= {
        balance: account.balance,
        customerDTO: this.customer,
        interestRate: account.interestRate
      }
      this.accountService.saveSavingAccount(accountSaving).subscribe({
        next: data=>{
          alert("Account has been successfully Added!  ")
          console.log("Account--ID--",this.customer.id,"---  Account--",this.customer)
          this.router.navigateByUrl("/admin/customer-accounts/"+this.customer.id, {state : this.customer});
        },
        error:err => {
          console.log(err);
        }
      });
    }
    else {
      let accountCurrent= {
        balance: account.balance,
        customerDTO: this.customer,
        overDraft: account.overDraft
      }
      this.accountService.saveCurrentAccount(accountCurrent).subscribe({
        next: data=>{
          alert("Account has been successfully Added!  ")
          console.log("Account--ID--",this.customer.id,"---  Account--",this.customer)
          this.router.navigateByUrl("/admin/customer-accounts/"+this.customer.id, {state : this.customer});
        },
        error:err => {
          console.log(err);
        }
      });
    }
  }
  handleReturn() {
    this.router.navigateByUrl("/admin/customer-accounts/"+this.customer.id, {state : this.customer});
  }


}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../services/account.service";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../model/Account.model";
import {AccountsModel} from "../model/accounts.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-account-operation',
  templateUrl: './account-operation.component.html',
  styleUrls: ['./account-operation.component.css']
})
export class AccountOperationComponent implements OnInit{
  accountId! : string;
  customerId! : number;
  errorMessage! : String;
  currentPage : number=0;
  pageSize : number=7;

  accountDetails$! : Observable<AccountDetails>
  account! : Observable<AccountsModel>

  operationFromGroup! : FormGroup;

  constructor(private fb : FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private accountService : AccountService,
              public authService: AuthenticationService) {
  }
  ngOnInit(): void {
    this.operationFromGroup=this.fb.group({
      operationType : this.fb.control(null),
      amount : this.fb.control(0),
      description : this.fb.control(null),
      accountDestination : this.fb.control(null)
    })

    this.route.params.subscribe(params => {
      this.accountId = params['id'];
    });

    if (this.accountId){
      this.handleGetDetail();
    }
  }

  handleGetDetail() {
    this.accountDetails$=this.accountService.getAccount(this.accountId,this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
    this.account= this.accountService.getAccountById(this.accountId).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );

    this.account.subscribe((account: AccountsModel) => {
      this.customerId= account.customerDTO.id
    })
  }

  handleDeleteOperation(id: number) {

  }

  gotoPage(page: number) {
    this.currentPage=page;
    this.handleGetDetail()
  }

  handleAccountOperation() {
    let accountId: string = this.accountId;
    let operationType = this.operationFromGroup.value.operationType;
    let amount: number = this.operationFromGroup.value.amount;
    let description: string = this.operationFromGroup.value.description;
    let accountDestination: string = this.operationFromGroup.value.accountDestination;

    if (operationType == 'DEBIT') {
      this.accountService.debit(accountId, amount, description).subscribe({
        next: (data) => {
          alert("Success Credit");
          this.operationFromGroup.reset();
          this.handleGetDetail();
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else if (operationType == 'CREDIT') {
      this.accountService.credit(accountId, amount, description).subscribe({
        next: (data) => {
          alert("Success Debit");
          this.operationFromGroup.reset();
          this.handleGetDetail();
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else if (operationType == 'TRANSFER') {
      this.accountService.transfer(accountId, accountDestination, amount, description).subscribe({
        next: (data) => {
          alert("Success Transfer");
          this.operationFromGroup.reset();
          this.handleGetDetail();
        },
        error: (err) => {
          console.log(err);
        }
      });

    }
    this.operationFromGroup.reset();
  }


  handleReturn() {
    if (this.authService.hasRole('ADMIN')){
      this.router.navigateByUrl("/admin/customer-accounts/"+this.customerId);
    }
    else {
      this.router.navigateByUrl("/user/customer-accounts/"+this.customerId);
    }
  }
}

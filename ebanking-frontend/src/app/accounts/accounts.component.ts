import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {AccountsModel} from "../model/accounts.model";
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{
  accountSearchFormGroup! : FormGroup;
  accounts$!: Observable<Array<AccountsModel>>;
  errorMessage! : String;

  constructor(private fb : FormBuilder, private accountService : AccountService, private router:Router) {
  }

  ngOnInit(): void {
    this.accountSearchFormGroup = this.fb.group({
      keyword: ['']
    });

    this.handleSearchAccounts();
  }


  handleSearchAccounts() {
    let kw = this.accountSearchFormGroup.get('keyword')?.value;
    this.accounts$ = this.accountService.searchAccounts(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleDetailAccount(id: string) {
    this.router.navigateByUrl("/admin/account-operation/"+id);
  }
}

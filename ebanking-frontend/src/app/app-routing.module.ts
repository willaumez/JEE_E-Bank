import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {AccountOperationComponent} from "./account-operation/account-operation.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";
import {LoginComponent} from "./login/login.component";
import {UpdateCustomerComponent} from "./update-customer/update-customer.component";
import {AddAccountComponent} from "./add-account/add-account.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {UserTemplateComponent} from "./user-template/user-template.component";

const routes: Routes = [
  {path: "admin", component: AdminTemplateComponent, canActivate: [AuthenticationGuard], children : [
      {path: "customers", component: CustomersComponent},
      {path: "accounts", component: AccountsComponent},
      {path: "new-Customer", component: NewCustomerComponent},
      {path: "update-customer", component: UpdateCustomerComponent},
      {path: "add-account", component: AddAccountComponent },
      {path: "account-operation/:id", component: AccountOperationComponent },
      {path: "customer-accounts/:id", component: CustomerAccountsComponent },
    ]},

  {path: "user", component: UserTemplateComponent, canActivate: [AuthenticationGuard], children : [
      {path: "account-operation/:id", component: AccountOperationComponent },
      {path: "customer-accounts/:id", component: CustomerAccountsComponent },
    ]},
  {path: "login", component: LoginComponent},
  {path: "", component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

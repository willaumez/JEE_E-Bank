import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { FooterComponent } from './footer/footer.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { AccountOperationComponent } from './account-operation/account-operation.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LoginComponent } from './login/login.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { UserTemplateComponent } from './user-template/user-template.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomersComponent,
    AccountsComponent,
    FooterComponent,
    NewCustomerComponent,
    AccountOperationComponent,
    CustomerAccountsComponent,
    LoginComponent,
    UpdateCustomerComponent,
    AddAccountComponent,
    AdminTemplateComponent,
    UserTemplateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

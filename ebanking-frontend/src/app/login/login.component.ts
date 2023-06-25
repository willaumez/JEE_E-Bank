import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {CustomerModel} from "../model/customer.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userFormGroup!: FormGroup;
  errorMessage!: any;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  handleLogin() {
    let email = this.userFormGroup.value.email;
    let password = this.userFormGroup.value.password;
    this.authService.login(email, password).subscribe({
      next: (appUser) => {
        this.authService.authentication(appUser).subscribe({
          next: (authenticatedAppUser) => {
            if (this.authService.hasRole("ADMIN")) {
              this.router.navigateByUrl("/admin/customers");
            } else {
              this.router.navigateByUrl("/user/customer-accounts/" + appUser.id, {state: appUser}).then(r =>
                console.log("ustomer", appUser)
              );
            }
          }
        });
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }


}

import {Injectable} from '@angular/core';
import {CustomerModel} from "../model/customer.model";
import {catchError, map, Observable, of} from "rxjs";
import {CustomerService} from "./customer.service";


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  customer!: Observable<CustomerModel>;
  authenticationUser: CustomerModel | undefined;

  constructor(private customerService: CustomerService) {
  }

  public login(email: string, password: string): Observable<CustomerModel> {
    return this.customerService.getCustomerAuth(email).pipe(
      catchError(() => {
        throw new Error('User not found');
      }),
      map((appUser: CustomerModel) => {
        if (appUser.password !== password) {
          throw new Error('Bad credentials');
        }
        return appUser;
      })
    );
  }

  public authentication(appUser: CustomerModel): Observable<boolean> {
    this.authenticationUser = appUser;
    localStorage.setItem("authUser", JSON.stringify({
      name: appUser.name,
      email: appUser.email,
      role: appUser.role,
      jwt: "JWT_TOKEN"
    }))
    return of(true)
  }

  public hasRole(role: string): boolean {
    return this.authenticationUser!.role.includes(role);
  }

  public isAuthenticated() {
    return this.authenticationUser != undefined;
  }

  public logout(): Observable<boolean> {
    this.authenticationUser = undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }


}

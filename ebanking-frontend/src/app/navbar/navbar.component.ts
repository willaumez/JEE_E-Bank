import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  constructor(private router: Router, public authService: AuthenticationService) {
  }
  isCustomersActive(): boolean {
    return this.router.isActive('/admin/customers', true);
  }


  isAccountsActive(): boolean {
    return this.router.isActive('/admin/accounts', true);
  }

  protected readonly AuthenticationService = AuthenticationService;

  handleLogout() {
    this.authService.logout().subscribe({
      next: (data)=>{
        this.router.navigateByUrl("/login");
      }
    });

  }
}

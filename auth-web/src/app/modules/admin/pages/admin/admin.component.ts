import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { User } from '../../../../core/interfaces/auth.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  protected user!: User;

  constructor(protected router: Router, 
      protected authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.user) {
      this.user = this.authService.user;
    }
  }

  /**
   * Logout de usuario
   */
  protected logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}

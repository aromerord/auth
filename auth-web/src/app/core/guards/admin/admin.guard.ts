import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard  {
  constructor(protected authService: AuthService, private router: Router) {}

  canActivate(): boolean {

    if (this.authService.user.role === 'admin') {
      return true;
    } else {
      this.router.navigateByUrl('/admin/perfil');
      return false;
    }

  }
}

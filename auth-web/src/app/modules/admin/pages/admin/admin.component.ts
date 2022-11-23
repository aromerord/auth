import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent {

  constructor(protected router: Router, 
              protected authService: AuthService) { }

  /**
   * Logout de usuario
   */
  protected logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}

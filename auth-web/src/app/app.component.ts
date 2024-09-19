import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { User } from './core/interfaces/user.interface';
import { AuthService } from './core/services/auth/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateConfigModule } from './shared/modules/translate-config/translate-config.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    TranslateModule,
    TranslateConfigModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  protected user!: User | null;

  constructor(protected router: Router,
      protected translate: TranslateService, 
      protected authService: AuthService) {}

  ngOnInit(): void {
    this.translate.setDefaultLang('es');
    this.authService.userData.subscribe(res => {
      this.user = res;
    })
  }

  /**
   * Logout de usuario
   */
  protected logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateConfigModule } from '../../../../shared/modules/translate-config/translate-config.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    TranslateConfigModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected form: FormGroup;

  constructor(
    protected fb: FormBuilder,
    protected router: Router,
    protected toast: ToastrService,
    protected translate: TranslateService,
    protected authService: AuthService
  ) {
    this.translate.setDefaultLang('es');
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Login de usuarios
   */
  protected login() {
    const { email, password } = this.form.value;
    let req = {
      email: email,
      password: password,
    };
    this.authService.login(req).subscribe({
      next: (res: any) => {
        if (res.id) {
          this.translate.get('login_ok').subscribe((msg: string) => {
            this.toast.success(msg);
          });
          this.router.navigateByUrl('/perfil');
        } else {
          this.toast.error(res.msg);
        }
      },
      error: (e: any) => {
        this.translate.get('err500').subscribe((msg: string) => {
          this.toast.error(msg);
        });
      },
    });
  }
}

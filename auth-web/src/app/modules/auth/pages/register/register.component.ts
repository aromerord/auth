import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { TranslateConfigModule } from '../../../../shared/modules/translate-config/translate-config.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { User } from '../../../../core/interfaces/user.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    TranslateConfigModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
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
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Registro de usuarios
   */
  protected register() {
    const { name, email, password } = this.form.value;
    const req: User = {
      name: name,
      email: email,
      password: password,
      registerDate: new Date()
    };
    this.authService.register(req).subscribe({
      next: (res: any) => {
        if (res.id) {
          this.translate.get('register_ok').subscribe((msg: string) => {
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

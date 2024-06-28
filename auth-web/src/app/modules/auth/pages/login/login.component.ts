import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  protected form: FormGroup;

  constructor(protected fb: FormBuilder,
    protected router: Router,
    protected toast: ToastrService,
    protected authService: AuthService) {

    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  /**
   * Login de usuarios
   */
  protected login() {
    const { email, password } = this.form.value;
    let req = {
        email: email,
        password: password
    }
    this.authService.login(req).subscribe({
      next: (res: any) => {
        if (res.ok) {
          this.toast.success('Login completado con éxito', '');
          this.router.navigateByUrl('/admin/perfil');
        } else {
          this.toast.error(res.msg, '');
        }
      },
      error: (e: any) => this.toast.error(e, '')
    });
  }


}

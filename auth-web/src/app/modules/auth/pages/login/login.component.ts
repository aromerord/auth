import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  protected form: FormGroup;

  constructor(protected fb: FormBuilder,
    protected router: Router,
    protected authService: AuthService,
    protected toast: ToastrService) {

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
      next: (res) => {
        if (res.ok) {
          this.toast.success('¡Bienvenido!', '');
          this.router.navigateByUrl('/admin/perfil');
        } else {
          this.toast.error(res.msg, '');
        }
      },
      error: (e) => this.toast.error(e, '')
    });
  }


}

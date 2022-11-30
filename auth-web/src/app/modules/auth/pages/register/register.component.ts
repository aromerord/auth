import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/interfaces/auth.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  protected form: FormGroup;

  constructor(protected fb: FormBuilder,
              protected router: Router,
              protected toast: ToastrService,
              protected authService: AuthService) { 

    this.form = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
  }

  /**
   * Registro de usuarios
   */
  protected register() {
    const {name, email, password} = this.form.value;
    const req: User = {
      name: name,
      email: email,
      password: password
    }
    this.authService.register(req).subscribe({
      next: (res) => {
        if (res.ok) {
          this.toast.success('Registro completado con éxito', '');
          this.router.navigateByUrl('/admin/perfil');
        } else {
          this.toast.error(res.msg, '');
        }
      },
      error: (e) => this.toast.error(e, '')
    });
  }


}

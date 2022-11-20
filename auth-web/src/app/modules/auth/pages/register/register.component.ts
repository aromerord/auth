import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  protected form: FormGroup;

  constructor(protected fb: FormBuilder,
              protected router: Router) { 

    this.form = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
  }

  /**
   * Login de usuarios
   */
  protected register() {
    console.log(this.form.value)
    this.router.navigateByUrl('/admin/usuarios');
  }


}

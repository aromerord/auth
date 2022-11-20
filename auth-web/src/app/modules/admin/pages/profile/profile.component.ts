import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  protected form: FormGroup;

  constructor(protected fb: FormBuilder, 
              protected authService: AuthService) {
    this.form = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
   }

  ngOnInit(): void {

    console.log(this.authService.user);

    this.form.patchValue(this.authService.user);

    
  }

}

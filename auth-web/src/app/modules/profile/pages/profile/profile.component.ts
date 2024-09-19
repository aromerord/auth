import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateConfigModule } from '../../../../shared/modules/translate-config/translate-config.module';
import { User } from '../../../../core/interfaces/user.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    TranslateConfigModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  protected form: FormGroup;

  constructor(
    protected fb: FormBuilder,
    protected authService: AuthService,
    protected translate: TranslateService
  ) {
    this.translate.setDefaultLang('es');
    this.form = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.authService.userData.subscribe((res) => {
      const user: User = res as User;
      if (user) {
        this.form.patchValue(user);
      }
    });
  }
}

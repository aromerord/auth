import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateConfigModule } from '../../../../shared/modules/translate-config/translate-config.module';
import { UserService } from '../../../../core/services/user/user.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [
    TranslateModule,
    TranslateConfigModule
  ],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css'
})
export class UserModalComponent {

  @Input() id!: string;
  @Output() userModalEvent = new EventEmitter<string>();

  constructor(
    protected userService: UserService,
    protected translate: TranslateService,
    protected toast: ToastrService
  ) {
    this.translate.setDefaultLang('es');
  }

  protected deleteUser(): void {
    this.userService
      .deleteUserById(this.id)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          if (res.ok) {
            this.userModalEvent.emit('userDeleted');
          } else {
            this.translate.get(`${res.code}`).subscribe((msg: string) => {
              this.toast.error(msg);
            });
          }
        },
        error: () => {
          this.translate.get('err500').subscribe((msg: string) => {
            this.toast.error(msg);
          });
        },
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateConfigModule } from '../../../../shared/modules/translate-config/translate-config.module';
import { UserService } from '../../../../core/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../core/interfaces/user.interface';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { UserModalComponent } from '../../components/user-modal/user-modal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    TranslateConfigModule,
    NgbPaginationModule,
    UserModalComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  protected users: User[];
  protected usersToShow: User[];
  protected page: number;
  protected pageSize: number;
  protected idUser: any;

  constructor(
    protected userService: UserService,
    protected translate: TranslateService,
    protected toast: ToastrService
  ) {
    this.translate.setDefaultLang('es');
    this.users = [];
    this.usersToShow = [];
    this.page = 1;
    this.pageSize = 5;
  }

  ngOnInit(): void {
    this.findAllUsers();
  }

  /**
   * Lista de usuarios
   */
  protected findAllUsers() {
    this.userService.findAllUsers().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.users = res;
          this.usersToShow = res;
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

  /**
   * Settea el id del usuario a eliminar
   */
  protected setIdUserToDelete(idBook: any) {
    this.idUser = idBook;
  }

  /**
   * Recarga la tabla tras la eliminación de un registro
   */
  protected reloadTable(event: string) {
    if (event === 'userDeleted') {
      this.translate.get('delete_ok').subscribe((msg: string) => {
        this.toast.success(msg);
      });
      this.findAllUsers();
    }
  }
}

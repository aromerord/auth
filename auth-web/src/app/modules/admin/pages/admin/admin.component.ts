import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent {

  constructor(protected router: Router) { }

  protected logout(){
    this.router.navigateByUrl('/login');
  }

}

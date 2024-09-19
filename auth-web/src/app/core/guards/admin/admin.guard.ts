import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { map, Observable } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state): Observable<boolean> => {
  
  /**
   * Utilizando la función inject, se pueden obtener los servicios necesarios dentro 
   * del guard sin necesidad de usar el decorador @Injectable.
   */
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.userData.pipe(
    map((user) => {
      if (user?.role === 'admin') {
        return true;
      } else {
        router.navigateByUrl('/perfil');
        return false;
      }
    })
  );

};

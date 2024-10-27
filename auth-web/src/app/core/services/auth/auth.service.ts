import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = `${environment.url}/auth`;
  private _userSubject = new BehaviorSubject<User | null>(null);

  constructor(protected http: HttpClient) {}

  /**
   * Datos del usuario
   */
  get userData(): Observable<User | null> {
    return this._userSubject;
  }

  /**
   * Login de usuarios
   * @param req Email y contraseña del usuario
   * @returns Datos de usuario y token
   */
  public login(req: User): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, req).pipe(
      tap((res) => this.setToken(res)),
      catchError((e) => of(e.error))
    );
  }

  /**
   * Registro de usuarios
   * @param req Datos del usuario
   * @returns Datos del usuario y token
   */
  public register(req: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, req).pipe(
      tap((res) => this.setToken(res)),
      catchError((e) => of(e.error))
    );
  }

  /**
   * Valida y renueva el token
   * @returns Datos del usuario y token
   */
  public validateToken(): Observable<boolean> {

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    return this.http.get<User>(`${this.url}/renew`, { headers }).pipe(
      map((res) => {
        this.setToken(res);
        if(res.id){
          return true;
        }
        return false;
      }),
      catchError((e) => of(false))
    );
  }

  /**
   * Logout de usuarios
   */
  public logout() {
    localStorage.removeItem('token');
  }

  /**
   * Guarda el token en el localStorage y settea el usuario
   * @param res
   */
  private setToken(res: User) {
    if (res) {
      localStorage.setItem('token', res.token!);
      const user = {
        id: res.id,
        name: res.name,
        email: res.email,
        role: res.role
      };
      this._userSubject.next(user);
    }
  }
}


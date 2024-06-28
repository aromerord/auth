import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Auth, User } from '../../interfaces/auth.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${environment.url}/auth`;
  private _user!: User;

  constructor(protected http: HttpClient) {}

  /**
   * Datos del usuario
   */
  get user(): User {
    return { ...this._user };
  }

  /**
   * Login de usuarios
   * @param req Email y contraseña del usuario
   * @returns Datos de usuario y token
   */
  public login(req: User): Observable<Auth> {
    return this.http.post<Auth>(`${this.url}/login`, req).pipe(
      tap((res) => this.setToken(res)),
      catchError((e) => of(e.error))
    );
  }

  /**
   * Registro de usuarios
   * @param req Datos del usuario
   * @returns Datos del usuario y token
   */
  public register(req: User): Observable<Auth> {
    return this.http.post<Auth>(`${this.url}/register`, req).pipe(
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
    return this.http.get<Auth>(`${this.url}/renew`, { headers }).pipe(
      map((res) => {
        this.setToken(res);
        return res.ok!;
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
  private setToken(res: Auth) {
    if (res.ok) {
      localStorage.setItem('token', res.token!);
      this._user = {
        uid: res.uid,
        name: res.name,
        email: res.email,
        role: res.role
      };
    }
  }
}

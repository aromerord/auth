import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../interfaces/user.interface';
import { catchError, Observable, of, tap } from 'rxjs';
import { Message } from '../../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = `${environment.url}/user`;

  constructor(protected http: HttpClient) {}

  /**
   * Lista de usuarios
   * @returns Lista de usuarios
   */
    public findAllUsers(): Observable<User[]> {
      const headers = new HttpHeaders().set(
        'x-token',
        localStorage.getItem('token') || ''
      );
      return this.http.get<User[]>(`${this.url}`, { headers }).pipe(
        catchError((e) => of(e.error))
      );
    }


    /**
     * Eliminar usuario
     * @returns 
     */
    public deleteUserById(id: string): Observable<Message> {
      const headers = new HttpHeaders().set(
        'x-token',
        localStorage.getItem('token') || ''
      );
      return this.http.delete<Message>(`${this.url}/${id}`, { headers }).pipe(
        catchError((e) => of(e.error)));
    }


}

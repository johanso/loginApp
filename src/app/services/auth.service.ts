import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../pages/models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyBc3Y0rMp1RiWdnGxi0iWtH-Hd90KmTwAI';
  userToken: string;

  constructor( private http: HttpClient  ) {
    this.readToken();
   }

  logout() {
    localStorage.removeItem('token');
  }

  login( usuario: UserModel ) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${ this.url }signInWithPassword?key=${ this.apiKey }`,
      authData
    ).pipe(
      map( resp => {
        this.saveToken( resp['idToken'] );
        return resp;
      })
    );
  }

  register( usuario: UserModel ) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${ this.url }signUp?key=${ this.apiKey }`,
      authData
    ).pipe(
      map( resp => {
        this.saveToken( resp['idToken'] );
        return resp;
      })
    );
  }

  private saveToken( idToken: string ) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  readToken() {
    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  isUserAuth(): boolean {
    return this.userToken.length > 2;
  }

}

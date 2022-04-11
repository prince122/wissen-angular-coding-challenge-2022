import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'https://reqres.in/api/login';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  isUserLoggedin: boolean;
  authtoken: string;
  userId: number;
  constructor(private http: HttpClient) {}

  setAuthResponse(data) {
    this.authtoken = data.token;
    this.userId = data.id;
    this.isUserLoggedin = true;
    if (typeof Storage !== 'undefined') {
      sessionStorage.setItem('authData', JSON.stringify(data));
    }
  }

  // modify the return type to properly use the full response
  login(username: string, password: string): Observable<any> {
    // implement here
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(API_URL,{username,password},httpOptions).pipe(
      map(res=>{

      })
    )

  }
}

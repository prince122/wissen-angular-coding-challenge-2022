import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

const API_URL = 'https://reqres.in/api/login';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  isUserLoggedin: boolean;
  authtoken: string;
  userId: number;
  constructor(private http: HttpClient) {}

  setAuthResponse(data) {
    debugger;
    this.authtoken = data.token;
    this.userId = data.id;
    this.isUserLoggedin = true;
    if (typeof Storage !== 'undefined') {
      sessionStorage.setItem('authData', JSON.stringify(data));
    }
  }

  clearAuthData() {
    this.authtoken = '';
    this.userId = null;
    this.isUserLoggedin = false;
    if (typeof Storage !== 'undefined') {
      sessionStorage.removeItem('authInfo');
    }
  }

  retrieveAuthResponse(): any | null {
    let authInfo = null;
    if (typeof Storage !== 'undefined') {
      if (sessionStorage.getItem('authInfo')) {
        authInfo = JSON.parse(sessionStorage.getItem('authInfo'));
      }
    }
    return authInfo;
  }

  // modify the return type to properly use the full response
  login(username: string, password: string): Observable<any> {
    // implement here
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(API_URL, { username, password }, httpOptions).pipe(
      map((res) => {
        debugger;
        this.setAuthResponse(res);
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error);
      })
    );
  }
}

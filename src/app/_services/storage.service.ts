import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.localStorage.clear();
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.saveUserID(user);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
  public getUserID(): any {
    const id = window.localStorage.getItem("user-id");
    if (id) {
      return JSON.parse(id);
    }

    return {};
  }
  public saveUserID(user: any): void {
    window.localStorage.removeItem("user-id");
    window.localStorage.setItem("user-id", JSON.stringify(user.id));
  }

  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  public saveAuthCodeVerifier(code: string):void{
    window.localStorage.removeItem("CodeVerifier");
    window.localStorage.setItem("CodeVerifier", code);
  }

  public getAuthCodeVerifier():any{
    return window.localStorage.getItem("CodeVerifier");
  }
}
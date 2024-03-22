import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:8080/api';

  private userData = new BehaviorSubject<any>(null);
  userAuthData: Observable<any> = this.userData.asObservable();


  constructor(private http: HttpClient) { }

  sendData(data: any) {
    console.log("DATA IN SERVICE", data);
    this.userData.next(data);
  }

  login(loginData: any) {
    return this.http.post(this.baseUrl + "/UserAuth/login/send_otp", loginData)
  }

  loginWithOTP(data: any) {
    return this.http.post(this.baseUrl + "/UserAuth/login", data)
  }

  signUp(signupData: any) {
    return this.http.post(this.baseUrl + "/UserAuth/registration/send_otp", signupData)
  }

  signupWithOTP(data: any) {
    return this.http.post(this.baseUrl + "/UserAuth/register", data)
  }

  logout() {
    return this.http.get(this.baseUrl + "/UserAuth/logout")
  }

  openExtensionTab(url: string) {
    (window as any).chrome.tabs.create({ url: url });
  }

}

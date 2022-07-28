import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.url
  constructor(private httpclient: HttpClient) { }

  // signup user 
  signup(data: any) {
    return this.httpclient.post(this.url +
      "/user/signup", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }

  // request for password
  forgotpassword(data: any) {
    return this.httpclient.post(this.url +
      "/user/forgotpassword", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }

  // login user
  login(data: any) {
    return this.httpclient.post(this.url +
      "/user/login", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }

  // checktoken
  checktoken() {
    return this.httpclient.get(this.url +
      "/user/checktoken")
  }

  // change password
  changePassword(data: any) {
    return this.httpclient.post(this.url +
      "/user/changepassword", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }

  // getuser
  getUser() {
    return this.httpclient.get(this.url +
      "/user/get/")
  }

  // updateuser
  update(data: any) {
    return this.httpclient.patch(this.url +
      "/user/update", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }
}

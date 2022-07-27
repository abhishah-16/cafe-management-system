import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.url
  constructor(private httpclient: HttpClient) { }

  addCategory(data: any) {
    return this.httpclient.post(this.url +
      "/category/create", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }

  updateCategory(data: any) {
    return this.httpclient.patch(this.url +
      "/category/update", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }

  getCategory() {
    return this.httpclient.get(this.url +
      "/category/get")
  }
}

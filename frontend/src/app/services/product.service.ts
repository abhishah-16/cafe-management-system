import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.url
  constructor(
    private httpclient: HttpClient
  ) { }

  addProduct(data: any) {
    return this.httpclient.post(this.url +
      "/product/create/", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }

  updateProduct(data: any) {
    return this.httpclient.patch(this.url +
      "/product/update/", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }

  getProducts() {
    return this.httpclient.get(this.url +
      "/product/get/")
  }

  updateProductStatus(data: any) {
    return this.httpclient.patch(this.url +
      "/product/update/status/", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }

  deleteProduct(id: any) {
    return this.httpclient.delete(this.url +
      "/product/delete/" + id, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }

  getProductsByCategory(id: any) {
    return this.httpclient.get(this.url +
      "/product/getbycategory" + id)
  }

  getProductById(id: any) {
    return this.httpclient.get(this.url +
      "/product/getbyid" + id)
  }
}

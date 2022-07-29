import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = environment.url
  constructor(private httpclient:HttpClient,) { }

  getDetails () {
    return this.httpclient.get(this.url+
      "/dashboard/details")
  }
}

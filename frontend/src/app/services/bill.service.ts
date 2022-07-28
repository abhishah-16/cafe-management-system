import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  url = environment.url
  constructor(private httpclient: HttpClient) { }

  generateReport(data: any) {
    return this.httpclient.post(this.url +
      "/bill/report/", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }

  getPdf(data: any): Observable<Blob> {
    return this.httpclient.post(this.url +
      "/bill/getpdf/", data, {
      responseType: 'blob'
    })
  }
}

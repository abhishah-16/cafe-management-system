import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
import jwt_decode from 'jwt-decode'
import { GlobalConstants } from '../shared/global-constant';
@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(private auth: AuthService,
    private router: Router,
    private snackbarservice: SnackbarService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let expectedrolearray = route.data
    expectedrolearray = expectedrolearray.expectedrole

    const token: any = localStorage.getItem('token')
    var tokenpayload: any
    try {
      tokenpayload = jwt_decode(token)
    } catch (error) {
      localStorage.clear()
      this.router.navigate(['/'])
    }
    let checkrole = false
    const n = expectedrolearray.length
    // console.log(expectedrolearray)
    for (let i = 0; i < n; i++) {
      // const element = rolearray[i];
      if (expectedrolearray[i] == tokenpayload.role) {
        checkrole = true
      }
    }
    if (tokenpayload.role == 'user' || tokenpayload.role == 'admin') {
      if (this.auth.isAuthenticated() && checkrole) {
        return true
      }
      this.snackbarservice.opensnackbar(GlobalConstants.unauthorized, GlobalConstants.error)
      this.router.navigate(['/cafe/dashboard'])
      return false
    } else {
      this.router.navigate(['/'])
      localStorage.clear()
      return false
    }
  }
}

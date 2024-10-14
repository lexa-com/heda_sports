import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedService } from '../Services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private shared: SharedService) {}

  canActivate(): Observable<boolean> | boolean {
    return this.shared.userArray.pipe(
      map((res) => {
        const isAuthenticated = res[0]?.admin === 'Yes';

        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      })
    );
  }
}

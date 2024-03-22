import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: object) { }

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (sessionStorage.getItem('sapCode') && sessionStorage.getItem('SessionID')) {
        return true; // User is logged in, allow access
      } else {
        this.router.navigate(['']); // Redirect to login page
        return false; // Prevent access to the route
      }
    }
    else {
      console.error('sessionStorage is not available on the server.');
      return false; // Prevent access to the route
    }
  }
}

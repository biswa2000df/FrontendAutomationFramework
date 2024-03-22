import { HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TableDataService } from './table-data.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const apiInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const tableDataService = inject(TableDataService);
  const router = inject(Router);

  const sessionId: any = sessionStorage?.getItem('SessionID');
  // console.log("IN INTERCEPTOr", sessionId);
  // document.cookie = JSESSIONID=${sessionId}

  req = req.clone({
    withCredentials: true // Ensure credentials are sent with the request
  });


  // req = req.clone(
  //     {
  //     // setHeaders: {
  //     //   'Set-Cookies': JSESSIONID=${sessionId}
  //     // }

  //   }
  //   // {
  //   //   headers: req.headers.set('Cookie', JSESSIONID=${sessionId})
  //   // }
  // )

  // console.log("IN INTERCEPTOr1", req);
  // return next(req);
  return next(req).pipe(
    tap(
      () => { },
      (error: any) => {
        // Handle session expiration error here
        if (error.status === 401) {
          // Clear session-related data
          sessionStorage.removeItem('SessionID');
          sessionStorage.removeItem('sapCode');
          sessionStorage.removeItem('username');
          let message = "Session expired. Please Login!!!"
          tableDataService.openSnackBar(message);
          router.navigate(['']);
          // Redirect the user to the login page or display a message
          // You can handle this based on your application's logic
          console.error('Session expired. Redirecting to login page...');
        }
      }
    )
  );
};

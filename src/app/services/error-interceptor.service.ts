import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from '../components/dialog/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.dialog.open(ErrorDialogComponent, {
            data: { message: 'An unexpected error occurred.' }, // You can customize this message
          });
          console.error('Global error handler:', error);
          return throwError('An unexpected error occurred.');
        })
      );
  }
}

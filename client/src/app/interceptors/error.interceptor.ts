import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

enum ErrorStatus {
  Succeess = 200,
  BadRequest = 400,
  InternalError = 500
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('intercepted!');
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      this.errorHandler(error);
      throw error.error
    }));
  }

  private errorHandler(error: HttpErrorResponse) {
    const status = error.status
    console.error(error.error)
    if (status == ErrorStatus.InternalError) {
      this.toastr.error("Oops, something went wrong.. please try again later","Error");
    }
  }
}

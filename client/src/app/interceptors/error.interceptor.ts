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
import { ServerError } from '../models/ServerError';

enum ErrorStatus {
  NoResponse = 0,
  Succeess = 200,
  BadRequest = 400,
  InternalError = 500
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((errorResponse: HttpErrorResponse) => {
      const error = this.errorHandler(errorResponse);
      throw error
    }));
  }

  private errorHandler(error: HttpErrorResponse): ServerError {
    const status = error.status
    console.error(error.error)
    if (status == ErrorStatus.InternalError || status == ErrorStatus.NoResponse) {
      this.toastr.error("Oops, something went wrong.. please try again later", "Error");
      return { msg: "", shouldDisplay: false }
    } else {
      error.error.shouldDisplay = true
      return error.error
    }
  }
}

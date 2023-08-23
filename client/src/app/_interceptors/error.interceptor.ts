import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private route: Router, private toaster: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error){
          switch(error.status){
            case 400:
              if(error.error.errors){ 
              const modalStateErrors = [];
              for(const key in error.error.errors){
                if(error.error.errors[key]){
                  modalStateErrors.push(error.error.errors[key])
                }
              } 
              throw modalStateErrors.flat(); // this is needed to throw the error to the component that called the interceptor
        }else{
          this.toaster.error(error.error, error.status.toString());
        }
        break;
        case 401:
          this.toaster.error('Unauthorized', error.status.toString());
          break;
        case 404:
          this.route.navigateByUrl('/not-found');
          break;
        case 500:
          const navigationExtras: NavigationExtras = {state: {error: error.error}};
          this.route.navigateByUrl('/server-error', navigationExtras);
          break;
        default:
          this.toaster.error('Something unexpected went wrong');
          console.log(error);
          break;     
      }
    }
    throw error;   // this is needed to throw the error to the component that called the interceptor
      })
    )
  }
}

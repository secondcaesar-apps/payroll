import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { SharedService } from './shared/shared.service';
import { finalize } from 'rxjs/operators';
@Injectable()
export class InterceptorServices implements HttpInterceptor {
    value:any;
    constructor(
        private shared: SharedService,
      ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = environment.token;
        this.value = this.shared.getInfo().value
        this.shared.isloading.next(true);

        if (idToken) {
            const customReq = request.clone({
                headers: request.headers.set("Authorization", " Bearer " +sessionStorage.getItem('jwt'))
            });
            return next.handle(customReq).pipe(
              finalize(
                ()=>{
                  this.shared.isloading.next(false);
                }
              )
            );
        }
        else {
           //  sessionStorage.setItem('jwt',environment.token);
            return next.handle(request).pipe(
              finalize(
                ()=>{
                  this.shared.isloading.next(false);
                }
              )
            );
        }
    }
}

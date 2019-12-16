import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
@Injectable()
export class InterceptorServices implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = environment.token;
        
        if (idToken) {
            const customReq = request.clone({
                headers: request.headers.set("Authorization", " Bearer " +idToken)
            });
            return next.handle(customReq);
        }
        else {
           //  sessionStorage.setItem('jwt',environment.token);
            return next.handle(request);
        }
    }
}

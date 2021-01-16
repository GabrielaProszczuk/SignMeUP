import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req, next){
    let serv = this.injector.get(UserService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Token ${serv.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}

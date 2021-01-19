import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService implements HttpInterceptor{

  constructor(private injector: Injector) { }
  tokenizedReq;
  intercept(req, next){
    let serv = this.injector.get(UserService)
    
    if(serv.getToken()){
      this.tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `JWT ${serv.getToken()}`
        }
      })
    }else{
      this.tokenizedReq = req.clone();
    }
    
    console.log(this.tokenizedReq);
    return next.handle(this.tokenizedReq)
  }
}

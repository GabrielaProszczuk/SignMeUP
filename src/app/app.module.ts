import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { NavigationComponent } from './components/layout/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { StudentComponent } from './components/student/student.component';
import { DeanComponent } from './components/dean/dean.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtService } from './services/jwt.service';
import { StudentDarkComponent } from './components/student-dark/student-dark.component';
import { DeanDarkComponent } from './components/dean-dark/dean-dark.component';
import { AdminDarkComponent } from './components/admin-dark/admin-dark.component';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    LoginComponent,
    StudentComponent,
    DeanComponent,
    AdminComponent,
    StudentDarkComponent,
    DeanDarkComponent,
    AdminDarkComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    HttpLinkModule
  //  JwtModule.forRoot({
     // config: {
       // tokenGetter: function  tokenGetter() {
         //    return     localStorage.getItem('access_token');},
           //  allowedDomains: ['localhost:4200'],
    //    disallowedRoutes: []
   //   }
  //  })
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://signmeupgqlapi.herokuapp.com/graphql/',
          }),
        };
      },
      deps: [HttpLink],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ){}
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StudentComponent } from './components/student/student.component';
import { DeanComponent } from './components/dean/dean.component';
import { NavigationComponent } from './components/layout/navigation/navigation.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'student', component: StudentComponent},
  {path: 'dean', component: DeanComponent},
  {path: 'menu', component: NavigationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

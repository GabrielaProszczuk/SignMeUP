import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StudentComponent } from './components/student/student.component';
import { DeanComponent } from './components/dean/dean.component';
import { NavigationComponent } from './components/layout/navigation/navigation.component';
import { AdminComponent } from './components/admin/admin.component';
import { StudentDarkComponent } from './components/student-dark/student-dark.component';
import { DeanDarkComponent } from './components/dean-dark/dean-dark.component';
import { AdminDarkComponent } from './components/admin-dark/admin-dark.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'student', component: StudentComponent},
  {path: 'dean', component: DeanComponent},
  {path: 'menu', component: NavigationComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'student-dark', component: StudentDarkComponent},
  {path: 'dean-dark', component: DeanDarkComponent},
  {path: 'admin-dark', component: AdminDarkComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

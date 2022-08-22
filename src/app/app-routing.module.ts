import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { listComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './components/guards/auth.guard';
import { modalComponent } from './components/modal/modal.component';
import { ChatComponent } from './components/chat/chat.component';


const routes: Routes = [
  {path:'',redirectTo: 'login',pathMatch: 'full'},

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'list',component:listComponent, canActivate:[AuthGuard]},
  {path: 'chat', component: ChatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

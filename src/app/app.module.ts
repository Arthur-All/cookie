import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MaterialModule } from './material.module';
import { listComponent } from './components/list/list.component';
import { LoginService } from './services/Auth.service';
import { ListService } from './services/list.service';
import { listModel } from './model/listModel';
import { loginModel } from './model/loginModel';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './components/guards/auth.guard';
import { QuaquercoisaInterceptor } from './quaquercoisa.interceptor';
import { modalComponent } from './components/modal/modal.component';
import { ChatComponent } from './components/chat/chat.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    listComponent,
    modalComponent,
    ChatComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7006"],
        disallowedRoutes: []
      }
    })

  ],
  providers: [AuthGuard,
    {provide: MatFormFieldModule, useValue: {appearance: 'fill'}
  },
  { provide: HTTP_INTERCEPTORS, useClass: QuaquercoisaInterceptor, multi: true },
  LoginService,
  ListService,
  listModel,
  loginModel
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

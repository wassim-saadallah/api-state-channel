import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


export class User{
  email: string;
  pwd: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  public user: User = new User();
  public errorMessage: string;

  constructor(public authService: AuthService, public router : Router) { }

  doLogin() {
    this.authService.doLogin(this.user.email, this.user.pwd)
        .then(() => this.router.navigate(['/dashboard']))
        .catch(_error => {
          this.errorMessage = _error.message;
          console.log(this.errorMessage)
          this.router.navigate(['/login'])
        })

  }

  doLogout(){
    this.authService.doLogout()
  }

}

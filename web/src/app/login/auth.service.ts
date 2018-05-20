import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { User } from '../login/login.component';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {


  authState: any = null;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  doLogin(email, password) {
    return this.afAuth.auth.setPersistence('session').then(()=>{
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
      })
      .catch(error => {
        console.log(error)
        throw error
      });
    })
  }

  doLogout() {
    return this.afAuth.auth
      .signOut()
      .then(res => {
        this.router.navigate(['/login'])
      })
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }

  get currentUserName(): string {
    return this.authState['email']
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }


  get isUserEmailLoggedIn(): boolean {
    if (this.authState !== null) {
      return true
    } else {
      return !this.tokenExpired();
    }
  }

  tokenExpired(): boolean{
    const apikey = environment.firebase.apiKey;
    let token = JSON.parse(sessionStorage[`firebase:authUser:${apikey}:angular-auth-firebase`]);
    if(!token)
      return false;
    return new Date().getTime() >= parseInt(token.stsTokenManager.expirationTime);
  }
}

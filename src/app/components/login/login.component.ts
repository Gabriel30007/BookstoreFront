import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { StorageService } from '../../_services/storage.service';
import { Router } from '@angular/router';
import { SignalrService } from 'src/app/_services/signalr.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router, private signalrService : SignalrService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
    this.signalrService.AuthentificationWithGoogle();
      // 3 - subscribe to messages received
      this.signalrService.AllFeedObservable
            .subscribe((data: any) => {
              window.location.href = data.toString();
            });
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        if(data.roles == 'NotLoggedIn') {
          this.isLoggedIn = false;
          this.isLoginFailed = true;
          //this.reloadPage();
        } else{
          this.storageService.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.storageService.getUser().roles;       
          this.router.navigate(['home'])
          .then(() => {
            window.location.reload();
          });
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  
  reloadPage(): void {
    window.location.reload();
  }

  LoginWithGoogle():void{
    this.storageService.saveAuthCodeVerifier(crypto.randomUUID());
    this.authService.LoginWithGoogle(this.storageService.getAuthCodeVerifier()).subscribe({
      next: data => {
        window.location.href = data.toString();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }


}
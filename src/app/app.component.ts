import { Component} from '@angular/core';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';
import { SignalrService } from 'src/app/_services/signalr.service';
import { User } from './models/user.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;
  title: string;
  allFeedSubscription: any;
  constructor(private storageService: StorageService, private authService: AuthService, private router: Router, private signalrService: SignalrService) {
    this.title = "FrontEndApp"
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('Role_Admin');
      this.username = user.username;
    }

    this.signalrService.startConnection().then(() => {
      console.log("connected");

      // 2 - register for ALL relay
      this.signalrService.listenToAllFeeds();
      this.signalrService.listenNewRegisteredUser();
      // 3 - subscribe to messages received
      this.signalrService.AllFeedObservable
        .subscribe((res: User) => {
          console.log(res);
        });
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        this.router.navigate(['home'])
          .then(() => {
            window.location.reload();
          });
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
  openBucket(): void {
    this.router.navigate(['bucket'])
  }  
}
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: any;
  private $allFeed: Subject<User> = new Subject<User>();
  public startConnection() {
    return new Promise((resolve, reject) => {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl("https://localhost:44346/notification").build();
        
      this.hubConnection.start()
        .then(() => {
          console.log("connection established");
          return resolve(true);
        })
        .catch((err: any) => {
          console.log("error occured" + err);
          reject(err);
        });
    });
  }

  constructor() { }
  public get AllFeedObservable(): Observable<User> {
    return this.$allFeed.asObservable();
  }
  
  public listenToAllFeeds() {
    (<HubConnection>this.hubConnection).on("GetFeed", (data: User) => {
      this.$allFeed.next(data);
    });
  }
  public listenNewRegisteredUser(){
    (<HubConnection>this.hubConnection).on("GetNewUser", (data: string) => {
      console.log("success");
      console.log("data");
      return data;
    });
  }
  public AuthentificationWithGoogle(){
    (<HubConnection>this.hubConnection).on("RedirectAfterAutorization", (data: string) => {
      return data;
    });
  }

}

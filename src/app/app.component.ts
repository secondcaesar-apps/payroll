import { Component } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hasNetworkConnection: boolean;
  hasInternetAccess: boolean;
  status:boolean;
  title = 'ng-uikit-pro-standard';
  constructor(private connectionService: ConnectionService) {
    this.connectionService.monitor().subscribe((currentState:any) => {
      this.hasNetworkConnection = currentState.hasNetworkConnection;
      this.hasInternetAccess = currentState.hasInternetAccess;
 console.log(currentState);
      if (currentState) {
        this.status = false;
      } else {
        this.status = true;
       
      }
    });
  }
}


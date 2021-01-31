import { Component, Renderer2 } from '@angular/core';
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
  constructor(private connectionService: ConnectionService, private _renderer: Renderer2,) {
    this.connectionService.monitor().subscribe((currentState:any) => {
      this.hasNetworkConnection = currentState.hasNetworkConnection;
      this.hasInternetAccess = currentState.hasInternetAccess;
 console.log(currentState);
      if (currentState) {
        this.status = false;
        this._renderer.removeClass(document.body,'bg-gradient');
        document.body.style.filter = 'grayscale(1%)';

      } else {
        this.status = true;

        this._renderer.addClass(document.body,'bg-gradient');
        document.body.style.filter = 'grayscale(100%)';

      }
    });
  }
}


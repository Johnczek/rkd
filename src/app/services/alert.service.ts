import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {NavigationStart, Router} from '@angular/router';
import {Alert} from '../model/alert.model';
import {AlertType} from '../enums/alertType.enum';

@Injectable()
export class AlertService {
  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Success, message, keepAfterRouteChange);
  }

  error(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Error, message, keepAfterRouteChange);
  }

  info(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Info, message, keepAfterRouteChange);
  }

  warn(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Warning, message, keepAfterRouteChange);
  }

  alert(type: AlertType, message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<Alert>{ type: type, message: message });
  }

  constructAlert(alert: Alert, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(alert);
  }

  parseAlerts(messages: [{messageContent, messageType}]) {
    for(let message of messages) {
      let alert = new Alert();
      alert.message = message.messageContent;

      switch (message.messageType) {
        case "danger":
          alert.type = AlertType.Error;
          break;
        case "info":
          alert.type = AlertType.Info;
          break;
        case "warning":
          alert.type = AlertType.Warning;
          break;
        case "success":
          alert.type = AlertType.Success;
          break;
        default:
          alert.type = AlertType.Primary
      }
      this.constructAlert(alert, true)
    }
  }

  clear() {
    // clear alerts
    this.subject.next();
  }
}

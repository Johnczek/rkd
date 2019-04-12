import {Component, OnInit} from '@angular/core';
import {TrainService} from '../services/train.service';
import {TrainModel} from '../model/train.model';
import {AlertService} from '../services/alert.service';
import {AlertType} from '../enums/alertType.enum';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {

  public trains: TrainModel[];

  constructor(
      public trainService: TrainService,
      public alertService: AlertService
  ) { }

  ngOnInit() {
    this.trains = this.trainService.getTrains();
  }

  alertTest() {
    let alertType: AlertType;

    switch (Math.floor(Math.random() * Math.floor(4))) {
      case 0:
        alertType = AlertType.Error;
        break;
      case 1:
        alertType = AlertType.Info;
        break;
      case 2:
        alertType = AlertType.Primary;
        break;
      case 3:
        alertType = AlertType.Warning;
        break;
      case 4:
        alertType = AlertType.Success;
        break;
    }

    this.alertService.alert(alertType, 'Tesovací message');
  }
}

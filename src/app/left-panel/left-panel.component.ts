import { Component, OnInit } from '@angular/core';
import {TrainService} from '../services/train.service';
import {TrainModel} from '../../model/train.model';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {

  public trains: TrainModel[];

  constructor(
      public trainService: TrainService
  ) { }

  ngOnInit() {
    this.trains = this.trainService.getTrains();
  }

}

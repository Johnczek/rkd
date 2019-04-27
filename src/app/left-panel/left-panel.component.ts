import {Component} from '@angular/core';
import {TrainService} from '../services/train.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent {

  constructor(
      public trainService: TrainService,
  ) { }

}

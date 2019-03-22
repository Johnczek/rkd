import {Component, HostListener, OnInit} from '@angular/core';
import {TrainService} from '../../services/train.service';
import {TrainModel} from '../../../model/train.model';
import {ActivatedRoute} from '@angular/router';
import noUiSlider from "nouislider";

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss']
})
export class TrainComponent implements OnInit {

  static readonly MAX_SPEED = 100;

  static readonly MIN_SPEED = 0;

  public trainId: number;

  public train: TrainModel;

  public slider;

  constructor(
      private trainService: TrainService,
      private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(map => {
        this.trainId = this.activatedRoute.snapshot.params.id;
        this.train = this.trainService.getTrainById(this.trainId);

          if(this.slider != null) {
            this.slider.noUiSlider.reset();
            this.slider.noUiSlider.set(this.train.speed);
          } else {
            this.slider = document.getElementById('slider');
            console.log('jsem tady');
            noUiSlider.create(this.slider, {
              start: this.train.speed,
              keyboardSupport: false,
              connect: [true, false],
              tooltips: true,
              range: {
                'min': TrainComponent.MIN_SPEED,
                'max': TrainComponent.MAX_SPEED
              }
            });
          }
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowRight':
          this.increaseSpeed(false);
          break;
      case 'ArrowLeft':
          this.decreaseSpeed(false);
          break;
      case 'ArrowDown':
          this.decreaseSpeed(true);
          break;
      case 'ArrowUp':
          this.increaseSpeed(true);
          break;
      case 'h':
          this.horn();
          break;
      case 'l':
          this.lights();
          break;
    }
  }

  private increaseSpeed(topSpeed:boolean) {
    let previousValue =  TrainComponent.MAX_SPEED-1;

    if (!topSpeed) {
      previousValue =  parseInt(this.slider.noUiSlider.get());
    }

    this.slider.noUiSlider.set(previousValue+1);

    //TODO Dodělat napojení na api
  }

  private decreaseSpeed(instantStop:boolean) {
    let previousValue:number = TrainComponent.MIN_SPEED-1;

    if(!instantStop) {
      previousValue =  parseInt(this.slider.noUiSlider.get());
    }

    this.slider.noUiSlider.set(previousValue-1);

    //TODO Dodělat napojení na api
  }

  private horn() {
    console.log('Horn');
    //TODO Dodělat napojení na api
  }

  private lights() {
    console.log('lights');
    //TODO Dodělat napojení na api
  }
}

import {Component, HostListener, OnInit} from '@angular/core';
import {TrainService} from '../../services/train.service';
import {TrainModel} from '../../../model/train.model';
import {ActivatedRoute} from '@angular/router';
import noUiSlider from 'nouislider';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss']
})
export class TrainComponent implements OnInit {
    public keyMap: {} = {
        0: 'q',
        1: 'w',
        2: 'e',
        3: 'r',
        4: 't',
        5: 'y',
        6: 'u',
        7: 'i',
        8: 'o',
        9: 'p',
        10: 'a',
        11: 's',
        12: 'd',
        13: 'f',
        14: 'g',
        15: 'h',
        16: 'j',
        17: 'k',
        18: 'l'
    };

  static readonly MAX_SPEED = 28;

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
            this.slider.noUiSlider.set(this.train.rychlostStupne);
          } else {
            this.slider = document.getElementById('slider');
            noUiSlider.create(this.slider, {
              start: this.train.rychlostStupne,
              keyboardSupport: false,
              connect: [true, false],
              tooltips: true,
              range: {
                'min': TrainComponent.MIN_SPEED,
                'max': TrainComponent.MAX_SPEED,
              },
              step: 1,
              format: {
                to: function ( value ) {
                  return Math.floor(value);
                },
                from: function ( value ) {
                  return Math.floor(value);
                }
              }
            });
          }
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowRight':
          this.increaseSpeed(1);
          break;
      case 'ArrowLeft':
          this.decreaseSpeed(1);
          break;
      case 'ArrowDown':
          break;
      case 'ArrowUp':
          break;
      case 'h':
          break;
      case 'l':
          break;
      default:
          let value = this.getKeyByValue(event.key);
            if (value !== 'undefined') {
                this.toggleFunction(+value);
            }
    }
  }

  public increaseSpeed(increaseValue:number) {
      let previousValue =  parseInt(this.slider.noUiSlider.get());

      this.setSpeed(previousValue+increaseValue);
  }

  public decreaseSpeed(decreaseValue:number) {
      let previousValue =  parseInt(this.slider.noUiSlider.get());

      this.setSpeed(previousValue-decreaseValue);
  }

  public setSpeed(speed: number) {
      this.slider.noUiSlider.set(speed);

    //TODO api connect
  }

  public toggleFunction(index: number) {
      this.train.toggleFunction(index);
  }

  public getKeyByValue(value) {
        return Object.keys(this.keyMap).find(key => this.keyMap[key] === value);
    }
}

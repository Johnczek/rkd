import { Injectable } from '@angular/core';
import {TrainModel} from '../model/train.model';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  public trains: TrainModel[] = [];

  constructor(private apiService:ApiService) {
  }


  getTrains(): TrainModel[] {
    this.trains = this.apiService.getAllTrains();

    return this.trains;
  }

  getTrainById(id: number): TrainModel {
      let train = this.trains.find(t => t.adresa == id);
      train.setDetailData(this.apiService.getTrainDetailById(id));

      return train;
  }

  setTrainDirection(train: TrainModel, direction: number) {
      this.trains.find(t => t.adresa === train.adresa).smer = direction;
      //TODO napojení na API
  }

  setTrainSpeed(train: TrainModel, speed: number) {
      this.trains.find(t => t.adresa === train.adresa).rychlostStupne = speed;
      //TODO napojení na API
  }

  toggleTrainFunction(train: TrainModel, functionIndex: number) {
      this.trains.find(t => t.adresa === train.adresa).toggleFunction(functionIndex);
      //TODO napojení na API
  }
}

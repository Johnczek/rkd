import {Injectable} from '@angular/core';
import {TrainModel} from '../model/train.model';
import {ApiService} from './api.service';
import {AlertService} from "./alert.service";

@Injectable({
    providedIn: 'root'
})
export class TrainService {

    public trains: TrainModel[] = [];

    constructor(private apiService:ApiService,
                private alertService: AlertService) {
        this.getTrains();
    }


    getTrains() {
        this.apiService.getAllTrains().subscribe((res: {loks?}) => {
            const data = res.loks;
            this.trains = data.map((lok) => new TrainModel(lok));
            return this.trains;
        });
    }

    getTrainById(id: number): TrainModel {
        return this.trains.find(t => t.adresa == id);
    }


    setTrainDirection(train: TrainModel, direction: number) {
        train.smer = direction;

        let changedTrain = new TrainModel();
        changedTrain.smer = train.smer;
        changedTrain.pictureURL = undefined;

        this.apiService.updateTrain(train.adresa, changedTrain).subscribe((data: {lokStav?, errors?}) => {
            if (data.errors !== undefined) {
                for(let error of data.errors) {
                    this.alertService.error(error.title);
                }
            }
            this.trains.find(t => t.adresa === train.adresa).smer = data.lokStav.smer;
        });
    }

    setTrainSpeed(train: TrainModel, speed: number) {
        let changedTrain = new TrainModel();
        changedTrain.rychlostStupne = speed;
        changedTrain.pictureURL = undefined;

        this.apiService.updateTrain(train.adresa, changedTrain).subscribe((data: {lokStav?, errors?}) => {
            if (data.errors !== undefined) {
                for(let error of data.errors) {
                    this.alertService.error(error.title);
                }
            }
            this.trains.find(t => t.adresa === train.adresa).rychlostStupne = data.lokStav.rychlostStupne;
        });
    }

    toggleTrainFunction(train: TrainModel, functionIndex: number) {
        this.trains.find(t => t.adresa === train.adresa).toggleFunction(functionIndex);
    }

    sendFunctionStatus(train: TrainModel) {
        let unchangedTrain = this.trains.find(t => t.adresa === train.adresa);

        let changedTrain = new TrainModel();
        changedTrain.stavFunkci = unchangedTrain.stavFunkci;
        changedTrain.pictureURL = undefined;

        this.apiService.updateTrain(train.adresa, changedTrain).subscribe((data: {lokStav?, errors?}) => {
            if (data.errors !== undefined) {
                for(let error of data.errors) {
                    this.alertService.error(error.title);
                }
            }
            this.trains.find(t => t.adresa === train.adresa).stavFunkci = data.lokStav.stavFunkci;
        });
    }
}

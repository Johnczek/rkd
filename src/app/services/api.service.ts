import {Injectable} from '@angular/core';
import {TrainModel} from '../model/train.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllTrains() {
      return this.http.get(environment.api+environment.apiAllTrains);
  }

    /**
     * Metoda vrátí vlak dle zadaného ID
     * @param id
     */
  getTrainDetailById(id: number) {
      return this.http.get(environment.api+environment.apiDetailDetail+id);
  }

    /**
     * Metoda updatuje některou z vlastností vlaku
     * @param id
     * @param train
     */
  updateTrain(id: number, train: TrainModel) {
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    const url = environment.api+environment.apiChangeTrain+id;
    const data = {lokStav: train};

    return this.http.put(url, data, {headers: headers});
  }
}

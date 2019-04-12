import {Injectable} from '@angular/core';
import {TrainModel} from '../model/train.model';
import {AlertService} from './alert.service';
import {AlertType} from '../enums/alertType.enum';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private trains: {loks?} = {
    "loks": [
      {
        "adresa": 1370,
        "nazev": "VT137",
        "majitel": "Mendelova univerzita",
        "oznaceni": "VT137",
        "trida": "motor",
        "vyznamFunkci": [
          "světla",
          "zvuk",
          "klakson",
          "osvětlení interiéru",
          "osvětlení kabiny strojvedoucího",
          "kompresor",
          "posun",
          "skřípění v oblouku",
          "hlášení",
          "vzduch",
          "píšťala výpravčího",
          "spřáhlo",
          "písek"
        ]
      },
      {
        "adresa": 1520,
        "nazev": "M152",
        "majitel": "Mendelova univerzita",
        "oznaceni": "M152",
        "trida": "motor"
      },
      {
        "adresa": 4220,
        "nazev": "Maly bycek",
        "majitel": "Mendelova univerzita",
        "oznaceni": "92.2222",
        "trida": "parni",
        "vyznamFunkci": [
          "světla",
          "zvuk",
          "píšťala dlouhá",
          "píšťala krátká",
          "",
          "čerpadlo",
          "posun",
          "skřípění v oblouku",
          "přikládání paliva",
          "vypouštění páry",
          "píšťala výpravčího",
          "spřáhlo",
          "písek"
        ]
      },
      {
        "adresa": 4231,
        "nazev": "Velký býček",
        "majitel": "Mišák",
        "oznaceni": "423.040",
        "trida": "parni"
      },
      {
        "adresa": 4310,
        "nazev": "413.0",
        "majitel": "Mendelova univerzita",
        "oznaceni": "413.0",
        "trida": "parni",
        "vyznamFunkci": [
          "světla",
          "",
          "zvuk",
          "",
          "",
          "píšťala dlouhá",
          "zvon",
          "spřáhlo"
        ]
      },
      {
        "adresa": 4780,
        "nazev": "Zamracena",
        "majitel": "Mendelova univerzita",
        "oznaceni": "T478.1",
        "trida": "diesel",
        "vyznamFunkci": [
          "světla",
          "zvuk",
          "houkačka dlouhá",
          "píšťala výpravčího",
          "",
          "",
          "posun",
          "",
          "",
          "",
          "",
          "píšťala krátká",
          "píšťala dlouhá"
        ]
      }
    ]
  };

  private trainDetail: {} = {
    "lokStav": {
      "rychlostStupne": 0,
      "rychlostKmph": 0,
      "smer": 0,
      "stavFunkci": "10000000000000000000000000000",
      "stanovisteA": "S",
      "najetoVpred": {
        "metru": 12.88,
        "bloku": 3489
      },
      "najetoVzad": {
        "metru": 12.11,
        "bloku": 1806
      }
    }
  };

  constructor(public alertService: AlertService) { }

  getAllTrains() {
      //TODO
      let result: TrainModel[] = [];

      for (let train of this.trains.loks) {
        result.push(new TrainModel(train));
      }

      return result;
  }

  getTrainDetailById(id: number) {
      //TODO
      //this.alertService.alert(AlertType.Success, "Tesovací message");
      return this.trainDetail["lokStav"];
  }

  private handleResponseMessages(response:any) {
    //TODO napojit na API
    const messages: [{messageContent, messageType}] = response.messages;

    if(messages != null && messages.length > 0) {
      this.alertService.parseAlerts(messages);
    }
  }

  private handleError (response: Response | any) {
    //TODO napojit na API
    if(response != null && response.error != null) {
      const error = response.error;

      if(error.messages != null && error.messages.length > 0) {
        const errorMessages = error.messages;
        this.alertService.parseAlerts(errorMessages);
      }
    }

    //this.router.navigate(['../']);

    return Observable.throw(response);

  }
}

import {Injectable} from '@angular/core';
import {TrainModel} from '../model/train.model';
import {AlertService} from './alert.service';
import {AlertType} from '../enums/alertType.enum';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private trains: {loks?} = {
    "loks": [
      {
        "adresa": 8,
        "nazev": "VT98",
        "majitel": "Martin Tyllich",
        "oznaceni": "VT98",
        "trida": "motor"
      },
      {
        "adresa": 25,
        "nazev": "294",
        "majitel": "Martin Tyllich",
        "oznaceni": "294",
        "trida": "diesel"
      },
      {
        "adresa": 1001,
        "nazev": "test",
        "majitel": "HH",
        "oznaceni": "V100",
        "trida": "diesel"
      },
      {
        "adresa": 1030,
        "nazev": "103",
        "majitel": "MENDELU",
        "oznaceni": "103",
        "trida": "elektro",
        "vyznamFunkci": [
          "světla",
          "zvuk",
          "houkačka krátká",
          "houkačka dlouhá"
        ]
      },
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
        "trida": "motor",
        "vyznamFunkci": [
          "světla",
          "kamera"
        ]
      },
      {
        "adresa": 1850,
        "nazev": "BR 185",
        "majitel": "Jiri Rybicka",
        "oznaceni": "DR VT137",
        "trida": "motor",
        "vyznamFunkci": [
          "světla"
        ]
      },
      {
        "adresa": 2040,
        "nazev": "Railion",
        "majitel": "JR",
        "oznaceni": "RN204.616",
        "trida": "diesel",
        "vyznamFunkci": [
          "světla"
        ]
      },
      {
        "adresa": 3652,
        "nazev": "BR64",
        "majitel": "JV",
        "oznaceni": "64113",
        "trida": "parni",
        "vyznamFunkci": [
          "světla"
        ]
      },
      {
        "adresa": 4111,
        "nazev": "BR41",
        "majitel": "JR",
        "oznaceni": "41.1147",
        "trida": "parni"
      },
      {
        "adresa": 4135,
        "nazev": "Zeměplaz",
        "majitel": "MENDELU",
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
        "adresa": 4136,
        "nazev": "413",
        "majitel": "jv",
        "oznaceni": "413",
        "trida": "parni"
      },
      {
        "adresa": 4139,
        "nazev": "413.098",
        "majitel": "mišák",
        "oznaceni": "413.0",
        "trida": "parni"
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
        "adresa": 4311,
        "nazev": "431.0 ventylovka",
        "majitel": "mišáík",
        "oznaceni": "4311",
        "trida": "parni"
      },
      {
        "adresa": 4318,
        "nazev": "Ventilovka",
        "majitel": "Jiri Rybicka",
        "oznaceni": "431.026",
        "trida": "parni"
      },
      {
        "adresa": 4350,
        "nazev": "Hektor",
        "majitel": "Mendelova univerzita",
        "oznaceni": "T435.0",
        "trida": "diesel",
        "vyznamFunkci": [
          "světla",
          "zvuk",
          "píšťala dlouhá",
          "píšťala krátká",
          "",
          "spřáhlo",
          "posun",
          "zvuk motoru",
          "kompresor",
          "zvuk motoru"
        ]
      },
      {
        "adresa": 4351,
        "nazev": "Hektor",
        "majitel": "Mendelova univerzita",
        "oznaceni": "T435.0",
        "trida": "diesel",
        "vyznamFunkci": [
          "",
          "světla zadní",
          "",
          "posun",
          "houkačka krátká",
          "",
          "zvuk motoru",
          "houkačka dlouhá",
          "zvuk",
          "",
          "",
          "kompresor",
          "spřáhlo"
        ]
      },
      {
        "adresa": 4641,
        "nazev": "Ušatá",
        "majitel": "Mišák",
        "oznaceni": "464.018",
        "trida": "parni"
      },
      {
        "adresa": 4662,
        "nazev": "T466.2",
        "majitel": "JV",
        "oznaceni": "",
        "trida": "diesel"
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
      },
      {
        "adresa": 4781,
        "nazev": "Zamračená",
        "majitel": "JR",
        "oznaceni": "T478.1010",
        "trida": "diesel",
        "vyznamFunkci": [
          "světla"
        ]
      },
      {
        "adresa": 4783,
        "nazev": "Brejlovec",
        "majitel": "JR",
        "oznaceni": "T478.3082",
        "trida": "diesel",
        "vyznamFunkci": [
          "světla"
        ]
      },
      {
        "adresa": 4784,
        "nazev": "Brejlovec Brno",
        "majitel": "JR",
        "oznaceni": "T478.4023",
        "trida": "diesel",
        "vyznamFunkci": [
          "světla",
          "zvuk",
          "houkačka dlouhá",
          "píšťala dlouhá",
          "spřáhlo",
          "píšťala výpravčího",
          "posun",
          "skřípění v oblouku",
          "vzduch",
          "",
          "hlášení",
          "",
          "houkačka krátká",
          "píšťala krátká",
          "zvuk"
        ]
      },
      {
        "adresa": 4786,
        "nazev": "Bardotka TT",
        "majitel": "Horáčkovi",
        "oznaceni": "T478",
        "trida": "diesel",
        "vyznamFunkci": [
          "světla",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "zvuk"
        ]
      },
      {
        "adresa": 5346,
        "nazev": "534.1",
        "majitel": "jv",
        "oznaceni": "534.1",
        "trida": "parni",
        "vyznamFunkci": [
          "světla",
          "světla"
        ]
      },
      {
        "adresa": 7426,
        "nazev": "T466.2",
        "majitel": "JV",
        "oznaceni": "4662",
        "trida": "diesel"
      },
      {
        "adresa": 7429,
        "nazev": "Kocour",
        "majitel": "Jiří Veselý",
        "oznaceni": "T466.2293",
        "trida": "diesel"
      },
      {
        "adresa": 7492,
        "nazev": "Bardotka",
        "majitel": "Tomáš Kasal",
        "oznaceni": "T 478.1003",
        "poznamka": "Ověřovací série, zvuk",
        "trida": "diesel",
        "vyznamFunkci": [
          "světla",
          "světla zadní",
          "",
          "dálkový světlomet",
          "světlo v kabině vzad",
          "světlo v kabině vpřed",
          "",
          "houkačka dlouhá",
          "zvuk",
          "houkačka krátká",
          "šroubovka",
          "písek"
        ]
      },
      {
        "adresa": 7493,
        "nazev": "bardotka",
        "majitel": "myšák",
        "oznaceni": "T478.1",
        "trida": "diesel"
      },
      {
        "adresa": 7519,
        "nazev": "Bardotka – Gregor",
        "majitel": "Michal Gregor",
        "oznaceni": "T478.1010",
        "poznamka": "Svetla ve vagonech – F2",
        "trida": "diesel"
      },
      {
        "adresa": 7520,
        "nazev": "bardotka",
        "majitel": "Tomáš Kasal",
        "oznaceni": "t478.1230",
        "trida": "diesel"
      },
      {
        "adresa": 7523,
        "nazev": "Zamračená",
        "majitel": "Mišák",
        "oznaceni": "T478.1010",
        "trida": "diesel"
      },
      {
        "adresa": 7540,
        "nazev": "Brejlovec",
        "majitel": "Tomáš Kasal",
        "oznaceni": "T478.4023",
        "trida": "diesel"
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

  constructor(private alertService: AlertService,
              private http: HttpClient) { }

  getAllTrains() {
      return this.http.get(environment.api+environment.apiAllTrains);
  }

  getTrainDetailById(id: number) {
      return this.http.get(environment.api+environment.apiDetailDetail+id);
  }


  updateTrain(id: number, train: TrainModel) {
    const data = JSON.stringify(train);
    console.log(data);

    this.http.post(environment.api+environment.apiChangeTrain+id, data).subscribe((data: {lokStav?, chyba?}) => {
        if (data.chyba !== undefined) {
          this.alertService.error(data.chyba);
        }
    })
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

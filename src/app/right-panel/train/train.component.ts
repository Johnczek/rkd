import {Component, HostListener, OnInit} from '@angular/core';
import {TrainService} from '../../services/train.service';
import {TrainModel} from '../../model/train.model';
import {ActivatedRoute} from '@angular/router';
import noUiSlider from 'nouislider';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'app-train',
    templateUrl: './train.component.html',
    styleUrls: ['./train.component.scss']
})
export class TrainComponent implements OnInit {
    /**
     * Mapa pro statické funkce (funkce, které jsou u každého vlaku na jedné klávese).
     * Chcete-li tuto mapu rozšířit, je třeba přidat záznamy (na jednu klávesu jich může být 1..N),
     * <b>ale příslušnou klávesu odebrat i z mapy níže!</b>
     */
    public staticKeyMap: {} = {
        'světla': 's',
        'zvuk': 'z',
        'houkačka': 'k',
        'klakson': 'k',
        'houkačka krátká': 'k',
        'píšťala': 'k',
        'píšťala krátká': 'k',
        'houkačka dlouhá': 'd',
        'píšťala dlouhá': 'd',
        'posun': 'p',
        'píšťala výpravčího': 'v',
    };

    /**
     * Mapa pro zbylé funkce
     */
    public keyMap: {} = {
        0: 'q',
        1: 'w',
        2: 'e',
        3: 'r',
        4: 't',
        5: 'u',
        6: 'i',
        7: 'o',
        8: 'a',
        9: 'f',
        10: 'g',
        11: 'h',
        12: 'j',
        13: 'l',
        14: 'a',
        15: 'y',
        16: 'x',
        17: 'c',
        18: 'b',
        19: 'n',
        20: 'm'
    };

    static readonly MAX_SPEED = 28;

    static readonly MIN_SPEED = 0;

    public trainId: number;

    public train: TrainModel;

    public slider;

    constructor(
        private trainService: TrainService,
        private activatedRoute: ActivatedRoute,
        private apiService: ApiService
    ) {
    }

    /**
     * Metoda po načtení komponenty
     */
    ngOnInit() {
        // Zkontrolujeme změnu URL adresy (pro načtení nových dat a správné zobrazení nového vlaku
        this.activatedRoute.paramMap.subscribe(() => {
            this.trainId = this.activatedRoute.snapshot.params.id;

            this.reloadPage()
        });
    }

    private reloadPage() {
        this.train = this.trainService.getTrainById(this.trainId);


        if (this.train !== undefined) {
            this.apiService.getTrainDetailById(this.trainId).subscribe((data: {lokStav?}) => {
                this.train.setDetailData(data.lokStav);
                console.log(data);
                // Pokud již byl slider rychlosti v daném kontextu vytvořen, pouze ho zresetujeme a načteme nové hodnoty. Pokud ne, vytvoříme ho.
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
    }

    /**
     * Metoda sleduje stisknutí kláves a spouští různé akce
    */
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
                this.setDirection(0);
                break;
            case 'ArrowUp':
                this.setDirection(1);
                break;
            case '0':
                this.setSpeed(0);
                break;
            case '1':
                this.setSpeed(15);
                break;
            case '2':
                this.setSpeed(19);
                break;
            case '3':
                this.setSpeed(23);
                break;
            case '4':
                this.setSpeed(27);
                break;
            // Pokud nevyhovuej žádná pevně daná klávesa, zjistí se, zda-li zmáčknutá klávesa přísluší statickým funkcím. Pokud ano,
            // je zaslán požadavek na přepnutí funkce. Pokud se nejedná o statickou funkci, změní se hodnota funkce na daném indexu.
            default:
                let staticValues = this.getMultipleKeysByValue(this.staticKeyMap, event.key);

                if(staticValues != undefined && staticValues.length > 0) {
                    this.train.toggleStaticFunction(staticValues);
                } else {
                    let value = this.getKeyByValue(this.keyMap, event.key);

                    if (value !== undefined) {
                        this.toggleFunction(+value);
                    }
                }

                this.trainService.sendFunctionStatus(this.train);
        }
    }

    /**
     * Metoda zvýší rychlostní stupeň
     * @param increaseValue hodnota, o kterou bude stupeň zvýšen
     */
    public increaseSpeed(increaseValue:number) {
        let previousValue =  parseInt(this.slider.noUiSlider.get());

        this.setSpeed(previousValue+increaseValue);
    }

    /**
     * Metoda sníží rychlostní stupeň
     * @param decreaseValue hodnota, o kterou bude stupeň snížen
     */
    public decreaseSpeed(decreaseValue:number) {
        let previousValue =  parseInt(this.slider.noUiSlider.get());

        this.setSpeed(previousValue-decreaseValue);
    }

    /**
     * Metoda nastaví vlaku daný rychlostní stupeň
     * @param speed rychlostní stupeň
     */
    public setSpeed(speed: number) {
        this.trainService.setTrainSpeed(this.train, speed);

        this.slider.noUiSlider.set(speed);
        console.log("setuji "+speed);
    }

    /**
     * Metoda nastaví hodnotu směru vlaku
     * @param direction
     */
    public setDirection(direction: number) {
        this.trainService.setTrainDirection(this.train, direction);
    }

    /**
     * Metoda přepne funkce na daném indexu
     * @param index
     */
    public toggleFunction(index: number) {
        this.trainService.toggleTrainFunction(this.train, index);
    }

    /**
     * Metoda vrátí klíč pro danou hodnotu. Je využívána pro nestatické funkce
     * @param map mapa, ve které se hledá
     * @param value hodnota, která se hledá
     */
    private getKeyByValue(map, value) {
        return Object.keys(map).find(key => map[key] === value);
    }

    /**
     * Metoad vrátí 0..N klíčů pro danou hodnotu. Je využívána pro hledání statických funkcí
     * @param map mapa, ve které se hledá
     * @param value hodnota, která se hledá
     */
    private getMultipleKeysByValue(map, value) {
        return Object.keys(map).filter(function(key) {
            return map[key] === value
        });
    }

    /**
     * Metoda vrátí počet nastavitelných kláves funkcí
     */
    public getKeymapLength() {
        return Object.keys(this.keyMap).length;
    }

    /**
     * Metoda pro navrácení názvu klávesy pro danou funkci. Pokud se jedná o statickou funkci, vybere se příslušná klávesa.
     * Pokud ne, vybere se příslušná dynamická hodnota klávesy pro funkci
     * @param fnc název funkce
     * @param index index funkce
     */
    public getFunctionKey(fnc: string, index: number) {
        if (fnc !== "") {
            if (this.staticKeyMap[fnc] !== undefined) {
                return this.staticKeyMap[fnc];
            }

            return this.keyMap[index];
        }
    }

    public isSpecialFunction(value: string) {
        let result = this.getMultipleKeysByValue(this.staticKeyMap, value);
        return this.staticKeyMap[value] !== undefined;
    }
}

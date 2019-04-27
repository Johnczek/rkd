import {environment} from '../../environments/environment.prod';

export class TrainModel {
    public adresa: number;

    public nazev: string;

    public oznaceni: string;

    public trida: string;

    public vyznamFunkci: string[];

    public pictureURL: string;

    public rychlostStupne: number;

    public smer: number;

    public stavFunkci: string;

    public stanovisteA: string;

    constructor(values?: {}) {
        Object.assign(this, values);
        this.getPictureURL();
    }

    /**
     * Metoda zjistí, zda-li k příslušné lokomotivě existuje na vzdáleném úložišti obrázek typu jpg. Pokud ne, zvolí defaultní obrázek.
     */
    getPictureURL() {
        if(this.pictureURL === undefined) {
            const imageUrl = environment.pictureBaseURL+this.adresa+".jpg";
            const defaultImageUrl = environment.defaultPicturePath;

            this.imageExists(imageUrl, (exists) => {
                this.pictureURL = exists ? imageUrl : defaultImageUrl;
            })
        }

    }

    /**
     * Metoda kontroluje, zda-li se obrázek nachází na dané URL adrese.
     * @param imageUrl URL obrázku
     * @param callback callback, skrze který lze zjistit výsledek operace
     */
    private imageExists(imageUrl: string, callback) {
        let img = new Image();
        img.onload = () => {
            callback(true);
        };
        img.onerror = () => {
            callback(false);
        };
        img.src = imageUrl;
    }

    /**
     * Metoda pro nastavení detailních dat po načtení lokomotivy
     * @param data data detailu vozu z API
     */
    setDetailData(data:{rychlostStupne?:number, smer?:number, stavFunkci?:string, stanovisteA?:string}) {
        this.rychlostStupne = data.rychlostStupne;
        this.smer = data.smer;
        this.stavFunkci = data.stavFunkci;
        this.stanovisteA = data.stanovisteA;
    }

    /**
     * Metoda kontroluje, jestli je funkce na daném indexu aktivní
     * @param index
     */
    isFunctionActive(index: number) {
        return this.stavFunkci.charAt(index) === '1';
    }

    /**
     * Metoda překlopí hodnotu funkce na daném indexu.
     * @param index
     */
    toggleFunction(index: number) {
        this.stavFunkci.charAt(index) == '1' ? this.replaceCharAt(index, '0') : this.replaceCharAt(index, '1');
    }

    /**
     * Metoda pro úpravu vektoru lokomotivy. Změní hodnotu 0/1 na příslušném indexu.
     * @param index index, na kterém má být provedena změna
     * @param value hodnota, která má být vložena
     */
    replaceCharAt(index:number, value:string) {
        this.stavFunkci = this.stavFunkci.substring(0, index) + value + this.stavFunkci.substring(index + 1);
    }

    /**
     * Funkce dostane z componenty možný seznam funkcí, které by mohly být přepnuté.
     * Metoda je všechny projde a pokud zjistí, že některou z nich daná lokomotiva obsahuje, přepne ji.
     * @param functions pole možných funkcí
     */
    toggleStaticFunction(functions: string[]) {
        for (let fnc of functions) {
            let index = this.vyznamFunkci.indexOf(fnc);

            if (index !== -1) {
                this.toggleFunction(index);
                break;
            }
        }
    }
}

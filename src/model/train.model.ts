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

    constructor(values: {}) {
        Object.assign(this, values);
    }

    getPictureURL() {
        return this.pictureURL == null ? 'assets/images/trains/default.png' : this.pictureURL;
    }

    setDetailData(data:{rychlostStupne?:number, smer?:number, stavFunkci?:string, stanovisteA?:string}) {
        this.rychlostStupne = data.rychlostStupne;
        this.smer = data.smer;
        this.stavFunkci = data.stavFunkci;
        this.stanovisteA = data.stanovisteA;
    }

    isFunctionActive(index: number) {
        return this.stavFunkci.charAt(index) === '1';
    }

    toggleFunction(index: number) {
        this.stavFunkci.charAt(index) == '1' ? this.replaceCharAt(index, '0') : this.replaceCharAt(index, '1');
    }

    replaceCharAt(index:number, value:string) {
        this.stavFunkci = this.stavFunkci.substring(0, index) + value + this.stavFunkci.substring(index + 1);
    }
}

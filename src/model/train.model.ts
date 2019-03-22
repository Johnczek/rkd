export class TrainModel {
    id: number;

    internalId: number;

    name: string;

    pictureURL: string;

    speed: number;

    constructor(id: number, internalId: number, name: string, pictureURL: string, speed: number) {
        this.id = id;
        this.internalId = internalId;
        this.name = name;
        this.pictureURL = pictureURL;
        this.speed = speed;
    }

    getPictureURL() {
        return this.pictureURL == null ? 'assets/images/trains/default.png' : this.pictureURL;
    }
}

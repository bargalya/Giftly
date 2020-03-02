import { Gift } from './gift.class';

export class GiftlyEvent {
    EventId: number;
    Name: string;
    Description: string;
    Date: Date;
    Gifts: Array<Gift>;
    constructor(name: string, description: string, date: Date, gifts: Array<Gift>) {
        this.Name = name;
        this.Description = description;
        this.Date = date;
        this.Gifts = gifts;
    }

    public getGifts(): Array<Gift> {
        return this.Gifts;
    }

    public setGifts(gifts: Array<Gift>): void {
        this.Gifts = gifts;
    }
}

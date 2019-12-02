import { Gift } from './gift.class';

export class Event {
    EventId: number;
    Name: string;
    Description: string;
    Gifts: Array<Gift>
    constructor(name: string, description: string, gifts: Array<Gift>){
        this.Name = name;
        this.Description = description;
        this.Gifts = gifts;
    }

    public getGifts(): Array<Gift> {
        return this.Gifts;
    }

    public setGifts(gifts: Array<Gift>): void {
        this.Gifts = gifts;
    }
}


  
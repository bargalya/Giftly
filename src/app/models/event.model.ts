import { Gift } from './gift.class';
import { Observable, Observer } from 'rxjs';
import { share } from 'rxjs/operators';

export class GiftlyEvent {
    EventId?: number;
    Name: string;
    Description: string;
    Date: Date;
    private Gifts: Array<Gift>;
    private giftsObserver: Observer<Array<Gift>>;
    readonly Gifts$: Observable<Array<Gift>> = new Observable<Array<Gift>>(o => this.giftsObserver = o).pipe(share()); 
    constructor(name: string, description: string, date: Date, gifts: Array<Gift>) {
        this.Name = name;
        this.Description = description;
        this.Date = date;
        this.Gifts = gifts;
        //this.Gifts$.;
        //this.giftsObserver.next(gifts);
        //this.Gifts$ = new Observable<Array<Gift>>(o => this.giftsObserver = o).pipe(share());
    }
}

import { Component, OnInit } from '@angular/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Event } from 'src/app/models/event.class';
import { DataService } from 'src/app/services/data.service';
import { Gift } from 'src/app/models/gift.class';

import { GiftStatus } from 'src/app/models/gift.class';
import { SessionService } from 'src/app/services/session.service';

@Component({
    selector: 'gifts',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

    gifts = [];
    eventId: number;
    event: Event;

    searchForm = new FormGroup({
        url: new FormControl(),
   }); 

    modules = AllCommunityModules;

    constructor(private router: Router, private route: ActivatedRoute, 
        private readonly dataService: DataService, 
        private readonly sessionService: SessionService) {
        this.route.params.subscribe(params => {
            this.eventId = params.id;
        });
     }

    ngOnInit() {
        const uid = this.sessionService.getSession();
        console.log('logged in uid is: ' + uid);
        //Todo: remove this init!!
        this.gifts = [{ "title": "Table", "url":'https://media.baligam.co.il/_media/media/37154/316142.jpg' }, 
        { "title": "Clock", "url":'https://images.eq3.com/product-definitions/cjuedn73z05650162zt3g6fu8/image/8c3c3e00-85aa-4cb4-b092-a4fd9d12b09e.jpg' }];
        this.event = this.dataService.getEvent(uid);
        if(this.event != null)
            this.gifts = this.event.getGifts();
        else
        {   
            // todo: delete! dummy init - delete when the fetch from the BE will work            
            this.event = new Event(
                "Giftly kickoff event",
                "Best event of the year",
                new Date("2021-01-01"),
                null);
        
            alert("we are sorry, but we couldn't find you event!")
            console.log("can't find event with eventId: " + this.eventId);
        }
    }

    searchGift() {
        const url = this.searchForm.get('url').value;
        const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        if (urlRegex.test(url)) {
            console.log('ok');
        }
    }

    backToDashboard() {
        this.router.navigate(['/events-dashboard']);
    }

}

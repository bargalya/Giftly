import { Component, OnInit } from '@angular/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Event } from 'src/app/models/event.class';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'gifts',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

    gifts = [];
    eventId: string;
    event: Event;

    searchForm = new FormGroup({
        url: new FormControl(),
   }); 

    modules = AllCommunityModules;

    constructor(private readonly router: Router, private route: ActivatedRoute, 
        private readonly dataService: DataService) {
        this.route.params.subscribe(params => {
            this.eventId = params.id;
        });
     }

    async ngOnInit() {
        this.event = await this.dataService.getEvent(this.eventId);
        if(this.event != null)
            this.gifts = this.event.getGifts();
        else {   
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

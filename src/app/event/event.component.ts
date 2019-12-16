import { Component, OnInit } from '@angular/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router"
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Event } from '../models/event.class';

@Component({
    selector: 'gifts',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

    _gifts = [];
    _eventId:number;
    _event:Event;

    searchForm = new FormGroup({
        url: new FormControl(),
   }); 

    modules = AllCommunityModules;

    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private readonly dbService: DataService) {
        this.route.params.subscribe(params => {
            this._eventId = params.id;
        });
     }

    ngOnInit() {
        //Todo: remove this init!!
        this._gifts = [{ "title": "Table", "img":'https://media.baligam.co.il/_media/media/37154/316142.jpg' }, 
        { "title": "Clock", "img":'https://images.eq3.com/product-definitions/cjuedn73z05650162zt3g6fu8/image/8c3c3e00-85aa-4cb4-b092-a4fd9d12b09e.jpg' }];
        this._event = this.dbService.getEvent(this._eventId);
        if(this._event != null)
            this._gifts = this._event.getGifts();
        else
        {
            alert("we are sorry, but we couldn't find you event!")
            console.log("can't find event with eventId: " + this._eventId);            
        }
    }

    searchGift() {
        // console.log('url:' + this.searchForm.get('url').value);
        let url = this.searchForm.get('url').value;
        let urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        if(urlRegex.test(url)){
            console.log("ok");
        }
    }

    backToDashboard(){
        this.router.navigate(['/events-dashboard']);       
    }

}

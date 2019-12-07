import { Component, OnInit } from '@angular/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router"
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'gifts',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

    items = [];
    id = null;

    searchForm = new FormGroup({
        url: new FormControl(),
   }); 

    modules = AllCommunityModules;

    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            // this.param1 = params['param1'];
            // this.param2 = params['param2'];
            this.id = params.id;
        });
     }

    ngOnInit() {
        // this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
        this.items = [{ "title": "Table", "img":'https://media.baligam.co.il/_media/media/37154/316142.jpg' }, 
        { "title": "Clock", "img":'https://images.eq3.com/product-definitions/cjuedn73z05650162zt3g6fu8/image/8c3c3e00-85aa-4cb4-b092-a4fd9d12b09e.jpg' }];

    }

    searchGift() {
        // console.log('url:' + this.searchForm.get('url').value);
        this.items.push({"title": this.searchForm.get('url').value})
    }

}

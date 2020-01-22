import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { Gift, GiftStatus } from '../../models/gift.class';
import { ArrangeGiftList } from 'src/app/services/ArrangeGiftList.service';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-friend-event',
  templateUrl: './friend-event.component.html',
  styleUrls: ['./friend-event.component.scss']
})

export class FriendEventComponent implements OnInit {
  searchText: string;
  items: Array<Gift>;
  showItems: Array<Gift>;
  sortOptions: Array<string>;
  selectedSort: string;
  showItemsStatus: string;
  eventId: string;

  constructor(private readonly arrangeGiftList: ArrangeGiftList, 
              private readonly dataService: DataService, 
              private route: ActivatedRoute) {
    route.params.subscribe(params => {this.eventId = params.eventId});
 }

 ngOnInit() {
   this.showItemsStatus = GiftStatus[GiftStatus.ReadyForGrabs];
   this.sortOptions = this.arrangeGiftList.getSortOptions();
   this.selectedSort = this.sortOptions[0];
   this.setGiftsAndArrange();
  }

  private async getGiftsFromDB() {
    if(this.showItemsStatus === GiftStatus[GiftStatus.ReadyForGrabs]) {
      this.items = await this.dataService.getAvailableGifts(this.eventId); 
    } else {
      this.items = this.getBoughtGiftsMOCK();
    }
    this.sort(this.selectedSort);
  }

  private setGiftsAndArrange() {
    this.items = [];
    this.getGiftsFromDB();
    this.searchText = '';
  }

  changeGiftStatusToShow(status: string) {
    this.showItemsStatus = status;
    this.setGiftsAndArrange();
  }

  changeGiftStatus(gift: Gift) {
    // @TODO: Make it work!
    // call to DB
    gift.Status = this.isBought(gift) ? GiftStatus.ReadyForGrabs : GiftStatus.Taken;
    // let index = this.items.indexOf(gift);
    // this.items.splice(index, 1);
  }

  isBought(gift: Gift): boolean {
    return gift.Status === GiftStatus.Taken;
  }
      
  sort(sortOption: string) {
    this.showItems = this.arrangeGiftList.changeSort(this.items, sortOption);
  }
  
  searchGifts(searchText: string) {
    this.showItems = this.arrangeGiftList.searchGifts(this.items, searchText);
  }

  clearSearchText() {
    this.searchText = '';
    this.showItems = this.items;
  }
  
  getFreeGiftsMOCK() {
    return [
      new Gift('https://media.baligam.co.il/_media/media/37154/316142.jpg',
      GiftStatus.ReadyForGrabs, 'A Table'),
      new Gift('https://images.eq3.com/product-definitions/cjuedn73z05650162zt3g6fu8/image/8c3c3e00-85aa-4cb4-b092-a4fd9d12b09e.jpg',
        GiftStatus.ReadyForGrabs, 'Clock')
    ];
  }
  
  getBoughtGiftsMOCK() {
    return [
      new Gift('https://media.baligam.co.il/_media/media/37154/316142.jpg', 
      GiftStatus.Taken, 'B Table', 'https://media.baligam.co.il/_media/media/37154/316142.jpg'),
      new Gift('https://images.eq3.com/product-definitions/cjuedn73z05650162zt3g6fu8/image/8c3c3e00-85aa-4cb4-b092-a4fd9d12b09e.jpg',
        GiftStatus.Taken, 'C Clock', 'https://images.eq3.com/product-definitions/cjuedn73z05650162zt3g6fu8/image/8c3c3e00-85aa-4cb4-b092-a4fd9d12b09e.jpg')
    ];
  }
}

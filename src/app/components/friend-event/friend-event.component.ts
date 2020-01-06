import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { Gift, GiftStatus } from '../../models/gift.class';
import { ArrangeGiftList } from 'src/app/services/ArrangeGiftList.service';

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
  giftStatusToDBCall = {};

  constructor(private readonly arrangeGiftList: ArrangeGiftList) {
    // , private http: HttpClient, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef
 }

 ngOnInit() {
   this.giftStatusToDBCall[GiftStatus.ReadyForGrabs] = this.getFreeGiftsMOCK;
   this.giftStatusToDBCall[GiftStatus.Taken] = this.getBoughtGiftsMOCK;
   this.showItemsStatus = GiftStatus[GiftStatus.ReadyForGrabs];
   this.sortOptions = this.arrangeGiftList.getSortOptions();
   this.selectedSort = this.sortOptions[0];
   this.setGiftsAndArrange();
  }

  private getGiftsFromDB() {
    for (let item of this.giftStatusToDBCall[GiftStatus[this.showItemsStatus]].apply()) {
      this.items.push(new Gift(item.Url, item.Status, item.Title));
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
      GiftStatus.Taken, 'B Table'),
      new Gift('https://images.eq3.com/product-definitions/cjuedn73z05650162zt3g6fu8/image/8c3c3e00-85aa-4cb4-b092-a4fd9d12b09e.jpg',
        GiftStatus.Taken, 'C Clock')
    ];
  }
}

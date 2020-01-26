import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { Gift, GiftStatus } from '../../models/gift.class';
import { ArrangeGiftList } from 'src/app/services/ArrangeGiftList.service';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NotifyUserDialogComponent } from '../notify-user-dialog/notify-user-dialog.component';


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
              private route: ActivatedRoute,
              private dialog: MatDialog) {
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

  async changeGiftStatus(gift: Gift) {
    var res;
    if(this.isBought(gift)) {
      // this.dataService.setGiftStatusToAvailable(gift.GiftId);
    } else {
      res = await this.dataService.setGiftStatusToTaken(gift.GiftId, "5de41cf834f0fb51fc99c500");
      if(res) {
        this.showItems = this.showItems.filter(obj => obj !== gift);
        this.items = this.items.filter(obj => obj !== gift);
        //TODO: add gift title to message and a link to "Gifts I Bought"
        this.dialog.open(NotifyUserDialogComponent, 
          {'data' : 
            {"title":"You are a good friend!", 
              "message": "You just bought your friend a gift. To undo this go to \"Gifts I Bought\"."}
          });
      } else {
        //TODO: add gift title to message
        this.dialog.open(NotifyUserDialogComponent, 
          {'data' : 
            {"title":"Sorry,", 
              "message": "you can't buy this gift anymore. Either it was already bought, or your friend does not want it anymore."}
          });
        this.setGiftsAndArrange()
      }
    }
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

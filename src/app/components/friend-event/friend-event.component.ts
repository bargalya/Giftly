import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { Gift, GiftStatus } from '../../models/gift.class';
import { ArrangeGiftList } from 'src/app/services/ArrangeGiftList.service';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NotifyUserDialogComponent } from '../notify-user-dialog/notify-user-dialog.component';
import { SessionService } from 'src/app/services/session.service';
import { Event } from 'src/app/models/event.class';
import { NewEventDataService } from 'src/app/services/new-event-data/new-event-data.service';


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
  userId: string;
  event: Event;

  constructor(private readonly arrangeGiftList: ArrangeGiftList, 
              private readonly dataService: DataService, 
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private readonly sessionService: SessionService,
              private newEventDataService: NewEventDataService) {
    route.params.subscribe(params => {this.eventId = params.eventId});
    this.userId = sessionService.getUserIdFromsSession();
 }

 async ngOnInit() {
   this.event = this.newEventDataService.data;
   if(this.event === undefined) {
     this.event = await this.dataService.getEvent(this.eventId);
   }
   this.sortOptions = this.arrangeGiftList.getSortOptions();
   this.selectedSort = this.sortOptions[0];
   this.setGiftsAndArrange();
  }

  private async getGiftsFromDB() {
    if(this.showItemsStatus === GiftStatus[GiftStatus.ReadyForGrabs]) {
      this.items = await this.dataService.getAvailableGifts(this.eventId); 
    } else {
      this.items = await this.dataService.getGiftsBoughtByUser(this.eventId, this.userId);
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
      res = this.dataService.setGiftStatusToAvailable(gift.GiftId);
      if(res) {
        this.filterGift(gift);
      } else {
      this.dialog.open(NotifyUserDialogComponent, 
        {'data' : 
            {"title":"Sorry,", 
              "message": "We could not remove the gift from the gifts you bought. Please try again later."}
        });
      }
    } else {
      res = await this.dataService.setGiftStatusToTaken(gift.GiftId, this.userId);
      if(res) {
        this.filterGift(gift);
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

  filterGift(gift: Gift) {
    this.showItems = this.showItems.filter(obj => obj !== gift);
    this.items = this.items.filter(obj => obj !== gift);
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
}

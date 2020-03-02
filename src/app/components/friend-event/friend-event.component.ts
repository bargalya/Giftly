import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { Gift, GiftStatus } from '../../models/gift.class';
import { ArrangeGiftList } from 'src/app/services/ArrangeGiftList.service';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NotifyUserDialogComponent } from '../notify-user-dialog/notify-user-dialog.component';
import { SessionService } from 'src/app/services/session.service';
import { GiftlyEvent } from 'src/app/models/event.class';
import { NewEventDataService } from 'src/app/services/new-event-data/new-event-data.service';


@Component({
  selector: 'app-friend-event',
  templateUrl: './friend-event.component.html',
  styleUrls: ['./friend-event.component.scss']
})

export class FriendEventComponent implements OnInit {
  searchText: string;
  allGifts: Array<Gift>;
  availableGifts: Array<Gift>;
  giftsBoughtByUser: Array<Gift>;
  giftListToShow: Array<Gift>;
  sortOptions: Array<string>;
  selectedSort: string;
  showItemsStatus: string;
  eventId: string;
  userId: string;
  event: GiftlyEvent;

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
   this.searchText = '';
   this.getGifts(false);
   this.changeGiftStatusToShow("All");
  }

  private async getGifts(getFromDB: boolean) {
    if(getFromDB)
      this.allGifts = await this.dataService.getAllGifts(this.eventId);
    else
      this.allGifts = this.event.Gifts;
    this.availableGifts = this.allGifts.filter(gift => gift.Status === GiftStatus.ReadyForGrabs);
    this.giftsBoughtByUser = await this.dataService.getGiftsBoughtByUser(this.eventId, this.userId);
    this.markGiftsBoughtByUser();
  }

  private async markGiftsBoughtByUser() {
    this.allGifts.forEach(gift => {
      this.giftsBoughtByUser.forEach(boughtGift => {
        boughtGift.boughtByCurrentUser = true;
        if(boughtGift.GiftId === gift.GiftId)
          gift.boughtByCurrentUser = true;
      })
    });
  }

  private getGiftsAccordingToStatusToShow() {
    if(this.showItemsStatus == "All")
      return this.allGifts;
    if (this.showItemsStatus == "Taken")
      return  this.giftsBoughtByUser;
    else
      return this.availableGifts;
  }

  changeGiftStatusToShow(status: string) {
    this.showItemsStatus = status;
    this.giftListToShow = this.getGiftsAccordingToStatusToShow();
    this.sort(this.selectedSort);
  }

  private changeGiftStatusInGiftLists(changedGift: Gift, listToFilter: Array<Gift>, listToAdd: Array<Gift>, 
                                      newStatus: GiftStatus, boughtByCurrentUser: boolean) {
    var gift = this.allGifts.find(g => g.GiftId == changedGift.GiftId);
    gift.Status = newStatus;
    gift.boughtByCurrentUser = boughtByCurrentUser;
    listToFilter = listToFilter.filter(obj => obj !== changedGift);
    changedGift.Status = newStatus;
    changedGift.boughtByCurrentUser = boughtByCurrentUser;
    listToAdd.push(changedGift);
    return listToFilter;
  }

  async changeGiftStatus(gift: Gift) {
    var res;
    if(this.isBought(gift)) {
      res = this.dataService.setGiftStatusToAvailable(gift.GiftId);
      if(res) {
        this.giftsBoughtByUser = 
          this.changeGiftStatusInGiftLists(gift, this.giftsBoughtByUser, this.availableGifts, GiftStatus.ReadyForGrabs, false);
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
        this.availableGifts = 
          this.changeGiftStatusInGiftLists(gift, this.availableGifts, this.giftsBoughtByUser, GiftStatus.Taken, true);
        //TODO: add gift title to message and a link to "Gifts I Bought"
        this.dialog.open(NotifyUserDialogComponent, 
          {'data' : 
            {"title":"You are a good friend!", 
              "message": "You just bought your friend a gift. To undo this click the X symbol." 
                + " If you can't see the gift, go to \"Gifts I Bought\"."}
          });
      } else {
        //TODO: add gift title to message
        this.dialog.open(NotifyUserDialogComponent, 
          {'data' : 
            {"title":"Sorry,", 
              "message": "you can't buy this gift anymore. Either it was already bought, or your friend does not want it anymore."}
          });
        this.getGifts(true);
      }
    }
    this.sort(this.selectedSort);
  }

  isBought(gift: Gift): boolean {
    return gift.Status === GiftStatus.Taken;
  }
      
  sort(sortOption: string) {
    this.giftListToShow = this.arrangeGiftList.changeSort(this.getGiftsAccordingToStatusToShow(), sortOption);
  }
  
  searchGifts(searchText: string) {
    this.giftListToShow = this.arrangeGiftList.searchGifts(this.getGiftsAccordingToStatusToShow(), searchText);
  }

  clearSearchText() {
    this.searchText = '';
    this.giftListToShow = this.getGiftsAccordingToStatusToShow();
  }
}

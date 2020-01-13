import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Gift, GiftStatus } from 'src/app/models/gift.class';

@Component({
  selector: 'app-gifts-table',
  templateUrl: './gifts-table.component.html',
  styleUrls: ['./gifts-table.component.scss']
})
export class GiftsTableComponent implements OnInit {

  @Input() allowEditList: string;  
  giftsArr: Array<Gift>;
  
  @Output() giftsChange = new EventEmitter();
  constructor() {
    //this.gifts = this.getFreeGiftsMOCK();
   }

  ngOnInit() {
  }

  getFreeGiftsMOCK() {
    return [
      new Gift('https://media.baligam.co.il/_media/media/37154/316142.jpg',
      GiftStatus.ReadyForGrabs, 'A Table'),
      new Gift('https://images.eq3.com/product-definitions/cjuedn73z05650162zt3g6fu8/image/8c3c3e00-85aa-4cb4-b092-a4fd9d12b09e.jpg',
        GiftStatus.ReadyForGrabs, 'Clock')
    ];
  }

  removeGift(gift: Gift): void {
    this.giftsArr = this.giftsArr.filter(obj => obj !== gift);    
    this.giftsChange.emit(this.giftsArr);   
  }

  isAvailable(status: GiftStatus): boolean {
    return status === GiftStatus.Taken;
  }

  getIsAllowEditList(): boolean {        
    if(this.allowEditList == "true")
      return true;
    return false;    
  }

  @Input()
  get gifts() {    
    return this.giftsArr;
  }
  
  set gifts(value) {    
    this.giftsArr = value;
    this.giftsChange.emit(this.giftsArr);
  }
}

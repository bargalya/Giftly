import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { Gift } from 'src/app/models/gift.class';
import { FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-editable-event-details',
  templateUrl: './editable-event-details.component.html',
  styleUrls: ['./editable-event-details.component.scss']
})
export class EditableEventDetailsComponent implements OnInit {

  event: Event;
  gifts: Array<Gift> = new Array<Gift>();

  @Input() editableEventForm: FormGroup;
  constructor(private readonly dataService: DataService, private cd: ChangeDetectorRef) { }

  @Output() giftsChange = new EventEmitter();
  
  ngOnInit() {
  }

  get name() {
    return this.editableEventForm.get('name');
  }

  get giftUrl() {
    return this.editableEventForm.get('giftUrl');
  }

  async addGift() {
    const giftUrl = this.editableEventForm.get('giftUrl').value;
    if (giftUrl === '') {
      return;
    }
    const gift = await this.dataService.getImgDetails(giftUrl);
    this.gifts.push(gift);
    this.editableEventForm.get('giftUrl').setValue('');
    // this.myForm.get('giftUrl').markAsUntouched(); //This didn't work :(
    this.cd.detectChanges();
    this.giftsChange.emit(this.gifts);
  }

  removeGift(gift: Gift): void {
    this.gifts = this.gifts.filter(obj => obj !== gift);
    this.giftsChange.emit(this.gifts);
  }
}

import { Injectable } from '@angular/core';
import { Gift } from '../models/gift.class';

@Injectable({
    providedIn: 'root',
  })
export class ArrangeGiftList {
    sortOptions: {};
    constructor() {
        this.sortOptions = {
            Title : gift => gift.Title,
            'Online Store' : gift => gift.Url
        };
    }

    changeSort(giftsArr: Array<Gift>, sortOption: string): Array<Gift> {
        const attribute = this.sortOptions[sortOption];
        return giftsArr.sort(
            (giftA, giftB) => {
                const attrA = attribute(giftA);
                const attrB = attribute(giftB);
                if (attrA) {
                    if (attrB) {
                        return attrA.toLocaleLowerCase().localeCompare(attrB.toLocaleLowerCase());
                    } else {
                        return -1;
                    }
                } else {
                    return 1;
                }
            }
        );
      }

      searchGifts(giftsArr: Array<Gift>, searchText: string): Array<Gift> {
        return giftsArr.filter(gift => {
            const title = gift.Title;
            if (title) {
                return title.toLowerCase().search(searchText.toLowerCase()) !== -1;
            } else {
                return false;
            }
        });
      }

      getSortOptions(): Array<string> {
          return Object.keys(this.sortOptions);
      }
}

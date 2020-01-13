import { Pipe, PipeTransform } from '@angular/core';

const READY = 0;
const TAKEN = 1;

// @Pipe( { name: 'setGiftStatusPipe' } )
// export class GetGiftStatusPipe implements PipeTransform {
//   transform(status: number): string {
//         switch (status) {
//             case READY: {
//                 return 'Ready for grabs';
//             }
//             case TAKEN: {
//                 return 'Taken';
//             }
//         }
//     }
// }

@Pipe( { name: 'getGiftImageId' } )
export class GetGiftImageId implements PipeTransform {
  transform(status: number): string {
        switch (status) {
            case READY: {
                return 'avaliableGift';
            }
            case TAKEN: {
                return 'takenGift';
            }
        }
    }
}

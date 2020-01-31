import { Component, Input} from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
    isExpanded = false;
    isUserLoggedIn = false;
    constructor(public readonly sessionService: SessionService) {
    }

    ngOnInit() {
        const isUserLoggedInObservable = this.sessionService.getIsLoggedInObservable();
        isUserLoggedInObservable.subscribe((isUserLoggedInData: boolean) => {
            this.isUserLoggedIn = isUserLoggedInData;
        });
    }

}

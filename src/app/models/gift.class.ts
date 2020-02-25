import { stringify } from 'querystring';

export class Gift {
    public Url: string;
    public Status: GiftStatus;
    public Title: string;
    public ImgUrl: string;
    public GiftId: string;
    public boughtByCurrentUser: boolean;
    constructor(url: string, status: GiftStatus, title?: string, imgUrl?: string, giftId?: string, boughtByCurrentUser?: boolean) {
        this.Url = url;
        this.Status = status;
        this.Title = title;
        this.ImgUrl = imgUrl;
        this.GiftId = giftId;
        this.boughtByCurrentUser = boughtByCurrentUser;
    }
}

export enum GiftStatus {
    ReadyForGrabs,
    Taken
}

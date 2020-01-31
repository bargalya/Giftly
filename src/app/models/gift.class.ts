import { stringify } from 'querystring';

export class Gift {
    public Url: string;
    public Status: GiftStatus;
    public Title: string;
    public ImgUrl: string;
    public GiftId: string;
    constructor(url: string, status: GiftStatus, title?: string, imgUrl?: string, giftId?: string) {
        this.Url = url;
        this.Status = status;
        this.Title = title;
        this.ImgUrl = imgUrl;
        this.GiftId = giftId;
    }
}

export enum GiftStatus {
    ReadyForGrabs,
    Taken
}

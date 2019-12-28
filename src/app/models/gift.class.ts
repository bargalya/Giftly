import { stringify } from 'querystring';

export class Gift {
    public Url: string;
    public Status: GiftStatus;
    public Title: string;
    constructor(url: string, status: GiftStatus, title?: string) {
        this.Url = url;
        this.Status = status;
        this.Title = title;
    }
}

export enum GiftStatus {
    ReadyForGrabs,
    Taken
}

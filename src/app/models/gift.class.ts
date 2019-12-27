export class Gift {
    public Url: string;
    public Status: GiftStatus;
    constructor(url: string, status: GiftStatus)    {
        this.Url = url;
        this.Status = status;
    }
}

export enum GiftStatus {
    ReadyForGrabs,
    Taken
}

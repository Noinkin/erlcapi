import { Client } from "../client/client.js";
import { Base } from "./base.js";
import type { RawServerData } from "../types/index.js";

export class Server extends Base {
    name!: string;
    ownerId!: number;
    coOwnerIds!: number[];
    currentPlayers!: number;
    maxPlayers!: number;
    joinKey!: string;
    accVerifiedReq!: 'Disabled' | 'Email' | 'Phone/ID';
    teamBalance!: boolean;
    queue!: number[];

    constructor(client: Client, data: RawServerData) {
        super(client);
        this._patch(data);
    }

    public _patch(data: RawServerData): this {
        this.name = data.Name;
        this.ownerId = data.OwnerId;
        this.coOwnerIds = data.CoOwnerIds;
        this.currentPlayers = data.CurrentPlayers;
        this.maxPlayers = data.MaxPlayers;
        this.joinKey = data.JoinKey;
        this.accVerifiedReq = data.AccVerifiedReq;
        this.teamBalance = data.TeamBalance;
        this.queue = data.Queue ?? [];
        return this;
    }

    public compare(data: RawServerData): boolean {
        return this.name === data.Name &&
            this.ownerId === data.OwnerId &&
            this.coOwnerIds === data.CoOwnerIds &&
            this.currentPlayers === data.CurrentPlayers &&
            this.maxPlayers === data.MaxPlayers &&
            this.joinKey === data.JoinKey &&
            this.accVerifiedReq === data.AccVerifiedReq &&
            this.teamBalance === data.TeamBalance &&
            this.queue === data.Queue
    }

    public toJSON(): RawServerData {
        return {
            Name: this.name,
            OwnerId: this.ownerId,
            CoOwnerIds: this.coOwnerIds,
            CurrentPlayers: this.currentPlayers,
            MaxPlayers: this.maxPlayers,
            JoinKey: this.joinKey,
            AccVerifiedReq: this.accVerifiedReq,
            TeamBalance: this.teamBalance,
            Queue: this.queue,
        }
    }
}
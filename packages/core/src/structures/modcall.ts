import { Client } from "../client/client.js";
import { Base } from "./base.js";
import type { RawModCall } from "../types/index.js";
import { Player } from "./player.js";

export class ModCall extends Base {
    caller!: Player;
    callerId!: number;
    callerUsername!: string;
    timestamp!: number;
    moderator?: Player;
    moderatorId?: number;
    moderatorUsername?: string;
    
    constructor(client: Client, data: RawModCall) {
        super(client);
        this._patch(data);
    }

    public _patch(data: RawModCall): this {
        const splitCaller = data.Caller.split(':');
        this.callerId = Number(splitCaller[1]);
        this.callerUsername = splitCaller[0]!;
        this.caller = this.client.players.cache.get(this.callerId)!;
        if (data.Moderator) {
            const splitModerator = data.Moderator.split(':');
            this.moderatorId = Number(splitModerator[1]);
            this.moderatorUsername = splitModerator[0]!;
            this.moderator = this.client.players.cache.get(this.moderatorId)!;
        }
        this.timestamp = data.Timestamp;
        return this;
    }

    public toJSON(): RawModCall {
        if (this.moderatorId) return {
            Caller: `${this.callerUsername}:${this.callerId}`,
            Timestamp: this.timestamp,
            Moderator: `${this.moderatorUsername}:${this.moderatorId}`,
        }
        return {
            Caller: `${this.callerUsername}:${this.callerId}`,
            Timestamp: this.timestamp,
        }
    }
}
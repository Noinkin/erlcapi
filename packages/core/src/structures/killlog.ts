import { Client } from "../client/client.js";
import { Base } from "./base.js";
import type { RawKillLog } from "../types/index.js";
import { Player } from "./player.js";

export class KillLog extends Base {
    killed!: Player;
    killedId!: number;
    killedUsername!: string;
    killer!: Player;
    killerId!: number;
    killerUsername!: string;
    timestamp!: number;
    
    constructor(client: Client, data: RawKillLog) {
        super(client);
        this._patch(data);
    }

    public _patch(data: RawKillLog): this {
        const splitKilled = data.Killed.split(':');
        const splitKiller = data.Killer.split(':');
        this.killedId = Number(splitKilled[1]);
        this.killedUsername = splitKilled[0]!;
        this.killed = this.client.players.cache.get(this.killedId)!;
        this.killerId = Number(splitKiller[1]);
        this.killerUsername = splitKiller[0]!;
        this.killer = this.client.players.cache.get(this.killerId)!;
        this.timestamp = data.Timestamp;
        return this;
    }

    public toJSON(): RawKillLog {
        return {
            Killed: `${this.killedUsername}:${this.killedId}`,
            Killer: `${this.killerUsername}:${this.killerId}`,
            Timestamp: this.timestamp,
        }
    }
}
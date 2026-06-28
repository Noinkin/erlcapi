import { Client } from "../client/client.js";
import { Base } from "./base.js";
import type { RawCommandLog } from "../types/index.js";
import { Player } from "./player.js";

export class CommandLog extends Base {
    player!: Player;
    playerId!: number;
    playerUsername!: string;
    timestamp!: number;
    command!: string;
    
    constructor(client: Client, data: RawCommandLog) {
        super(client);
        this._patch(data);
    }

    public _patch(data: RawCommandLog): this {
        const splitPlayer = data.Player.split(':');
        this.playerId = Number(splitPlayer[1]);
        this.playerUsername = splitPlayer[0]!;
        this.player = this.client.players.cache.get(this.playerId)!;
        this.command = data.Command;
        this.timestamp = data.Timestamp;
        return this;
    }

    public toJSON(): RawCommandLog {
        return {
            Player: `${this.playerUsername}:${this.playerId}`,
            Timestamp: this.timestamp,
            Command: this.command
        }
    }
}
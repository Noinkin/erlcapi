import { Client } from "../client/client.js";
import { Base } from "./base.js";
import type { RawEmergencyCall } from "../types/index.js";
import { Player } from "./player.js";

export class EmergencyCall extends Base {
    caller!: Player;
    callerId!: number;
    team!: string;
    playerIds!: number[];
    players!: Player[];
    position!: number[];
    startedAt!: number;
    callNumber!: number;
    description!: string;
    positionDescriptor!: string;
    
    constructor(client: Client, data: RawEmergencyCall) {
        super(client);
        this._patch(data);
    }

    public _patch(data: RawEmergencyCall): this {
        this.callerId = data.Caller;
        this.caller = this.client.players.cache.get(this.callerId)!;
        this.team = data.Team;
        this.playerIds = data.Players;
        this.players = [];
        for (const playerId of data.Players) {
            const player = this.client.players.cache.get(playerId);
            if (player) this.players.push(player);
        }
        this.position = data.Position;
        this.startedAt = data.StartedAt;
        this.callNumber = data.CallNumber;
        this.description = data.Description;
        this.positionDescriptor = data.PositionDescriptor
        return this;
    }

    public toJSON(): RawEmergencyCall {
        return {
            Caller: this.callerId,
            Team: this.team,
            Players: this.playerIds,
            Position: this.position,
            StartedAt: this.startedAt,
            CallNumber: this.callNumber,
            Description: this.description,
            PositionDescriptor: this.positionDescriptor,
        }
    }
}
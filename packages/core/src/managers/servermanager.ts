import { Client, ERLCEvents } from "../client/client.js";
import type { RawServerData } from "../types/index.js";
import { Server } from "../structures/server.js";

export class ServerManager {
    public cache?: Server;

    constructor(private readonly client: Client) {};
    
    public async fetch() {
        const rawServerData: RawServerData = await this.client.rest.request('GET', '/v2/server?Players=true&Vehicles=true&Staff=true&JoinLogs=true&Queue=true&KillLogs=true&CommandLogs=true&ModCalls=true&EmergencyCalls=true');

        if (this.cache?.compare(rawServerData)) return rawServerData;
        if (this.cache) {
            const oldCache = new Server(this.client, this.cache.toJSON());
            this.cache._patch(rawServerData);
            this.client.emit(ERLCEvents.serverUpdate, oldCache, this.cache);
        } else {
            this.cache = new Server(this.client, rawServerData);
            this.client.emit(ERLCEvents.serverCreate, this.cache);
        }

        return rawServerData;
    }
}
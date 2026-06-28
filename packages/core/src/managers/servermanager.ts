import { Client } from "../client/client.js";
import type { RawServerData } from "../types/index.js";

export class ServerManager {
    constructor(private readonly client: Client) {};
    
    public async fetch() {
        const rawServerData: RawServerData = await this.client.rest.request('GET', '/v2/server?Players=true');

        return rawServerData;
    }
}
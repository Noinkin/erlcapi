import { Client, ERLCEvents } from '../client/client.js';
import { ModCall } from '../structures/modcall.js';
import { type RawModCall, type RawServerData } from '../types/index.js';

export class ModCallManager {
    public cache = new Map<string, ModCall>();

    constructor(private readonly client: Client) {}

    public async fetchAll(): Promise<Map<string, ModCall>> {
        const rawServer: RawServerData = await this.client.rest.request('GET', '/v2/server?ModCalls=true');
        const rawModCalls: RawModCall[] = rawServer.ModCalls ?? [];
        
        return this.updateCache(rawModCalls);
    }

    public updateCache(rawCommands: RawModCall[]) {
        for (const rawData of rawCommands) {
            const key = `${rawData.Caller}:${rawData.Timestamp}`
            const cachedPlayer = this.cache.get(key);

            if (!cachedPlayer) {
                const newCall = new ModCall(this.client, rawData);
                this.cache.set(key, newCall);
                this.client.emit(ERLCEvents.modCall, newCall);
            }
        }

        return this.cache;
    }
}
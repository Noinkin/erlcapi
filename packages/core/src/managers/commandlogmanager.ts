import { Client, ERLCEvents } from '../client/client.js';
import { CommandLog } from '../structures/commandlog.js';
import { type RawCommandLog, type RawServerData } from '../types/index.js';

export class CommandLogManager {
    public cache = new Map<string, CommandLog>();

    constructor(private readonly client: Client) {}

    public async fetchAll(): Promise<Map<string, CommandLog>> {
        const rawServer: RawServerData = await this.client.rest.request('GET', '/v2/server?CommandLogs=true');
        const rawCommands: RawCommandLog[] = rawServer.CommandLogs ?? [];
        
        return this.updateCache(rawCommands);
    }

    public updateCache(rawCommands: RawCommandLog[]) {
        for (const rawData of rawCommands) {
            const key = `${rawData.Player}:${rawData.Timestamp}`
            const cachedPlayer = this.cache.get(key);

            if (!cachedPlayer) {
                const newCommand = new CommandLog(this.client, rawData);
                this.cache.set(key, newCommand);
                this.client.emit(ERLCEvents.command, newCommand);
            }
        }

        return this.cache;
    }
}
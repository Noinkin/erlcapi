import { ZigBindRegistry } from 'zig-bind';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const __dirname = import.meta.dirname;

export class SystePackage {
    private registry: ZigBindRegistry;
    private memory: WebAssembly.Memory;
    private exports: any;

    constructor(wasmInstance: WebAssembly.Instance) {
        this.registry = new ZigBindRegistry(wasmInstance);
        this.memory = wasmInstance.exports.memory as WebAssembly.Memory;
        
        // All native functions are found at this.exports.<function-name>
        this.exports = wasmInstance.exports as any;
    }

    // Add native function wrappers here
}

const wasmPath = resolve(__dirname, '../dist/package.wasm/package.wasm');
const wasmBuffer = readFileSync(wasmPath);
const { instance } = await WebAssembly.instantiate(wasmBuffer, {});

export const Package = new SystePackage(instance);
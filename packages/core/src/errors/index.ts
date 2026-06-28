export class InvalidServerKeyError extends Error {
    constructor(message: string = 'Invalid Server API Key.') {
        super(message);
        this.name = 'InvalidServerKeyError'
    }
}
/// <reference types="socket.io" />
import * as Redis from 'redis';
import { BaseAuthorizationHandler } from './base/BaseAuthorizationHandler';
export interface SocketServerOptions {
    redis?: Redis.RedisClient;
}
export default class SocketServer {
    protected options: SocketServerOptions;
    io: SocketIO.Server;
    constructor(io: SocketIO.Server, options?: SocketServerOptions);
    /**
     * Handles a new client connection.
     *
     * @param socket The socket instance
     */
    protected onConnect(socket: SocketIO.Socket): void;
    /**
     * Handles a client disconnecting.
     *
     * @param socket The socket instance
     */
    protected onDisconnect(socket: SocketIO.Socket): void;
    /**
     * Handles an unknown socket error.
     *
     * @param error The error instance
     */
    onError(error: Error): Promise<void>;
    /**
     * Sets the handler for socket authorizations.
     *
     * @param handler The authorization handler instance
     */
    setAuthorizationHandler(handler: BaseAuthorizationHandler): void;
}

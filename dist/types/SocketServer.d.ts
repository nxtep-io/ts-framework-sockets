/// <reference types="socket.io" />
import * as Redis from 'redis';
import { LoggerInstance } from 'ts-framework-common';
import { BaseAuthorizationHandler } from './base/BaseAuthorizationHandler';
import { BaseSocketController } from 'base/BaseSocketController';
export interface SocketServerOptions {
    redis?: Redis.RedisClient;
    logger?: LoggerInstance;
    listeners?: (typeof BaseSocketController)[];
}
export declare class SocketServer {
    protected options: SocketServerOptions;
    io: SocketIO.Server;
    protected logger: LoggerInstance;
    constructor(io: SocketIO.Server, options?: SocketServerOptions);
    /**
     * Handles a new client connection.
     */
    protected onConnect(socket: SocketIO.Socket): void;
    /**
     * Handles a client disconnecting.
     */
    protected onDisconnect(socket: SocketIO.Socket): void;
    /**
     * Handles an unknown socket error.
     */
    onError(error: Error): Promise<void>;
    /**
     * Sets the handler for socket authorizations.
     */
    setAuthorizationHandler(handler: BaseAuthorizationHandler): void;
}

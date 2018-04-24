"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_framework_1 = require("ts-framework");
const SockerRedisAdapter = require("socket.io-redis");
const SocketIOWildcard = require("socketio-wildcard");
class SocketServer {
    constructor(io, options = {}) {
        this.options = options;
        this.io = io;
        // Prepare wildcard adapter
        this.io.use(SocketIOWildcard());
        // If enabled, prepare redis adapter for centralized sessions
        if (this.options.redis) {
            ts_framework_1.Logger.debug('Socket service initializing Redis adapter for sticky sessions...');
            this.io.adapter(SockerRedisAdapter({ pubClient: this.options.redis, subClient: this.options.redis }));
        }
        // Bind event listeners
        this.io.on('connect', this.onConnect.bind(this));
    }
    /**
     * Handles a new client connection.
     *
     * @param socket The socket instance
     */
    onConnect(socket) {
        const info = { id: socket.id };
        ts_framework_1.Logger.silly('Socket client connected', info);
        socket.on('error', this.onError.bind(this, socket));
        socket.on('disconnect', this.onDisconnect.bind(this, socket));
    }
    /**
     * Handles a client disconnecting.
     *
     * @param socket The socket instance
     */
    onDisconnect(socket) {
        const info = { id: socket.id };
        ts_framework_1.Logger.silly('Socket client disconnected', info);
    }
    /**
     * Handles an unknown socket error.
     *
     * @param error The error instance
     */
    onError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            ts_framework_1.Logger.error(`Unknown socket error: ${error.message}`, error);
        });
    }
    /**
     * Sets the handler for socket authorizations.
     *
     * @param handler The authorization handler instance
     */
    setAuthorizationHandler(handler) {
        // Bind middlewares
        this.io.set('authorization', handler.onAuthorization.bind(handler));
    }
}
exports.default = SocketServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU29ja2V0U2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL1NvY2tldFNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBRTlDLHNEQUFzRDtBQUN0RCxzREFBc0Q7QUFPdEQ7SUFHRSxZQUFtQixFQUFtQixFQUFZLFVBQStCLEVBQUU7UUFBakMsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7UUFDakYsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFFYiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBRWhDLDZEQUE2RDtRQUM3RCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ3RCLHFCQUFNLENBQUMsS0FBSyxDQUFDLGtFQUFrRSxDQUFDLENBQUM7WUFDakYsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3ZHO1FBRUQsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7OztPQUlHO0lBQ08sU0FBUyxDQUFDLE1BQXVCO1FBQ3pDLE1BQU0sSUFBSSxHQUFHLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQVMsQ0FBQztRQUN0QyxxQkFBTSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5QyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNPLFlBQVksQ0FBQyxNQUF1QjtRQUM1QyxNQUFNLElBQUksR0FBRyxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFTLENBQUM7UUFDdEMscUJBQU0sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVEOzs7O09BSUc7SUFDVSxPQUFPLENBQUMsS0FBWTs7WUFDL0IscUJBQU0sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoRSxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ0ksdUJBQXVCLENBQUMsT0FBaUM7UUFDOUQsbUJBQW1CO1FBQ2xCLElBQUksQ0FBQyxFQUFVLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQy9FLENBQUM7Q0FDRjtBQTNERCwrQkEyREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VydmVyLCB7IExvZ2dlciB9IGZyb20gJ3RzLWZyYW1ld29yayc7XG5pbXBvcnQgKiBhcyBSZWRpcyBmcm9tICdyZWRpcyc7XG5pbXBvcnQgKiBhcyBTb2NrZXJSZWRpc0FkYXB0ZXIgZnJvbSAnc29ja2V0LmlvLXJlZGlzJztcbmltcG9ydCAqIGFzIFNvY2tldElPV2lsZGNhcmQgZnJvbSAnc29ja2V0aW8td2lsZGNhcmQnO1xuaW1wb3J0IHsgQmFzZUF1dGhvcml6YXRpb25IYW5kbGVyIH0gZnJvbSAnLi9iYXNlL0Jhc2VBdXRob3JpemF0aW9uSGFuZGxlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU29ja2V0U2VydmVyT3B0aW9ucyB7XG4gIHJlZGlzPzogUmVkaXMuUmVkaXNDbGllbnQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvY2tldFNlcnZlciB7XG4gIHB1YmxpYyBpbzogU29ja2V0SU8uU2VydmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihpbzogU29ja2V0SU8uU2VydmVyLCBwcm90ZWN0ZWQgb3B0aW9uczogU29ja2V0U2VydmVyT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5pbyA9IGlvO1xuXG4gICAgLy8gUHJlcGFyZSB3aWxkY2FyZCBhZGFwdGVyXG4gICAgdGhpcy5pby51c2UoU29ja2V0SU9XaWxkY2FyZCgpKTtcblxuICAgIC8vIElmIGVuYWJsZWQsIHByZXBhcmUgcmVkaXMgYWRhcHRlciBmb3IgY2VudHJhbGl6ZWQgc2Vzc2lvbnNcbiAgICBpZiAodGhpcy5vcHRpb25zLnJlZGlzKSB7XG4gICAgICBMb2dnZXIuZGVidWcoJ1NvY2tldCBzZXJ2aWNlIGluaXRpYWxpemluZyBSZWRpcyBhZGFwdGVyIGZvciBzdGlja3kgc2Vzc2lvbnMuLi4nKTtcbiAgICAgIHRoaXMuaW8uYWRhcHRlcihTb2NrZXJSZWRpc0FkYXB0ZXIoeyBwdWJDbGllbnQ6IHRoaXMub3B0aW9ucy5yZWRpcywgc3ViQ2xpZW50OiB0aGlzLm9wdGlvbnMucmVkaXMgfSkpO1xuICAgIH1cblxuICAgIC8vIEJpbmQgZXZlbnQgbGlzdGVuZXJzXG4gICAgdGhpcy5pby5vbignY29ubmVjdCcsIHRoaXMub25Db25uZWN0LmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYSBuZXcgY2xpZW50IGNvbm5lY3Rpb24uXG4gICAqIFxuICAgKiBAcGFyYW0gc29ja2V0IFRoZSBzb2NrZXQgaW5zdGFuY2VcbiAgICovXG4gIHByb3RlY3RlZCBvbkNvbm5lY3Qoc29ja2V0OiBTb2NrZXRJTy5Tb2NrZXQpIHtcbiAgICBjb25zdCBpbmZvID0geyBpZDogc29ja2V0LmlkIH0gYXMgYW55O1xuICAgIExvZ2dlci5zaWxseSgnU29ja2V0IGNsaWVudCBjb25uZWN0ZWQnLCBpbmZvKTtcbiAgICBzb2NrZXQub24oJ2Vycm9yJywgdGhpcy5vbkVycm9yLmJpbmQodGhpcywgc29ja2V0KSk7XG4gICAgc29ja2V0Lm9uKCdkaXNjb25uZWN0JywgdGhpcy5vbkRpc2Nvbm5lY3QuYmluZCh0aGlzLCBzb2NrZXQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGEgY2xpZW50IGRpc2Nvbm5lY3RpbmcuXG4gICAqIFxuICAgKiBAcGFyYW0gc29ja2V0IFRoZSBzb2NrZXQgaW5zdGFuY2VcbiAgICovXG4gIHByb3RlY3RlZCBvbkRpc2Nvbm5lY3Qoc29ja2V0OiBTb2NrZXRJTy5Tb2NrZXQpIHtcbiAgICBjb25zdCBpbmZvID0geyBpZDogc29ja2V0LmlkIH0gYXMgYW55O1xuICAgIExvZ2dlci5zaWxseSgnU29ja2V0IGNsaWVudCBkaXNjb25uZWN0ZWQnLCBpbmZvKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFuIHVua25vd24gc29ja2V0IGVycm9yLlxuICAgKiBcbiAgICogQHBhcmFtIGVycm9yIFRoZSBlcnJvciBpbnN0YW5jZVxuICAgKi9cbiAgcHVibGljIGFzeW5jIG9uRXJyb3IoZXJyb3I6IEVycm9yKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgTG9nZ2VyLmVycm9yKGBVbmtub3duIHNvY2tldCBlcnJvcjogJHtlcnJvci5tZXNzYWdlfWAsIGVycm9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBoYW5kbGVyIGZvciBzb2NrZXQgYXV0aG9yaXphdGlvbnMuXG4gICAqIFxuICAgKiBAcGFyYW0gaGFuZGxlciBUaGUgYXV0aG9yaXphdGlvbiBoYW5kbGVyIGluc3RhbmNlXG4gICAqL1xuICBwdWJsaWMgc2V0QXV0aG9yaXphdGlvbkhhbmRsZXIoaGFuZGxlcjogQmFzZUF1dGhvcml6YXRpb25IYW5kbGVyKSB7XG4gICAgLy8gQmluZCBtaWRkbGV3YXJlc1xuICAgICh0aGlzLmlvIGFzIGFueSkuc2V0KCdhdXRob3JpemF0aW9uJywgaGFuZGxlci5vbkF1dGhvcml6YXRpb24uYmluZChoYW5kbGVyKSk7XG4gIH1cbn1cbiJdfQ==
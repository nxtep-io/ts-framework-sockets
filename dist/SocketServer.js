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
const SockerRedisAdapter = require("socket.io-redis");
const SocketIOWildcard = require("socketio-wildcard");
const ts_framework_common_1 = require("ts-framework-common");
class SocketServer {
    constructor(io, options = {}) {
        this.options = options;
        this.io = io;
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
        // Prepare wildcard adapter
        this.io.use(SocketIOWildcard());
        // If enabled, prepare redis adapter for centralized sessions
        if (this.options.redis) {
            this.logger.debug('Socket service initializing Redis adapter for sticky sessions...');
            this.io.adapter(SockerRedisAdapter({ pubClient: this.options.redis, subClient: this.options.redis }));
        }
        // Bind event listeners
        this.io.on('connect', this.onConnect.bind(this));
    }
    /**
     * Handles a new client connection.
     */
    onConnect(socket) {
        const info = { id: socket.id };
        this.logger.silly('Socket client connected', info);
        socket.on('error', this.onError.bind(this, socket));
        socket.on('disconnect', this.onDisconnect.bind(this, socket));
    }
    /**
     * Handles a client disconnecting.
     */
    onDisconnect(socket) {
        const info = { id: socket.id };
        this.logger.silly('Socket client disconnected', info);
    }
    /**
     * Handles an unknown socket error.
     */
    onError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.error(`Unknown socket error: ${error.message}`, error);
        });
    }
    /**
     * Sets the handler for socket authorizations.
     */
    setAuthorizationHandler(handler) {
        // Bind middlewares
        this.io.set('authorization', handler.onAuthorization.bind(handler));
    }
}
exports.SocketServer = SocketServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU29ja2V0U2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL1NvY2tldFNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0Esc0RBQXNEO0FBQ3RELHNEQUFzRDtBQUN0RCw2REFBNkQ7QUFRN0QsTUFBYSxZQUFZO0lBSXZCLFlBQW1CLEVBQW1CLEVBQVksVUFBK0IsRUFBRTtRQUFqQyxZQUFPLEdBQVAsT0FBTyxDQUEwQjtRQUNqRixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXJELDJCQUEyQjtRQUMzQixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFFaEMsNkRBQTZEO1FBQzdELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0VBQWtFLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDdkc7UUFFRCx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVEOztPQUVHO0lBQ08sU0FBUyxDQUFDLE1BQXVCO1FBQ3pDLE1BQU0sSUFBSSxHQUFHLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQVMsQ0FBQztRQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRCxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQ7O09BRUc7SUFDTyxZQUFZLENBQUMsTUFBdUI7UUFDNUMsTUFBTSxJQUFJLEdBQUcsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBUyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDRCQUE0QixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRDs7T0FFRztJQUNVLE9BQU8sQ0FBQyxLQUFZOztZQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JFLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0ksdUJBQXVCLENBQUMsT0FBaUM7UUFDOUQsbUJBQW1CO1FBQ2xCLElBQUksQ0FBQyxFQUFVLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQy9FLENBQUM7Q0FDRjtBQXJERCxvQ0FxREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWRpcyBmcm9tICdyZWRpcyc7XG5pbXBvcnQgKiBhcyBTb2NrZXJSZWRpc0FkYXB0ZXIgZnJvbSAnc29ja2V0LmlvLXJlZGlzJztcbmltcG9ydCAqIGFzIFNvY2tldElPV2lsZGNhcmQgZnJvbSAnc29ja2V0aW8td2lsZGNhcmQnO1xuaW1wb3J0IHsgTG9nZ2VyLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gJ3RzLWZyYW1ld29yay1jb21tb24nO1xuaW1wb3J0IHsgQmFzZUF1dGhvcml6YXRpb25IYW5kbGVyIH0gZnJvbSAnLi9iYXNlL0Jhc2VBdXRob3JpemF0aW9uSGFuZGxlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU29ja2V0U2VydmVyT3B0aW9ucyB7XG4gIHJlZGlzPzogUmVkaXMuUmVkaXNDbGllbnQ7XG4gIGxvZ2dlcj86IExvZ2dlckluc3RhbmNlO1xufVxuXG5leHBvcnQgY2xhc3MgU29ja2V0U2VydmVyIHtcbiAgcHVibGljIGlvOiBTb2NrZXRJTy5TZXJ2ZXI7XG4gIHByb3RlY3RlZCBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihpbzogU29ja2V0SU8uU2VydmVyLCBwcm90ZWN0ZWQgb3B0aW9uczogU29ja2V0U2VydmVyT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5pbyA9IGlvO1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgTG9nZ2VyLmdldEluc3RhbmNlKCk7XG5cbiAgICAvLyBQcmVwYXJlIHdpbGRjYXJkIGFkYXB0ZXJcbiAgICB0aGlzLmlvLnVzZShTb2NrZXRJT1dpbGRjYXJkKCkpO1xuXG4gICAgLy8gSWYgZW5hYmxlZCwgcHJlcGFyZSByZWRpcyBhZGFwdGVyIGZvciBjZW50cmFsaXplZCBzZXNzaW9uc1xuICAgIGlmICh0aGlzLm9wdGlvbnMucmVkaXMpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdTb2NrZXQgc2VydmljZSBpbml0aWFsaXppbmcgUmVkaXMgYWRhcHRlciBmb3Igc3RpY2t5IHNlc3Npb25zLi4uJyk7XG4gICAgICB0aGlzLmlvLmFkYXB0ZXIoU29ja2VyUmVkaXNBZGFwdGVyKHsgcHViQ2xpZW50OiB0aGlzLm9wdGlvbnMucmVkaXMsIHN1YkNsaWVudDogdGhpcy5vcHRpb25zLnJlZGlzIH0pKTtcbiAgICB9XG5cbiAgICAvLyBCaW5kIGV2ZW50IGxpc3RlbmVyc1xuICAgIHRoaXMuaW8ub24oJ2Nvbm5lY3QnLCB0aGlzLm9uQ29ubmVjdC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGEgbmV3IGNsaWVudCBjb25uZWN0aW9uLlxuICAgKi9cbiAgcHJvdGVjdGVkIG9uQ29ubmVjdChzb2NrZXQ6IFNvY2tldElPLlNvY2tldCkge1xuICAgIGNvbnN0IGluZm8gPSB7IGlkOiBzb2NrZXQuaWQgfSBhcyBhbnk7XG4gICAgdGhpcy5sb2dnZXIuc2lsbHkoJ1NvY2tldCBjbGllbnQgY29ubmVjdGVkJywgaW5mbyk7XG4gICAgc29ja2V0Lm9uKCdlcnJvcicsIHRoaXMub25FcnJvci5iaW5kKHRoaXMsIHNvY2tldCkpO1xuICAgIHNvY2tldC5vbignZGlzY29ubmVjdCcsIHRoaXMub25EaXNjb25uZWN0LmJpbmQodGhpcywgc29ja2V0KSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhIGNsaWVudCBkaXNjb25uZWN0aW5nLlxuICAgKi9cbiAgcHJvdGVjdGVkIG9uRGlzY29ubmVjdChzb2NrZXQ6IFNvY2tldElPLlNvY2tldCkge1xuICAgIGNvbnN0IGluZm8gPSB7IGlkOiBzb2NrZXQuaWQgfSBhcyBhbnk7XG4gICAgdGhpcy5sb2dnZXIuc2lsbHkoJ1NvY2tldCBjbGllbnQgZGlzY29ubmVjdGVkJywgaW5mbyk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbiB1bmtub3duIHNvY2tldCBlcnJvci5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBvbkVycm9yKGVycm9yOiBFcnJvcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMubG9nZ2VyLmVycm9yKGBVbmtub3duIHNvY2tldCBlcnJvcjogJHtlcnJvci5tZXNzYWdlfWAsIGVycm9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBoYW5kbGVyIGZvciBzb2NrZXQgYXV0aG9yaXphdGlvbnMuXG4gICAqL1xuICBwdWJsaWMgc2V0QXV0aG9yaXphdGlvbkhhbmRsZXIoaGFuZGxlcjogQmFzZUF1dGhvcml6YXRpb25IYW5kbGVyKSB7XG4gICAgLy8gQmluZCBtaWRkbGV3YXJlc1xuICAgICh0aGlzLmlvIGFzIGFueSkuc2V0KCdhdXRob3JpemF0aW9uJywgaGFuZGxlci5vbkF1dGhvcml6YXRpb24uYmluZChoYW5kbGVyKSk7XG4gIH1cbn1cbiJdfQ==
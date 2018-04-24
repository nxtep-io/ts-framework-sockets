"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The base class for creating Socket Controllers, collection of socket Listeners.
 */
class BaseSocketController {
    /**
     * Binds a Socket instance to the controller methods.
     *
     * @param socket The socket instance
     */
    static bindSocket(socket) {
        for (const action in this.methods) {
            if (this.methods.hasOwnProperty(action)) {
                socket.on(action, this.methods[action].bind(socket));
            }
        }
    }
    /**
     * Binds a Socket instance to this controller methods. This should not be
     * called directly, use the decorator instead.
     *
     * @see Listener
     * @param eventName The socket event name
     * @param eventName The socket action listener
     */
    static bindEvent(eventName, action) {
        this.methods = this.methods || {};
        this.methods[eventName] = action.bind(this);
    }
}
BaseSocketController.methods = {};
exports.default = BaseSocketController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVNvY2tldENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvYmFzZS9CYXNlU29ja2V0Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOztHQUVHO0FBQ0g7SUFHRTs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUF1QjtRQUM5QyxLQUFLLE1BQU0sTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDdkMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUN0RDtTQUNGO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDTyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxNQUFNO1FBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7O0FBMUJnQiw0QkFBTyxHQUF3QyxFQUFFLENBQUM7QUFEckUsdUNBNEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU29ja2V0SU8gZnJvbSAnc29ja2V0LmlvJztcblxuLyoqXG4gKiBUaGUgYmFzZSBjbGFzcyBmb3IgY3JlYXRpbmcgU29ja2V0IENvbnRyb2xsZXJzLCBjb2xsZWN0aW9uIG9mIHNvY2tldCBMaXN0ZW5lcnMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VTb2NrZXRDb250cm9sbGVyIHtcbiAgcHJvdGVjdGVkIHN0YXRpYyBtZXRob2RzOiB7IFtrZXk6IHN0cmluZ106ICguLi5hcmdzKSA9PiBhbnkgfSA9IHt9O1xuXG4gIC8qKlxuICAgKiBCaW5kcyBhIFNvY2tldCBpbnN0YW5jZSB0byB0aGUgY29udHJvbGxlciBtZXRob2RzLlxuICAgKiBcbiAgICogQHBhcmFtIHNvY2tldCBUaGUgc29ja2V0IGluc3RhbmNlXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGJpbmRTb2NrZXQoc29ja2V0OiBTb2NrZXRJTy5Tb2NrZXQpIHtcbiAgICBmb3IgKGNvbnN0IGFjdGlvbiBpbiB0aGlzLm1ldGhvZHMpIHtcbiAgICAgIGlmICh0aGlzLm1ldGhvZHMuaGFzT3duUHJvcGVydHkoYWN0aW9uKSkge1xuICAgICAgICBzb2NrZXQub24oYWN0aW9uLCB0aGlzLm1ldGhvZHNbYWN0aW9uXS5iaW5kKHNvY2tldCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kcyBhIFNvY2tldCBpbnN0YW5jZSB0byB0aGlzIGNvbnRyb2xsZXIgbWV0aG9kcy4gVGhpcyBzaG91bGQgbm90IGJlXG4gICAqIGNhbGxlZCBkaXJlY3RseSwgdXNlIHRoZSBkZWNvcmF0b3IgaW5zdGVhZC5cbiAgICogXG4gICAqIEBzZWUgTGlzdGVuZXJcbiAgICogQHBhcmFtIGV2ZW50TmFtZSBUaGUgc29ja2V0IGV2ZW50IG5hbWVcbiAgICogQHBhcmFtIGV2ZW50TmFtZSBUaGUgc29ja2V0IGFjdGlvbiBsaXN0ZW5lclxuICAgKi9cbiAgcHJvdGVjdGVkIHN0YXRpYyBiaW5kRXZlbnQoZXZlbnROYW1lLCBhY3Rpb24pIHtcbiAgICB0aGlzLm1ldGhvZHMgPSB0aGlzLm1ldGhvZHMgfHwge307XG4gICAgdGhpcy5tZXRob2RzW2V2ZW50TmFtZV0gPSBhY3Rpb24uYmluZCh0aGlzKTtcbiAgfVxufVxuIl19
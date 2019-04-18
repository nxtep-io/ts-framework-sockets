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
                socket.on(action, data => this.methods[action](socket, data));
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
exports.BaseSocketController = BaseSocketController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVNvY2tldENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvYmFzZS9CYXNlU29ja2V0Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOztHQUVHO0FBQ0gsTUFBYSxvQkFBb0I7SUFHL0I7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBdUI7UUFDOUMsS0FBSyxNQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3ZDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUMvRDtTQUNGO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDTyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxNQUFNO1FBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7O0FBMUJnQiw0QkFBTyxHQUF3QyxFQUFFLENBQUM7QUFEckUsb0RBNEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU29ja2V0SU8gZnJvbSAnc29ja2V0LmlvJztcblxuLyoqXG4gKiBUaGUgYmFzZSBjbGFzcyBmb3IgY3JlYXRpbmcgU29ja2V0IENvbnRyb2xsZXJzLCBjb2xsZWN0aW9uIG9mIHNvY2tldCBMaXN0ZW5lcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBCYXNlU29ja2V0Q29udHJvbGxlciB7XG4gIHByb3RlY3RlZCBzdGF0aWMgbWV0aG9kczogeyBba2V5OiBzdHJpbmddOiAoLi4uYXJncykgPT4gYW55IH0gPSB7fTtcblxuICAvKipcbiAgICogQmluZHMgYSBTb2NrZXQgaW5zdGFuY2UgdG8gdGhlIGNvbnRyb2xsZXIgbWV0aG9kcy5cbiAgICpcbiAgICogQHBhcmFtIHNvY2tldCBUaGUgc29ja2V0IGluc3RhbmNlXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGJpbmRTb2NrZXQoc29ja2V0OiBTb2NrZXRJTy5Tb2NrZXQpIHtcbiAgICBmb3IgKGNvbnN0IGFjdGlvbiBpbiB0aGlzLm1ldGhvZHMpIHtcbiAgICAgIGlmICh0aGlzLm1ldGhvZHMuaGFzT3duUHJvcGVydHkoYWN0aW9uKSkge1xuICAgICAgICBzb2NrZXQub24oYWN0aW9uLCBkYXRhID0+IHRoaXMubWV0aG9kc1thY3Rpb25dKHNvY2tldCwgZGF0YSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kcyBhIFNvY2tldCBpbnN0YW5jZSB0byB0aGlzIGNvbnRyb2xsZXIgbWV0aG9kcy4gVGhpcyBzaG91bGQgbm90IGJlXG4gICAqIGNhbGxlZCBkaXJlY3RseSwgdXNlIHRoZSBkZWNvcmF0b3IgaW5zdGVhZC5cbiAgICpcbiAgICogQHNlZSBMaXN0ZW5lclxuICAgKiBAcGFyYW0gZXZlbnROYW1lIFRoZSBzb2NrZXQgZXZlbnQgbmFtZVxuICAgKiBAcGFyYW0gZXZlbnROYW1lIFRoZSBzb2NrZXQgYWN0aW9uIGxpc3RlbmVyXG4gICAqL1xuICBwcm90ZWN0ZWQgc3RhdGljIGJpbmRFdmVudChldmVudE5hbWUsIGFjdGlvbikge1xuICAgIHRoaXMubWV0aG9kcyA9IHRoaXMubWV0aG9kcyB8fCB7fTtcbiAgICB0aGlzLm1ldGhvZHNbZXZlbnROYW1lXSA9IGFjdGlvbi5iaW5kKHRoaXMpO1xuICB9XG59XG4iXX0=
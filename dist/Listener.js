"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Binds a public static method from a class that extends BaseSocketController
 * to a socket instance, when bound to.
 *
 * @param eventName The event name to bind this action to.
 */
// tslint:disable-next-line:function-name
function Listener(eventName) {
    return function (target, propertyKey, descriptor) {
        target.constructor.bindEvent(eventName, descriptor.value);
    };
}
exports.Listener = Listener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdGVuZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvTGlzdGVuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7R0FLRztBQUNILHlDQUF5QztBQUN6QyxTQUFnQixRQUFRLENBQUMsU0FBaUI7SUFDeEMsT0FBTyxVQUFVLE1BQU0sRUFBRSxXQUFtQixFQUFFLFVBQThCO1FBQzFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUQsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUpELDRCQUlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBCaW5kcyBhIHB1YmxpYyBzdGF0aWMgbWV0aG9kIGZyb20gYSBjbGFzcyB0aGF0IGV4dGVuZHMgQmFzZVNvY2tldENvbnRyb2xsZXJcbiAqIHRvIGEgc29ja2V0IGluc3RhbmNlLCB3aGVuIGJvdW5kIHRvLlxuICpcbiAqIEBwYXJhbSBldmVudE5hbWUgVGhlIGV2ZW50IG5hbWUgdG8gYmluZCB0aGlzIGFjdGlvbiB0by5cbiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZ1bmN0aW9uLW5hbWVcbmV4cG9ydCBmdW5jdGlvbiBMaXN0ZW5lcihldmVudE5hbWU6IHN0cmluZykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgcHJvcGVydHlLZXk6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XG4gICAgdGFyZ2V0LmNvbnN0cnVjdG9yLmJpbmRFdmVudChldmVudE5hbWUsIGRlc2NyaXB0b3IudmFsdWUpO1xuICB9O1xufVxuIl19
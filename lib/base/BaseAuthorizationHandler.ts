/**
 * The Authorization handler interface, for protecting the Socket service 
 * using authentication mechanisms such as JWT and OAuth 2.0. 
 */
export interface BaseAuthorizationHandler {
  
  /**
   * Handles a new Socket connection authentication request.
   * 
   * TODO: This is the Socket.io default way. Maybe use promises instead? 
   * 
   * @param handshake The handshake information
   * @param accept The callback for accepting the socket
   */
  onAuthorization(handshake: any, accept: (error: Error, accepted?: boolean) => void): Promise<void>;
}

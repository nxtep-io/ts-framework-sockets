import * as SocketIO from 'socket.io';
import { SocketServer } from '../lib';

describe('lib.Socket', () => {
  let io;

  beforeEach(async () => {
    io = SocketIO(3000);
  });

  afterEach(async () => {
    await io.close();
  });

  it('should run a simple socket server', async () => {
    const server = new SocketServer(io);
    expect(server).toBeTruthy();
  });
});

import * as Redis from 'redis-mock';
import * as SocketIO from 'socket.io';
import * as SocketIOClient from 'socket.io-client';
import { BaseSocketController, Listener, SocketServer } from '../lib';

const HOST = process.env.HOST || 'http://localhost';
const PORT = process.env.PORT || 3002;

describe('lib.sockets.Redis', () => {
  let io: SocketIO.Server;
  let server: SocketServer;
  let socket: SocketIOClient.Socket;

  class TestSocketController extends BaseSocketController {
    @Listener('test')
    public static async test(socket: SocketIO.Socket, data: any, ack: (...args: any[]) => void) {
      ack(data);
    }
  }

  beforeEach(async () => {
    io = SocketIO(PORT);
    socket = SocketIOClient(`${HOST}:${PORT}`);

    server = new SocketServer(io, {
      listeners: [TestSocketController],
      redis: Redis.createClient(),
    });

    await new Promise<void>(resolve => socket.on('connect', () => resolve()));
  });

  afterEach(async () => {
    if (io) {
      await io.close();
      io = undefined;
    }

    if (socket) {
      await socket.close();
      socket = undefined;
    }
  });

  it('should run a simple socket server', async () => {
    await new Promise(resolve => socket.emit('test', { ok: true }, (data: any) => {
      expect(data.ok).toBe(true);
      resolve();
    }));
  });
});

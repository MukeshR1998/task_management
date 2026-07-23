/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UnauthorizedException } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { AuthBaseService } from '../auth/common/auth.base.service';
import { SendMessageDto } from './dto/sendMessage.dto';

@WebSocketGateway({ cors: { origin: '*' } })
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private userSockets = new Map<string, Set<string>>();

  constructor(private readonly authBaseService: AuthBaseService) {}

  async handleConnection(client: Socket) {
    console.log('New client connected:');

    try {
      const token =
        client.handshake.auth?.token ||
        client.handshake.headers?.authorization?.split(' ')[1] ||
        client.handshake?.query?.token;

      if (!token) throw new UnauthorizedException('Missing token');

      const payload = this.authBaseService.verifyTokenForChatSystem(token);

      console.log('payload', payload);

      (client as any).user = { id: payload.userId };

      // join rooms
      client.join(payload.userId);
      this.indexUserSocket(payload.userId, client.id);

      client.emit('connection_ack', {
        userId: payload.userId,
        rooms: [payload.userId],
      });
    } catch (error) {
      client.emit('error', {
        status: error?.['status'] || 401,
        message: error?.['message'] || 'Unauthorized',
      });

      client.disconnect(true);

      return error;
    }
  }

  async handleDisconnect(client: Socket) {
    const user = (client as any).user as { id: string } | undefined;
    if (!user) return;
    const set = this.userSockets.get(user.id);
    if (set) {
      set.delete(client.id);
      if (set.size === 0) this.userSockets.delete(user.id);
    }
  }

  private indexUserSocket(userId: string, socketId: string) {
    const set = this.userSockets.get(userId) ?? new Set<string>();
    set.add(socketId);
    this.userSockets.set(userId, set);
  }

  getUserSockets(userId: string): Set<string> {
    return this.userSockets.get(userId) ?? new Set();
  }

  @SubscribeMessage('send_message')
  async handleSend(
    @MessageBody() data: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const from = (client as any).user as { id: string };

      const messagePayload = {
        from: from.id,
        message: data.message,
      };

      // 🔥 Send to everyone except sender
      client.broadcast.emit('private_message', messagePayload);

      return messagePayload;
    } catch (error) {
      client.emit('error', {
        status: error?.['status'] || 400,
        message: error?.['message'] || 'Error',
      });
      return error;
    }
  }
}

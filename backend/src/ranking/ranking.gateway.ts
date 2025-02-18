import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class RankingGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('updateScore')
  handleUpdateScore(@MessageBody() data: { userId: number; score: number }) {
    this.server.emit('rankingUpdated', data);
  }
}
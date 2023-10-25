import { WsServiceResponseInterceptor } from '../common/ws-service.response.interceptor';
import { Controller, Res, UseInterceptors } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import type { Response } from 'express';
import { Socket } from 'socket.io';
const fs = require('fs');

@UseInterceptors(new WsServiceResponseInterceptor())
@WebSocketGateway(12238, {
  transports: ['websocket'],
})
@Controller()
export class MyWebSocketGateway {
  @SubscribeMessage('getImgByLocal')
  getImgByLocal(
    @ConnectedSocket() client: Socket,
    @Res() res: Response,
    @MessageBody() req: { filePath: string },
  ) {
    fs.stat(req.filePath, (err, stats) => {
      if (err) {
        client.emit('getImgByLocal', {
          data: err,
          status: 2003,
          message: '文件处理异常，请联系管理员',
        });
      } else {
        client.emit('getImgByLocal', {
          data: {
            base64: 'data:image/png;base64,' + fs.readFileSync(req.filePath, 'base64'),
            filePath: req.filePath,
          },
          status: 200,
          message: '成功',
        });
        return;
      }
    });
  }

  //判断服务是否启动
  @SubscribeMessage('getStatus')
  getStatus(
    @ConnectedSocket() client: Socket,
    @Res() res: Response,
    @MessageBody() req: { filePath: string },
  ) {
    client.emit('getStatus', {
      data: {
        isRun: '1',
      },
      status: 200,
      message: '成功',
    });
  }
}

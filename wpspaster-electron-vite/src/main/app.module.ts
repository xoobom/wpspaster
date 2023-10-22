import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { MyWebSocketModule } from './websocket/my-websocket.module';

@Module({
  imports: [HttpModule, MyWebSocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

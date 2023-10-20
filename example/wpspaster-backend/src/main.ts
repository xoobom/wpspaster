import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //默认情况下，如果在创建应用程序时发生了任何错误，你的应用程序会退出并返回错误代码 1。如果你想让它抛出错误，请禁用 abortOnError 选项(例如，NestFactory.create(AppModule, { abortOnError: false }))。
  app.enableCors(); //允许跨域
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(8023); //http://localhost:8023/
}
bootstrap();

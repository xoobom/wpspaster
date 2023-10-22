// src/base/interceptor/ws-service.response.interceptor.ts
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

/**
 * 全局WebSocket服务响应拦截器
 * 该Interceptor在网关中通过装饰器 @UseInterceptors 使用
 */
export class WsServiceResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}

import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AuthRequestDto } from 'src/auth/dto/AuthRequest.dto';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: ConsoleLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const req = http.getRequest<Request | AuthRequestDto>();
    const { url, method } = req;

    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `${method} - ${url} - ${'user' in req ? req.user.id : 'Anonymous'}, ${Date.now() - startTime} ms`,
        );
      }),
    );
  }
}

import {
  ArgumentsHost,
  Catch,
  ConsoleLogger,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class ExceptionHandlerFilter implements ExceptionFilter {
  constructor(
    private adapterHost: HttpAdapterHost,
    private readonly logger: ConsoleLogger,
  ) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.adapterHost;
    const context = host.switchToHttp();
    const resp = context.getResponse();
    const req = context.getRequest();
    const { url, method } = req;

    const { status, body } =
      exception instanceof HttpException
        ? {
            status: exception.getStatus(),
            body: exception.getResponse(),
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timestamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(req),
            },
          };

    this.logger
      .error(`${method}, ${url}, ${'user' in req ? req.user.id : 'Anonymous User'}, ${status},\nBody: ${JSON.stringify(body)}
                            `);

    httpAdapter.reply(resp, body, status);
  }
}

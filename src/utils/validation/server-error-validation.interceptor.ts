import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class ServerErrorValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof QueryFailedError) {
          console.log('message: ' + error.message);
          if (
            error.message.includes(
              'повторяющееся значение ключа нарушает ограничение уникальности',
            )
          ) {
            throw new BadRequestException('Unique constraint violation');
          }
        }
        throw error;
      }),
    );
  }
}

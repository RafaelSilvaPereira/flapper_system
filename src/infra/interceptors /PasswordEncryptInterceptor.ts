import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import * as crypto from 'crypto';


@Injectable()
export class PasswordEncryptInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const userCredentials = context.switchToHttp().getRequest().body;
    if(userCredentials.password.length < 4) {
      throw new BadRequestException('Very easy password')
    }

    userCredentials.password = await this.encryptPassword(userCredentials.password);
    return next.handle().pipe(map((source) => source));
  }

  private async encryptPassword(password: string): Promise<string> {
    return crypto.createHash('sha256').update(password).digest('hex');
  }


}

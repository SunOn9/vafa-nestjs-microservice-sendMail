import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { CreateUserEvent } from './dto/create-user.event';
import { ResetPasswordEvent } from './dto/resetPassword-user.event';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @EventPattern('user_created')
  handleUserCreated(event : CreateUserEvent) {    
    return this.appService.handleUserCreated(event);
  }

  @EventPattern('reset_password')
  handleResetPassword(data : ResetPasswordEvent) {
    return this.appService.handleResetPassword(data);
  }
}

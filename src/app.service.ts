import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from './dto/create-user.event';
import { ResetPasswordEvent } from './dto/resetPassword-user.event';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService {
  constructor(
    private readonly mailService: MailerService
  ){}

  handleUserCreated(event : CreateUserEvent) {
    const url = `http://localhost:3000/activate?token=${event.data.token}&email=${event.data.email}`;

    this.mailService.sendMail({
      to: event.data.email,
      subject: 'Welcome to VAFA! Confirm your Email',
      template: './activate', 
      context: { 
        name: event.data.email,
        url,
      },
    })
  }

  handleResetPassword(event : ResetPasswordEvent){
    const url = `http://localhost:3000/resetPassword?token=${event.data.token}&email=${event.data.email}`;

    this.mailService.sendMail({
      to: event.data.email,
      subject: 'Reset Your Password',
      template: './chagePassword', 
      context: { 
        name: event.data.email,
        url,
      },
    })
  }
}

import { Controller, Get } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller()
export class AppController {
  constructor(private readonly mailerService: MailerService) {}

  @Get()
  getHello(): string {
    return this.mailerService.getHello();
  }
}

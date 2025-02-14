import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendEmailUseCase {
  constructor(
    private readonly mailerService: MailerService,
  ) {}

  execute(email: string, subject: string, template: string, data) {
    return this.mailerService.sendMail({
        to: [email],
        subject: ['TEST:'] + ` | ${subject}`,
        template,
        context: {
            data
        },
    });
  }
}
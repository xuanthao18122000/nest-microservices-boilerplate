import { Module } from '@nestjs/common';
import { AppController } from './mailer.controller';
import { MailerService } from './mailer.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [MailerService],
})
export class MailerModule {}

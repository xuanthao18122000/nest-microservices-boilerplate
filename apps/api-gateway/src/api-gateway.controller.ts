import { All, Controller, Get, Next, Req, Res } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { Request, Response } from 'express';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get()
  healthCheck(): string {
    return this.apiGatewayService.healthCheck();
  }

  @All('*')
  async handleRequest(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: Function,
  ) {
    return this.apiGatewayService.handleRequest(req, res, next);
  }
}

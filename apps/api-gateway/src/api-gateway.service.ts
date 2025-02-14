import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

interface Route {
  prefix: string;
  methods: string[];
  target: string;
}

export interface GatewayOptions {
  routes: Route[];
}

@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject('GATEWAY_OPTIONS') private options: GatewayOptions,
    private httpService: HttpService,
  ) {}

  healthCheck(): string {
    return 'Health check successfully!';
  }

  async handleRequest(req: Request, res: Response, next: Function) {
    const route = this.findRoute(req.path, req.method);
    
    if (!route) {
      return next();
    }

    try {
      const response = await firstValueFrom(
        this.httpService.request({
          method: req.method,
          url: `${route.target}${req.path}`,
          headers: req.headers,
          data: req.body,
        }),
      );

      res.status(response.status).json(response.data);
    } catch (error) {
      next(error);
    }
  }

  private findRoute(path: string, method: string) {
    return this.options.routes.find(
      (route) =>
        path.startsWith(route.prefix) && route.methods.includes(method),
    );
  }
}

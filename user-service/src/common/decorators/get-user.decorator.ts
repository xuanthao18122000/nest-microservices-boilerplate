import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
      const req: Request = context.switchToHttp().getRequest();
      return req['user'];
    },
  );

  export const GetEmployee = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return request.employee;
    },
  );
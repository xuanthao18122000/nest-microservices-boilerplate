"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const user_module_1 = require("./user/user.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(user_module_1.UsersModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: 'user_queue',
            queueOptions: {
                durable: false,
            },
        },
    });
}
bootstrap();
//# sourceMappingURL=main.js.map
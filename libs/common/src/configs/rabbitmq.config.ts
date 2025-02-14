import { RmqOptions, Transport } from '@nestjs/microservices';
import { getEnv } from './env.config';

export const rabbitMQConfigProductService: RmqOptions = {
	transport: Transport.RMQ,
	options: {
		urls: [
			{
				protocol: getEnv('RMQ_PRODUCT_PROTOCOL'),
				hostname: getEnv('RMQ_PRODUCT_HOSTNAME'),
				port: getEnv('RMQ_PRODUCT_PORT'),
				username: getEnv('RMQ_PRODUCT_USERNAME'),
				password: getEnv('RMQ_PRODUCT_PASSWORD'),
			},
		],
		queueOptions: {
			durable: true, /* Ensures messages are not lost on RabbitMQ restart */
		},

		queue: getEnv('RMQ_PRODUCT_QUEUE'),
	},
};

export const rabbitMQConfigUserService: RmqOptions = {
	transport: Transport.RMQ,
	options: {
		urls: [
			{
				protocol: getEnv('RMQ_USER_PROTOCOL'),
				hostname: getEnv('RMQ_USER_HOSTNAME'),
				port: getEnv('RMQ_USER_PORT'),
				username: getEnv('RMQ_USER_USERNAME'),
				password: getEnv('RMQ_USER_PASSWORD'),
			},
		],
		queueOptions: {
			durable: true, /* Ensures messages are not lost on RabbitMQ restart */
		},
		queue: getEnv('RMQ_USER_QUEUE'),
	},
};

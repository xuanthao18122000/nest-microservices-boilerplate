import { KafkaOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { getEnv } from './env.config';

export const kafkaConfigAuthService: KafkaOptions = {
	transport: Transport.KAFKA,
	options: {
		client: {
			brokers: getEnv('AUTH_KAFKA_BROKERS', (str: string) => str.split(',')),
		},
		consumer: {
			groupId: 'auth-consumer',
			allowAutoTopicCreation: true,
			sessionTimeout: 30000,
			retry: {
				maxRetryTime: 1000,
				restartOnFailure: function (e) {
					return Promise.resolve(true);
				},
			},
		},
		producer: {
			createPartitioner: Partitioners.LegacyPartitioner,
		},
		subscribe: {
			fromBeginning: true,
		},
	},
};

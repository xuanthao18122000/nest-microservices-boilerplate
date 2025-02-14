import { Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UserStatistics,
} from 'apps/user-service/src/domain/interfaces';
import { Between, MoreThanOrEqual } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class StatisticsUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<UserStatistics> {
    const startOfCurrentMonth = moment().startOf('month').toDate();
    const startOfPreviousMonth = moment()
      .subtract(1, 'month')
      .startOf('month')
      .toDate();

    const [totalUsers, newUsersThisMonth, newUsersLastMonth] =
      await Promise.all([
        this.userRepository.count(),
        this.userRepository.count({
          where: {
            createdAt: MoreThanOrEqual(startOfCurrentMonth),
          },
        }),
        this.userRepository.count({
          where: {
            createdAt: Between(startOfPreviousMonth, startOfCurrentMonth),
          },
        }),
      ]);

    const growthRate =
      newUsersLastMonth !== 0
        ? ((newUsersThisMonth - newUsersLastMonth) / newUsersLastMonth) * 100
        : newUsersThisMonth > 0
          ? 100
          : 0;

    return {
      totalUsers,
      newUsersThisMonth,
      growthRate,
    };
  }
}

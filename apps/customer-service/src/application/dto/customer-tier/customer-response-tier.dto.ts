import { CustomerTierStatusEnum } from "apps/customer-service/src/domain/enums";

export class CustomerTierResponseDto {
  id: number;
  name: string;
  spendingThreshold: number;
  status: CustomerTierStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}
import { StoreStatusEnum, StoreTypeEnum } from "apps/inventory-service/src/domain/enums";

export class StoreResponseDto {
  id: number;
  name: string;
  shortName: string;
  address: string;
  status: StoreStatusEnum;
  type: StoreTypeEnum;
  siteCode: string;
  shipCode: string;
  phoneNumber: string;
  longitude: number;
  latitude: number;
  createdAt: Date;
  updatedAt: Date;
}
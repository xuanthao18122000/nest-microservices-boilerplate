import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
  
  @Expose()
  fullName: string;
  
  @Expose()
  phoneNumber: string;
  
  @Expose()
  address: string;
  
  @Expose()
  avatar: string;
  
  @Expose()
  status: number;
  
  @Expose()
  lastLogOutDate: string;
  
  @Expose()
  roleId: number;
  
  @Expose()
  creatorId: number;
  
  @Exclude()
  password: string;
  
  @Expose()
  createdAt: Date;
  
  @Expose()
  updatedAt: Date;
}

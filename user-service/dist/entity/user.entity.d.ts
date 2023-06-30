import { BaseEntity } from './base.entity';
export declare class User extends BaseEntity {
    email: string;
    password: string;
    fullName?: string;
    phoneNumber?: string;
    token: string;
    logs: object;
    gender?: number;
    address?: string;
    status: number;
    updatedAt: Date;
    constructor(data?: any);
    serialize(): {
        id: number;
        email: string;
        fullName: string;
        phoneNumber: string;
        gender: number;
        status: number;
    };
}

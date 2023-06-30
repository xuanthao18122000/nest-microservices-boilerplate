import { UsersService } from './user.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getHello(): string;
}

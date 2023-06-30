import { UsersModule } from "src/user/user.module";



export const Routes = [
  {
    path: 'api',
    children: [
      {
        path: 'users',
        module: UsersModule,
      },
    ],
  },
];
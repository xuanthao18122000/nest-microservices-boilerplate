import { OrdersModule } from "src/order/order.module";



export const Routes = [
  {
    path: 'api',
    children: [
      {
        path: 'orders',
        module: OrdersModule,
      },
    ],
  },
];
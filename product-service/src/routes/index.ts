import { ProductsModule } from "src/product/product.module";


export const Routes = [
  {
    path: 'api',
    children: [
      {
        path: 'products',
        module: ProductsModule,
      },
    ],
  },
];
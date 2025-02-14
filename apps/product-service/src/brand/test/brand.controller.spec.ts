import { Test, TestingModule } from '@nestjs/testing';
import { BrandController } from '../brand.controller';
import { BrandService } from '../brand.service';

describe('BrandController', () => {
  let brandController: BrandController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BrandController],
      providers: [BrandService],
    }).compile();

    brandController = app.get<BrandController>(BrandController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
    });
  });
});

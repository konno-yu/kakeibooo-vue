import { Test, TestingModule } from '@nestjs/testing';
import { FoodstaffsController } from './foodstaffs.controller';

describe('Foodstaffs Controller', () => {
  let controller: FoodstaffsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodstaffsController],
    }).compile();

    controller = module.get<FoodstaffsController>(FoodstaffsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { FoodstaffsService } from './foodstaffs.service';

describe('FoodstaffsService', () => {
  let service: FoodstaffsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodstaffsService],
    }).compile();

    service = module.get<FoodstaffsService>(FoodstaffsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

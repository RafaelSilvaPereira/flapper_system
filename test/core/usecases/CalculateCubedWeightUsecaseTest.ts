import { CalculateCubedWeight } from '../../../src/core/interfaces/CalculateCubedWeight';
import { CalculateCubedWeightUsecase } from '../../../src/core/usecases/CalculateCubedWeightUsecase';
import { LoadDimensionsModel } from '../../../src/core/models/LoadDimensionsModel';
import { Test, TestingModule } from '@nestjs/testing';

describe('CalculateCubedWeightUsecase Test', () => {
  let calculateCubedWeight: CalculateCubedWeight;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CalculateCubedWeight,
          useClass: CalculateCubedWeightUsecase,
        },
      ],
    }).compile();

    calculateCubedWeight = module.get<CalculateCubedWeight>(CalculateCubedWeight);
  });


  it('Expect when there is a load with 10 cm high, 6 cm deep and 100 cm width, the cubed weight is 1', async () => {

    expect(await calculateCubedWeight.calculate(new LoadDimensionsModel({
      heightCM: 10,
      dephtCM: 6,
      widthCM: 100,
      weightKG: 1,
    }))).toEqual({ value: 1 });

  });

  it('Expect when there is a load with 5 cm high, 6 cm deep and 100 cm width, the cubed weight is 1', async () => {

    expect(await calculateCubedWeight.calculate(new LoadDimensionsModel({
      heightCM: 5,
      dephtCM: 6,
      widthCM: 100,
      weightKG: 1,
    }))).toEqual({ value: 0.5 });

  });
});

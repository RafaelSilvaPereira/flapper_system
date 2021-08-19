import { LoadDimensionsModel } from '../../../src/core/models/LoadDimensionsModel';
import { CalculatePositionQuotationsCubedWeight } from '../../../src/core/interfaces/CalculatePositionQuotationsCubedWeight';
import { CalculatePositionQuotationsCubedWeightUsecase } from '../../../src/core/usecases/CalculatePositionQuotationsCubedWeightUsecase';
import { CalculateCubedWeight } from '../../../src/core/interfaces/CalculateCubedWeight';
import { PositionQuotationModel } from '../../../src/core/models/PositionQuotationModel';
import { TransportModel } from '../../../src/core/models/TransportModel';
import { CustomerModel } from '../../../src/core/models/CustomerModel';

import { Test, TestingModule } from '@nestjs/testing';
import { CubageWeightModel } from '../../../src/core/models/CubageWeightModel';

function getBuilderEntities() {
  const loadDimensionsModel = new LoadDimensionsModel({
    heightCM: 10,
    dephtCM: 10,
    widthCM: 60,
    weightKG: 20,
  });
  const transportModelCampinaGrandeToJoaoPessoa = new TransportModel({
    destinationCity: 'Campina Grande',
    originCity: 'João Pessoa',
  });
  const transportModelJoaoPessoaToCampinaGrande = new TransportModel({
    destinationCity: 'Joao Pessoa',
    originCity: 'Campina Grande',
  });
  const customerModel = new CustomerModel({
    phone: '+558398118811',
    email: 'rafael@gmaill.com',
    name: 'rafael',
  });
  return {
    loadDimensionsModel,
    transportModelCampinaGrandeToJoaoPessoa,
    transportModelJoaoPessoaToCampinaGrande,
    customerModel,
  };
}

describe('CalculatePositionQuotationsCubedWeighUsecase Test', () => {
  let calculatePositionQuotationsCubedWeight: CalculatePositionQuotationsCubedWeight;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CalculatePositionQuotationsCubedWeight,
          useClass: CalculatePositionQuotationsCubedWeightUsecase,
        },
        {
          provide: CalculateCubedWeight,
          useValue: {
            calculate: jest.fn().mockResolvedValue(new CubageWeightModel({ value: 10 })),
          },
        },
      ],
    }).compile();

    calculatePositionQuotationsCubedWeight = module.get<CalculatePositionQuotationsCubedWeight>(CalculatePositionQuotationsCubedWeight);
  });


  it('Tests that the call method of the CalculatePositionQuotationsCubedWeigh class returns a list of PositionQuotationModel where for each value is the result of the response of the calculate method of the CalculatePositionQuotationsCubedWeight class', async () => {

    const {
      loadDimensionsModel,
      transportModelCampinaGrandeToJoaoPessoa,
      transportModelJoaoPessoaToCampinaGrande,
      customerModel,
    } = getBuilderEntities();

    const beforeCalculateCubedWeightPositionsQuotationModel: PositionQuotationModel[] = [
      new PositionQuotationModel({
        transport: transportModelCampinaGrandeToJoaoPessoa,
        customer: customerModel,
        load: loadDimensionsModel,
      }),
      new PositionQuotationModel({
        transport: transportModelJoaoPessoaToCampinaGrande,
        customer: customerModel,
        load: loadDimensionsModel,
      }),
    ];


    const afterCalculateCubedWeightPositionQuotationModel = await calculatePositionQuotationsCubedWeight.call(...beforeCalculateCubedWeightPositionsQuotationModel);

    const expectedAfterCalculateCubedWeightPositionQuotationModel = [
      new PositionQuotationModel({
        transport: transportModelCampinaGrandeToJoaoPessoa,
        customer: customerModel,
        load: loadDimensionsModel,
        cubedWeight: 10,
      }),
      new PositionQuotationModel({
        transport: transportModelJoaoPessoaToCampinaGrande,
        customer: customerModel,
        load: loadDimensionsModel,
        cubedWeight: 10,
      }),
    ];


    expect(afterCalculateCubedWeightPositionQuotationModel.length).toEqual(expectedAfterCalculateCubedWeightPositionQuotationModel.length);

    for (let i = 0; i < expectedAfterCalculateCubedWeightPositionQuotationModel.length; i++) {
      expect(expectedAfterCalculateCubedWeightPositionQuotationModel[i]).toEqual(afterCalculateCubedWeightPositionQuotationModel[i]);
    }
  });

});

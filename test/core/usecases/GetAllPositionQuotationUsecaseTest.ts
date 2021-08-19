import { Test, TestingModule } from '@nestjs/testing';

import { GetAllPositionQuotationUsecase } from '../../../src/core/usecases/GetAllPositionQuotationUsecase';
import { GetAllPositionQuotationProtocol } from '../../../src/core/protocols/GetAllPositionQuotationProtocol';
import { GetAllPositionQuotation } from '../../../src/core/interfaces/GetAllPositionQuotation';
import { LoadDimensionsModel } from '../../../src/core/models/LoadDimensionsModel';
import { TransportModel } from '../../../src/core/models/TransportModel';
import { CustomerModel } from '../../../src/core/models/CustomerModel';
import { PositionQuotationModel } from '../../../src/core/models/PositionQuotationModel';

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
  const transportModelCampinaGrandeToSaoPaulo = new TransportModel({
    destinationCity: 'Campina Grande',
    originCity: 'São Paulo',
  });
  const customerModel = new CustomerModel({
    phone: '+558398118811',
    email: 'rafael@gmaill.com',
    name: 'rafael',
  });
  return [
    new PositionQuotationModel({
      createdById: '2',
      load: loadDimensionsModel,
      customer: customerModel,
      transport: transportModelCampinaGrandeToJoaoPessoa,
    }),
    new PositionQuotationModel({
      createdById: '1',
      load: loadDimensionsModel,
      customer: customerModel,
      transport: transportModelJoaoPessoaToCampinaGrande,
    }),
    new PositionQuotationModel({
      createdById: '2',
      load: loadDimensionsModel,
      customer: customerModel,
      transport: transportModelCampinaGrandeToSaoPaulo,
    }),
  ];
}

describe('GetAllPositionQuotation Test', () => {
  let getAllPositionQuotation: GetAllPositionQuotation;
  const positionQuotationModels = getBuilderEntities();

  beforeEach(
    async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: GetAllPositionQuotation,
            useClass: GetAllPositionQuotationUsecase,
          },
          {
            provide: GetAllPositionQuotationProtocol,
            useValue: {
              call: jest.fn().mockResolvedValue(positionQuotationModels),
            },
          },
        ],
      }).compile();

      getAllPositionQuotation = module.get<GetAllPositionQuotation>(GetAllPositionQuotation);
    },
  );

  it('It tests that when the GetAllPositionQuotation class\'s call method returns an Lists of instances of the PositionQuotationModel class', async () => {
    const foundedPositionQuotations = await getAllPositionQuotation.call();
    expect(foundedPositionQuotations).toBe(positionQuotationModels);
  });
});

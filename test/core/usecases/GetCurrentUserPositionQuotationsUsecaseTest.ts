import { Test, TestingModule } from '@nestjs/testing';

import { GetCurrentUserPositionQuotationsUsecase } from '../../../src/core/usecases/GetCurrentUserPositionQuotationsUsecase';
import { GetCurrentUserPositionQuotationsProtocol } from '../../../src/core/protocols/GetCurrentUserPositionQuotationsProtocol';
import { GetCurrentUserPositionQuotations } from '../../../src/core/interfaces/GetCurrentUserPositionQuotations';
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
      load: loadDimensionsModel,
      customer: customerModel,
      transport: transportModelCampinaGrandeToJoaoPessoa,
      createdById: '1',
    }),
    new PositionQuotationModel({
      createdById: '1',
      load: loadDimensionsModel,
      customer: customerModel,
      transport: transportModelJoaoPessoaToCampinaGrande,
    }),
    new PositionQuotationModel({
      createdById: '1',
      load: loadDimensionsModel,
      customer: customerModel,
      transport: transportModelCampinaGrandeToSaoPaulo,
    }),
  ];
}

describe('GetCurrentUserPositionQuotations Test', () => {
  let getCurrentUserPositionQuotations: GetCurrentUserPositionQuotations;
  const positionQuotationModels = getBuilderEntities();

  beforeEach(
    async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: GetCurrentUserPositionQuotations,
            useClass: GetCurrentUserPositionQuotationsUsecase,
          },
          {
            provide: GetCurrentUserPositionQuotationsProtocol,
            useValue: {
              call: jest.fn().mockResolvedValue(positionQuotationModels),
            },
          },
        ],
      }).compile();

      getCurrentUserPositionQuotations = module.get<GetCurrentUserPositionQuotations>(GetCurrentUserPositionQuotations);
    },
  );

  it('It tests that when the GetCurrentUserPositionQuotations class\'s call method returns an Lists of instances of the PositionQuotationModel class', async () => {
    const foundedPositionQuotations = await getCurrentUserPositionQuotations.call('1');
    expect(foundedPositionQuotations).toBe(positionQuotationModels);
  });
});

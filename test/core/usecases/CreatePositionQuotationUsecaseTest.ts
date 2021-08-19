import { Test, TestingModule } from '@nestjs/testing';

import { CreatePositionQuotationUsecase } from '../../../src/core/usecases/CreatePositionQuotationUsecase';
import { CreatePositionQuotationProtocol } from '../../../src/core/protocols/CreatePositionQuotationProtocol';
import { CreatePositionQuotation } from '../../../src/core/interfaces/CreatePositionQuotation';
import { LoadDimensionsModel } from '../../../src/core/models/LoadDimensionsModel';
import { TransportModel } from '../../../src/core/models/TransportModel';
import { CustomerModel } from '../../../src/core/models/CustomerModel';
import { PositionQuotationModel } from '../../../src/core/models/PositionQuotationModel';
import { BaseDatabaseModel } from '../../../src/core/models/BaseDatabaseModel';

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
  const customerModel = new CustomerModel({
    phone: '+558398118811',
    email: 'rafael@gmaill.com',
    name: 'rafael',
  });
  return new PositionQuotationModel({
      load: loadDimensionsModel,
      customer: customerModel,
      transport: transportModelCampinaGrandeToJoaoPessoa,
    });
}

describe('CreatePositionQuotation Test', () => {
  let createPositionQuoatation: CreatePositionQuotation;
  const toCreatePositionQuotation = getBuilderEntities();
  const baseDatabaseModel = new BaseDatabaseModel({
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date()
  });

  beforeEach(
    async () => {

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: CreatePositionQuotation,
            useClass: CreatePositionQuotationUsecase,
          },
          {
            provide: CreatePositionQuotationProtocol,
            useValue: {
              call: jest.fn().mockResolvedValue(baseDatabaseModel),
            },
          },
        ],
      }).compile();

      createPositionQuoatation = module.get<CreatePositionQuotation>(CreatePositionQuotation);
    },
  );

  it('It tests that when the CreatePositionQuotation class\'s call method returns an Lists of instances of the PositionQuotationModel class', async () => {
    const currentBaseDatabaseModel = await createPositionQuoatation.call(toCreatePositionQuotation);
    expect(currentBaseDatabaseModel).toBe(baseDatabaseModel);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CreatePositionQuotationProtocol } from '../../../src/core/protocols/CreatePositionQuotationProtocol';
import { BaseDatabaseModel } from '../../../src/core/models/BaseDatabaseModel';
import { CreatePositionQuotationRepositoryConnector } from '../../../src/adapters/connectors/CreatePositionQuotationRepositoryConnector';
import { PositionQuotationEntityModelConverter } from '../../../src/adapters/converters/PositionQuotationEntityModelConverter';
import { PositionQuotationRepository } from '../../../src/infra/database/repositories/PositionQuotationRepository';
import { CustomerRepository } from '../../../src/infra/database/repositories/CustomerRepository';
import { LoadDimensionsRepository } from '../../../src/infra/database/repositories/LoadDimensionsRepository';
import { TransportRepository } from '../../../src/infra/database/repositories/TransportRepository';
import { UserRepository } from '../../../src/infra/database/repositories/UserRepository';
import { LoadDimensionsEntity } from '../../../src/infra/database/entities/LoadDimensionsEntity';
import { TransportEntity } from '../../../src/infra/database/entities/TransportEntity';
import { CustomerEntity } from '../../../src/infra/database/entities/CustomerEntity';
import { PositionQuotationEntity } from '../../../src/infra/database/entities/PositionQuotationEntity';
import { UserEntity } from '../../../src/infra/database/entities/UserEntity';
import { LoadDimensionsModel } from '../../../src/core/models/LoadDimensionsModel';
import { TransportModel } from '../../../src/core/models/TransportModel';
import { CustomerModel } from '../../../src/core/models/CustomerModel';
import { PositionQuotationModel } from '../../../src/core/models/PositionQuotationModel';

function getBuilderEntities() {
  const loadDimensionEntity = generateMockSavedEntity(new LoadDimensionsEntity({
    data: {
      heightCM: 10,
      dephtCM: 10,
      widthCM: 60,
      weightKG: 20,
    },
  }));
  const transportModelCampinaGrandeToJoaoPessoaEntity = new TransportEntity({
    data: {
      destinationCity: 'Campina Grande',
      originCity: 'João Pessoa',
    },
  });
  const customerEntity = generateMockSavedEntity(new CustomerEntity({
    data: {
      phone: '+558398118811',
      email: 'rafael@gmaill.com',
      name: 'rafael',
    },
  }));
  const userEntity = generateMockSavedEntity(new UserEntity({
    data: {
      username: 'rafael',
      password: '1234',
      positionQuotations: [],
    },
  }));
  const positionQuotationEntity = generateMockSavedEntity(new PositionQuotationEntity({
    data: {
      load: loadDimensionEntity,
      customer: customerEntity,
      transport: transportModelCampinaGrandeToJoaoPessoaEntity,
      createdBy: userEntity,
    },
  }));
  return {
    loadDimensionEntity,
    transportModelCampinaGrandeToJoaoPessoaEntity,
    customerEntity,
    userEntity,
    positionQuotationEntity,
  };
}

function getPositionQuotationModel() {
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


function generateMockSavedEntity(entity: any) {
  const mock = Object.assign({
    id: '123',
    createdAt: new Date('Aug 9, 1995'),
    updatedAt: new Date('Aug 9, 1995'),
  }, entity);
  return mock;

}

describe('CreatePositionQuotationRepositoryConnector Test', () => {
  let createPositionQuoatation: CreatePositionQuotationProtocol;
  const {
    customerEntity,
    userEntity,
    positionQuotationEntity,
    loadDimensionEntity,
    transportModelCampinaGrandeToJoaoPessoaEntity,
  } = getBuilderEntities();

  const baseDatabaseModel = new BaseDatabaseModel({
    id: '123',
    createdAt: new Date('Aug 9, 1995'),
    updatedAt: new Date('Aug 9, 1995'),
  });

  beforeEach(
    async () => {

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: CreatePositionQuotationProtocol,
            useClass: CreatePositionQuotationRepositoryConnector,
          },
          {
            provide: PositionQuotationEntityModelConverter,
            useValue: { toEntity: jest.fn().mockResolvedValue(positionQuotationEntity) },
          },
          {
            provide: PositionQuotationRepository,
            useValue: { validateAndSave: jest.fn().mockResolvedValue(generateMockSavedEntity(positionQuotationEntity)) },
          },
          {
            provide: CustomerRepository,
            useValue: { validateAndSave: jest.fn().mockResolvedValue(generateMockSavedEntity(customerEntity)) },
          },
          {
            provide: LoadDimensionsRepository,
            useValue: { validateAndSave: jest.fn().mockResolvedValue(generateMockSavedEntity(loadDimensionEntity)) },
          },
          {
            provide: TransportRepository,
            useValue: { validateAndSave: jest.fn().mockResolvedValue(generateMockSavedEntity(transportModelCampinaGrandeToJoaoPessoaEntity)) },
          },
          {
            provide: UserRepository,
            useValue: { findOne: jest.fn().mockResolvedValue(generateMockSavedEntity(userEntity)) },
          },
        ],
      }).compile();

      createPositionQuoatation = module.get<CreatePositionQuotationProtocol>(CreatePositionQuotationProtocol);
    },
  );

  it('It tests that when the call method of the CreatePositionQuotationProtocol class returns an instance of the BaseDatabaseModel class', async () => {
    const currentBaseDatabaseModel = await createPositionQuoatation.call(getPositionQuotationModel());
    expect(currentBaseDatabaseModel).toEqual(baseDatabaseModel);
  });
});

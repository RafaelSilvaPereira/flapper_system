import { GetAllPositionQuotationProtocol } from '../../../src/core/protocols/GetAllPositionQuotationProtocol';
import { Test, TestingModule } from '@nestjs/testing';
import { UserCredentialsModel } from '../../../src/core/models/UserCredentialsModel';
import { UserEntity } from '../../../src/infra/database/entities/UserEntity';
import { GetAllPositionQuotationRepositoryConnector } from '../../../src/adapters/connectors/GetAllPositionQuotationRepositoryConnector';
import { PositionQuotationRepository } from '../../../src/infra/database/repositories/PositionQuotationRepository';
import { PositionQuotationEntity } from '../../../src/infra/database/entities/PositionQuotationEntity';
import { TransportEntity } from '../../../src/infra/database/entities/TransportEntity';
import { LoadDimensionsEntity } from '../../../src/infra/database/entities/LoadDimensionsEntity';
import { CustomerEntity } from '../../../src/infra/database/entities/CustomerEntity';
import { PositionQuotationModel } from '../../../src/core/models/PositionQuotationModel';
import { TransportModel } from '../../../src/core/models/TransportModel';
import { LoadDimensionsModel } from '../../../src/core/models/LoadDimensionsModel';
import { CustomerModel } from '../../../src/core/models/CustomerModel';
import { PositionQuotationEntityModelConverter } from '../../../src/adapters/converters/PositionQuotationEntityModelConverter';
import { CustomerEntityModelConverter } from '../../../src/adapters/converters/CustomerEntityModelConverter';
import { LoadDimensionsEntityModelConverter } from '../../../src/core/models/LoadDimensionsEntityModelConverter';
import { TransportEntityModelConverter } from '../../../src/adapters/converters/TransportEntityModelConverter';

describe('GetAllPositionQuotation Test', () => {

  const positionQuotationsEntities = [
    new PositionQuotationEntity(
      {
        generalData: {
          id: '123',
          createdAt: new Date('Aug 9, 1995'),
          updatedAt: new Date('Aug 9, 1995'),
        },
        data: {
          createdBy: new UserEntity({
            data: { username: 'rafael' }, generalData: {
              id: '123',
              createdAt: new Date('Aug 9, 1995'),
              updatedAt: new Date('Aug 9, 1995'),
            },
          }),
          transport: new TransportEntity({
            generalData: {
              id: '123',
              createdAt: new Date('Aug 9, 1995'),
              updatedAt: new Date('Aug 9, 1995'),
            },
            data: {
              originCity: 'Campina Grande',
              destinationCity: 'Senhor do Bonfim',
            },
          }),
          load: new LoadDimensionsEntity({
            data: { weightKG: 10, heightCM: 10, widthCM: 10, dephtCM: 10 }, generalData: {
              id: '123',
              createdAt: new Date('Aug 9, 1995'),
              updatedAt: new Date('Aug 9, 1995'),
            },
          }),
          customer: new CustomerEntity({
            data: { name: 'rafael', email: 'rafal@gmail.com', phone: '+558399573284' }, generalData: {
              id: '123',
              createdAt: new Date('Aug 9, 1995'),
              updatedAt: new Date('Aug 9, 1995'),
            },
          }),
        },
      },
    ),
  ];

  let getAllPositionQuotation: GetAllPositionQuotationProtocol;

  beforeEach(
    async () => {

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: GetAllPositionQuotationProtocol,
            useClass: GetAllPositionQuotationRepositoryConnector,
          },
          {
            provide: PositionQuotationRepository,
            useValue: {
              find: jest.fn().mockResolvedValue(positionQuotationsEntities),
            },
          },
          PositionQuotationEntityModelConverter,
          CustomerEntityModelConverter,
          LoadDimensionsEntityModelConverter,
          TransportEntityModelConverter,
        ],
      }).compile();

      getAllPositionQuotation = module.get<GetAllPositionQuotationProtocol>(GetAllPositionQuotationProtocol);
    });

  it('Tests that the call method of the GetAllPositionQuotationProtocol class returns a list of PositionQuotationModel', async () => {

    const foundedPositionQuotationsModel = await getAllPositionQuotation.call();

    const expectedResponse = [
      new PositionQuotationModel({
        id: '123',
        transport: new TransportModel({
          originCity: 'Campina Grande',
          destinationCity: 'Senhor do Bonfim',
          id: '123',
        }),
        load: new LoadDimensionsModel({ weightKG: 10, heightCM: 10, widthCM: 10, dephtCM: 10, id: '123' }),
        customer: new CustomerModel({ name: 'rafael', email: 'rafal@gmail.com', phone: '+558399573284', id: '123' }),
        createdById: '123',

      }),
    ];
    expect(foundedPositionQuotationsModel).toEqual(expectedResponse);
  });
});

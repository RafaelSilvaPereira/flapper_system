import { SavePositionQuotationProtocol } from '../../core/protocols/SavePositionQuotationProtocol';
import { PositionQuotationModel } from '../../core/models/PositionQuotationModel';
import { Injectable } from '@nestjs/common';
import { PositionQuotationRepository } from '../../infra/database/repositories/PositionQuotationRepository';
import { PositionQuotationEntityModelConverter } from '../converters/PositionQuotationEntityModelConverter';
import { CustomerRepository } from '../../infra/database/repositories/CustomerRepository';
import { LoadDimensionsRepository } from '../../infra/database/repositories/LoadDimensionsRepository';
import { TransportRepository } from '../../infra/database/repositories/TransportRepository';
import { PositionQuotationEntity } from '../../infra/database/entities/PositionQuotationEntity';
import { UserRepository } from '../../infra/database/repositories/UserRepository';

@Injectable()
export class SavePositionQuotationRepositoryConnector implements SavePositionQuotationProtocol {

  constructor(
    private readonly positionQuotationEntityModelConverter: PositionQuotationEntityModelConverter,
    private readonly positionQuotationRepository: PositionQuotationRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly loadDimensionsRepository: LoadDimensionsRepository,
    private readonly transportRepository: TransportRepository,
    private readonly userRepository: UserRepository,
  ) {
  }

  public async call(positionQuotationModel: PositionQuotationModel): Promise<PositionQuotationModel> {
    const convertedPositionQuotationEntity = await this.positionQuotationEntityModelConverter.toEntity(positionQuotationModel);


    const savedCustomer = await this.customerRepository.validateAndSave(convertedPositionQuotationEntity.customer);
    const savedTransport = await this.transportRepository.validateAndSave(convertedPositionQuotationEntity.transport);
    const savedLoadDimensions = await this.loadDimensionsRepository.validateAndSave(convertedPositionQuotationEntity.load);
    const currentUser = await this.userRepository.findOne(positionQuotationModel.createdById);

    const toSavedEntity = new PositionQuotationEntity({
      data: {
        customer: savedCustomer,
        load: savedLoadDimensions,
        transport: savedTransport,
        createdBy: currentUser,
      },
    });


    const savedPositionQuotation = await this.positionQuotationRepository.validateAndSave(toSavedEntity);


    return this.positionQuotationEntityModelConverter.toModel(savedPositionQuotation);
  }

}

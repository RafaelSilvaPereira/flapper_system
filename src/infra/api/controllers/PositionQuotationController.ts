import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PositionQuotationService } from '../../../adapters/services/PositionQuotationService';
import { PositionQuotationModel } from '../../../core/models/PositionQuotationModel';
import { JwtAuthGuard } from '../../guards/JwtAuthGuard';
import { GetCurrentUserId } from '../../decorators/GetCurrentUserId';
import { BaseDatabaseModel } from '../../../core/models/BaseDatabaseModel';

@Controller('position-quotation')
export class PositionQuotationController {

  constructor(
    private service: PositionQuotationService,
  ) {
  }


  @UseGuards(JwtAuthGuard)
  @Post()
  async save(@Body() model: PositionQuotationModel, @GetCurrentUserId() currentUserId: string): Promise<BaseDatabaseModel> {
    model.createdById = currentUserId;
    return this.service.save(model);
  }

  @Get()
  async getAll(): Promise<PositionQuotationModel[]> {
    return this.service.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  async getMyPositionQuotations( @GetCurrentUserId() id: string ): Promise<PositionQuotationModel[]>{
    return this.service.getMyPositionQuotations(id);
  }

}

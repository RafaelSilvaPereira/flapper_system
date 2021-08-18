import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { PositionQuotationService } from '../../../adapters/services/PositionQuotationService';
import { PositionQuotationModel } from '../../../core/models/PositionQuotationModel';
import { JwtAuthGuard } from '../../guards/JwtAuthGuard';
import { GetCurrentUserId } from '../../decorators/GetCurrentUserId';

@Controller('position-quotation')
export class PositionQuotationController {

  constructor(
    private service: PositionQuotationService,
  ) {
  }


  @UseGuards(JwtAuthGuard)
  @Post()
  async save(@Body() model: PositionQuotationModel, @GetCurrentUserId() currentUserId: string): Promise<PositionQuotationModel> {
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

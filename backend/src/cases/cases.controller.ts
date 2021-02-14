import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { ParseObjectIdPipe } from '../common/pipes/parseObjectId.pipe';
import { CasesService } from './cases.service';
import { ICD10_CONDITION_CODES } from './constants/conditions';
import { SetConditionLabelDto } from './dtos/setConditionLabel.dto';

@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('unlabeled')
  @ApiResponse({ status: 200, description: 'Earliest unlabeled case' })
  async getNextUnlabeled() {
    return this.casesService.getNextUnlabeled();
  }

  @UseGuards(JwtAuthGuard)
  // This could alternatively be a POST /:caseId/label
  @Put(':caseId')
  async setConditionLabel(
    @Param('caseId', new ParseObjectIdPipe()) caseId: string,
    @Req() req,
    @Body() conditionLabel: SetConditionLabelDto,
  ) {
    return this.casesService.setConditionLabel(
      Types.ObjectId(caseId),
      req.user._id,
      conditionLabel.code as typeof ICD10_CONDITION_CODES[number],
    );
  }
}

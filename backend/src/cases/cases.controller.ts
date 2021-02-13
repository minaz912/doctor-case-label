import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CasesService } from './cases.service';

@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Get('unlabeled')
  @ApiResponse({ status: 200, description: 'Earliest unlabeled case' })
  async getNextUnlabeled() {
    return this.casesService.getNextUnlabeled();
  }
}

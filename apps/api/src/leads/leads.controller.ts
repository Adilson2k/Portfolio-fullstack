import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { LeadsService } from './leads.service';
import { CreateLeadDto, UpdateLeadDto } from './dto/lead.dto';
import { LeadStatus } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@ApiTags('Leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo lead (contato público)' })
  @ApiResponse({ status: 201, description: 'Lead criado com sucesso' })
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.create(createLeadDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos os leads' })
  @ApiResponse({ status: 200, description: 'Lista de leads' })
  findAll() {
    return this.leadsService.findAll();
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter estatísticas dos leads' })
  @ApiResponse({ status: 200, description: 'Estatísticas dos leads' })
  getStats() {
    return this.leadsService.getStats();
  }

  @Get('recent')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter leads recentes' })
  @ApiResponse({ status: 200, description: 'Leads recentes' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findRecent(@Query('limit') limit?: string) {
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    return this.leadsService.findRecent(limitNumber);
  }

  @Get('status/:status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar leads por status' })
  @ApiResponse({ status: 200, description: 'Leads com o status especificado' })
  findByStatus(@Param('status') status: LeadStatus) {
    return this.leadsService.findByStatus(status);
  }

  @Get('source/:source')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar leads por fonte' })
  @ApiResponse({ status: 200, description: 'Leads da fonte especificada' })
  findBySource(@Param('source') source: string) {
    return this.leadsService.findBySource(source);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter lead específico' })
  @ApiResponse({ status: 200, description: 'Detalhes do lead' })
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar status do lead' })
  @ApiResponse({ status: 200, description: 'Lead atualizado com sucesso' })
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadsService.update(id, updateLeadDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover lead' })
  @ApiResponse({ status: 200, description: 'Lead removido com sucesso' })
  remove(@Param('id') id: string) {
    return this.leadsService.remove(id);
  }
}
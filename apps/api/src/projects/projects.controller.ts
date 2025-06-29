import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';


@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar novo projeto' })
  @ApiResponse({ status: 201, description: 'Projeto criado com sucesso' })
  create(@Request() req, @Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(req.user.id, createProjectDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar projetos do usuário' })
  @ApiResponse({ status: 200, description: 'Lista de projetos' })
  findAll(@Request() req) {
    return this.projectsService.findAll(req.user.id);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Listar projetos em destaque' })
  @ApiResponse({ status: 200, description: 'Projetos em destaque' })
  @ApiQuery({ name: 'userId', required: false, description: 'ID do usuário' })
  findFeatured(@Query('userId') userId?: string) {
    return this.projectsService.findFeatured(userId);
  }

  @Get('technology/:tech')
  @ApiOperation({ summary: 'Buscar projetos por tecnologia' })
  @ApiResponse({ status: 200, description: 'Projetos que usam a tecnologia' })
  findByTechnology(@Param('tech') technology: string) {
    return this.projectsService.findByTechnology(technology);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter projeto específico' })
  @ApiResponse({ status: 200, description: 'Detalhes do projeto' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.projectsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar projeto' })
  @ApiResponse({ status: 200, description: 'Projeto atualizado com sucesso' })
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, req.user.id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover projeto' })
  @ApiResponse({ status: 200, description: 'Projeto removido com sucesso' })
  remove(@Param('id') id: string, @Request() req) {
    return this.projectsService.remove(id, req.user.id);
  }

  @Get('ping')
  @ApiOperation({ summary: 'Testar se a API está ativa' })
  @ApiResponse({ status: 200, description: 'Resposta de ping' })
  ping() {
    return { message: 'API de projetos está no ar' };
  }
}
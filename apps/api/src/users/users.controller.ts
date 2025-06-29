import { 
  Controller, 
  Get, 
  Put, 
  Body, 
  UseGuards, 
  Request,
  Param 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter perfil do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil do usuário' })
  async getProfile(@Request() req) {
    return this.usersService.getProfile(req.user.id);
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar perfil do usuário' })
  @ApiResponse({ status: 200, description: 'Perfil atualizado com sucesso' })
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @Get(':id/public')
  @ApiOperation({ summary: 'Obter perfil público do usuário' })
  @ApiResponse({ status: 200, description: 'Perfil público do usuário' })
  async getPublicProfile(@Param('id') id: string) {
    return this.usersService.getPublicProfile(id);
  }
}
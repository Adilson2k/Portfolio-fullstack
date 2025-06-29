import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LeadStatus } from '@prisma/client';

export class CreateLeadDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  source?: string;
}

export class UpdateLeadDto {
  @ApiProperty({ enum: LeadStatus, required: false })
  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  source?: string;
}
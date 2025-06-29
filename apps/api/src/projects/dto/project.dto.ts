import { IsString, IsOptional, IsBoolean, IsArray, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectStatus } from '@prisma/client';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  longDescription?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  technologies: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  githubUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  liveUrl?: string;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiProperty({ enum: ProjectStatus, default: ProjectStatus.COMPLETED })
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class UpdateProjectDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  longDescription?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologies?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  githubUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  liveUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiProperty({ enum: ProjectStatus, required: false })
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
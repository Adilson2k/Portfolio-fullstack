import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto, UpdateLeadDto } from './dto/lead.dto';
import { LeadStatus } from '@prisma/client';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  async create(createLeadDto: CreateLeadDto) {
    return this.prisma.lead.create({
      data: createLeadDto,
    });
  }

  async findAll() {
    return this.prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      throw new NotFoundException('Lead não encontrado');
    }

    return lead;
  }

  async update(id: string, updateLeadDto: UpdateLeadDto) {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      throw new NotFoundException('Lead não encontrado');
    }

    return this.prisma.lead.update({
      where: { id },
      data: updateLeadDto,
    });
  }

  async remove(id: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      throw new NotFoundException('Lead não encontrado');
    }

    await this.prisma.lead.delete({
      where: { id },
    });

    return { message: 'Lead removido com sucesso' };
  }

  async getStats() {
    const [total, newLeads, inProgress, converted, closed] = await Promise.all([
      this.prisma.lead.count(),
      this.prisma.lead.count({ where: { status: LeadStatus.NEW } }),
      this.prisma.lead.count({ where: { status: LeadStatus.IN_PROGRESS } }),
      this.prisma.lead.count({ where: { status: LeadStatus.CONVERTED } }),
      this.prisma.lead.count({ where: { status: LeadStatus.CLOSED } }),
    ]);

    return {
      total,
      new: newLeads,
      inProgress,
      converted,
      closed,
      conversionRate: total > 0 ? ((converted / total) * 100).toFixed(2) : '0.00',
    };
  }

  async findByStatus(status: LeadStatus) {
    return this.prisma.lead.findMany({
      where: { status },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findRecent(limit: number = 10) {
    return this.prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async findBySource(source: string) {
    return this.prisma.lead.findMany({
      where: { source },
      orderBy: { createdAt: 'desc' },
    });
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        avatar: true,
        linkedin: true,
        github: true,
        website: true,
        phone: true,
        location: true,
        skills: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        avatar: true,
        linkedin: true,
        github: true,
        website: true,
        phone: true,
        location: true,
        skills: true,
        updatedAt: true,
      },
    });
  }

  async getProfile(id: string) {
    return this.findById(id);
  }

  async getPublicProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        bio: true,
        avatar: true,
        linkedin: true,
        github: true,
        website: true,
        location: true,
        skills: true,
        projects: {
          where: { featured: true },
          select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
            technologies: true,
            githubUrl: true,
            liveUrl: true,
            status: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 6,
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }
}
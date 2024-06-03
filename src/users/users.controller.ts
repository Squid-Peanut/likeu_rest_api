import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.getUsers();
  }
  @Get('id/:providerId')
  async getUser_id(@Param('providerId') providerId) {
    return await this.usersService.getUser_id(providerId);
  }

  @Get('data/:providerId')
  async getUser_data(@Param('providerId') providerId) {
    const parameter = 'date';
    return await this.usersService.getUser_detail(providerId, parameter);
  }
  @Get('data/similarity_per_date/:providerId')
  async getUser_similarity_per_date(@Param('providerId') providerId) {
    const parameter = 'similarity_per_date';
    return await this.usersService.getUser_detail(providerId, parameter);
  }

  @Get('data/similarity_per_date/date/:providerId')
  async getUser_date(@Param('providerId') providerId) {
    const parameter = 'date';
    return await this.usersService.getUser_detail(providerId, parameter);
  }

  @Get('data/similarity_per_date/similarity/:providerId')
  async getUser_similarity(@Param('providerId') providerId) {
    const parameter = 'similarity';
    return await this.usersService.getUser_detail(providerId, parameter);
  }

  @Get('data/star_player/:providerId')
  async getUser_star_player(@Param('providerId') providerId) {
    const parameter = 'star_player';
    return await this.usersService.getUser_detail(providerId, parameter);
  }
}

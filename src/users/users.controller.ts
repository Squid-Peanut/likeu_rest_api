import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(
    @Query('id') id: string,
    @Query('description') description: string,
    @Query('price') price: number,
  ) {
    if (id != undefined && description == undefined && price == undefined)
      return this.usersService.getUser_id(id);
    else if (id == undefined && description != undefined && price == undefined)
      return this.usersService.getUser_description(description);
    else if (id == undefined && description == undefined && price != undefined)
      return this.usersService.getUser_price(price);
    else if (id == undefined && description != undefined && price != undefined)
      return this.usersService.getUser_description_price(description, price);
    else return this.usersService.getUsers();
  }
}

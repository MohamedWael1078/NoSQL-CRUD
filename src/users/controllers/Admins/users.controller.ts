import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../../services/Admins/users.service';
import { CreateUserDto } from '../../Dtos/Admins/createUser.dto';
import { UpdateUserDto } from '../../Dtos/Admins/updateUser.dto';
import { Roles } from '../../guards/roles.decorator';
import { UsersGuard } from 'src/users/guards/users.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // @Desc Get All Users
  // @Route Get /users
  //@access [Admin, manager] 
  @Roles(['admin', 'manager'])
  @UseGuards(UsersGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // @Desc Get User By Id
  // @Route Get /users/:id
  //@access [Admin, manager] 
  @Roles(['admin', 'manager'])
  @Get(':id')
  getUserById(@Param("id") id: string) {
    return this.usersService.getUserById(id);
  }

  // @Desc Create New User 
  // @Route Post /users
  //@access [Admin] 
  @Roles(['admin'])
  @Post()
  createUser(@Body(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
   body: CreateUserDto) {
    return this.usersService.createUser(body);
    }

    // @Desc Update User 
    // @Route Patch /users/:id
    //@access [Admin, manager] 
    @Roles(['admin', 'manager'])
    @Patch(`:id`)
    updateUser(@Param('id') id: string, 
    @Body(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
     body: UpdateUserDto) {
      return this.usersService.updateUser(id, body);
    }

    // @Desc Delete User 
    // @Route Delete /users/:id
    //@access private [Admin] 
    @Roles(['admin'])
    @Delete(":id")
    deleteUser(@Param('id') id: string){
      return this.usersService.deleteUser(id);
    }

}

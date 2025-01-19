import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../Dtos/createUser.dto';
import { UpdateUserDto } from '../Dtos/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // @Desc Get All Users
  // @Route Get /users
  //@access Public 
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // @Desc Get User By Id
  // @Route Get /users/:id
  //@access Public
  @Get(':id')
  getUserById(@Param("id") id: string) {
    return this.usersService.getUserById(id);
  }

  // @Desc Create New User 
  // @Route Post /users
  //@access Public
  @Post()
  createUser(@Body(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
   body: CreateUserDto) {
    return this.usersService.createUser(body);
    }

    // @Desc Update User 
    // @Route Patch /users/:id
    //@access Public
    @Patch(`:id`)
    updateUser(@Param('id') id: string, 
    @Body(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
     body: UpdateUserDto) {
      return this.usersService.updateUser(id, body);
    }

    // @Desc Delete User 
    // @Route Delete /users/:id
    //@access public
    @Delete(":id")
    deleteUser(@Param('id') id: string){
      return this.usersService.deleteUser(id);
    }

}

import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Users } from '../interfaces/users.interface';
import { CreateUserDto } from '../Dtos/createUser.dto';
import { UpdateUserDto } from '../Dtos/updateUser.dto';
@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_MODEL')
        private usersModel: Model<Users>,
      ) {}

      async getAllUsers(): Promise<{data: Users[];
        count: number; 
        status: number;
        }> {
        const users = await this.usersModel.find()
        .select('firstName lastName email');
        return {data: users, count: users.length, status: 200};
      }

      async getUserById(id: string): Promise<
      {data: Users;
      status: number;
      }> {
        const user = await this.usersModel.findById(id)
        .select('firstName lastName email');
        if (!user) {
          throw new HttpException('User not found', 404);
        }
        return {data: user, status: 200};
      }

      async createUser(body:CreateUserDto): Promise<Users> {
        const newUser = await this.usersModel.create(body);
        return newUser.save();
      }

      async updateUser(id: string, body: UpdateUserDto): Promise<Users> {
        const user = await this.usersModel.findByIdAndUpdate(id, body, { new: true });
        if (!user) {
          throw new HttpException('User not found', 404);
        };
        return user;
      }

      async deleteUser(id: string): Promise<string> {
        const user = await this.usersModel.findByIdAndDelete(id);
        if (!user) {
          throw new HttpException('User not found', 404);
        };
      return  'User deleted successfully';
      }
    }

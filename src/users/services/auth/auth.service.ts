import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { signInDto, signUpDto } from "src/users/Dtos/auth/Auth.dto";
import { Users } from "src/users/interfaces/users.interface";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @Inject('USERS_MODEL')
        private usersModel: Model<Users>,
        private jwtService: JwtService,
      ) {} 
      
      async signUp(body: signUpDto): Promise<{data: Users, token: string}> {
        // hash password
        const password = await bcrypt.hash(body.password, 10);
        const newUser =  {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password,
            role: 'user',
        }
        const payload = {email: newUser.email, role:newUser.role};
        const token = await this.jwtService.sign(payload,
          {secret: process.env.JWT_SECRET});
        const user = await this.usersModel.create(newUser);
        return {data: user, token};
      };
      
      async signIn(body: signInDto): Promise<{data: Users, token: string}> {
        const {email, password} = body;
        const user = await this.usersModel.findOne({email})
        if (!user) {
          throw new NotFoundException('User not found'); 
        } 
        const hashPassword = user.password;
        const isMatch = await bcrypt.compare(password, hashPassword);
        console.log(isMatch);
        
        if (!isMatch) {
          throw new NotFoundException('Invalid credentials');
        }
        // Create token by payload
        const payload = {email: user.email, role:user.role};
        const token = await this.jwtService.sign(payload,
          {secret: process.env.JWT_SECRET});
        return {data: user, token};
      };
}
    
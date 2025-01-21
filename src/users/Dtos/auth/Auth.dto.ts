import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class signInDto {
    @IsEmail({},{message: 'Invalid email'})
    email: string;
    @IsString()
    @MinLength(8,{message: 'Password must be at least 8 characters'})
    @MaxLength(20,{message: 'Password must be at most 20 characters'})
    password: string;
}

export class signUpDto {
    @IsEmail({},{message: 'Invalid email'})
    email: string;
    @IsString()
    @MinLength(8,{message: 'Password must be at least 8 characters'})
    @MaxLength(20,{message: 'Password must be at most 20 characters'})
    password: string;
    @IsString()
    firstName: string;
    @IsString()
    lastName: string;
}
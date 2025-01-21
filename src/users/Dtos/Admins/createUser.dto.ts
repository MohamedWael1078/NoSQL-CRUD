import { IsEAN, IsEmail, IsEnum, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString({message: "First Name must be a string"})
    readonly firstName: string;
    @IsString({message: "Last Name must be a string"})
    readonly lastName: string;
    @IsEmail({}, {message: "Email must be a valid email"})
    readonly email: string;
    @IsString({message: "Password must be a string"})
    @MinLength(6, {message: "Password must be at least 6 characters"})
    @MaxLength(20, {message: "Password must be at most 20 characters"})
    readonly password: string;
    @IsEnum(['admin', 'manager', 'user'], {message: "Role must be either admin, manager or user"})  
    readonly role : string;

}
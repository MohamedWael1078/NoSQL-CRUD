import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @IsString({message: "First Name must be a string"})
    readonly firstName: string;
    @IsString({message: "Last Name must be a string"})
    readonly lastName: string;
    @IsEmail({}, {message: "Email must be a valid email"})
    readonly email: string;
}
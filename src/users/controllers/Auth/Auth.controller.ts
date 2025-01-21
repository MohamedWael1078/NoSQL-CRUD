import { Body, Controller, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { signInDto, signUpDto } from "src/users/Dtos/auth/Auth.dto";
import { AuthService } from "src/users/services/auth/auth.service";

@Controller('sign-in')
//@UseGuards(UsersGuard)
export class authSignInController {
    constructor(private readonly authService: AuthService) {}
    
    @Post()
    signIn(@Body(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
     body: signInDto) {
        return this.authService.signIn(body);
    }
}

@Controller('sign-up')
export class authSignUpController {
    constructor(private readonly authService: AuthService) {}
    
    @Post()
    signUp(@Body(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
    body: signUpDto )  {
       return this.authService.signUp(body);
        } 
}
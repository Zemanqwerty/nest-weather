import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from 'src/dto/auth/login.dto';
import { RegistrationDto } from 'src/dto/auth/registration.dto';
import { User } from 'src/entity/user.entity';
// import { Token } from 'src/entity/token.entity';
// import { TokenService } from 'src/services/token.service';
import { AuthGuard } from 'src/middleware/auth.middleware';
import { ReturnDto } from 'src/dto/auth/loginReturn.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegReturnDto } from 'src/dto/auth/registrationReturn.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Login" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: ReturnDto})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @Post('login')
  async userLogin(@Body() userData: LoginDto): Promise<ReturnDto> {
    try {
      return await this.authService.login(userData);
    } catch (e) {
      return e
    }
  }

  @ApiOperation({ summary: "Create new account" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: RegReturnDto})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @Post('registration')
  async userRegistration(@Body() userData: RegistrationDto): Promise<RegReturnDto> {
    try {
      return await this.authService.registration(userData);
    } catch (e) {
      return e
    }
  }
}

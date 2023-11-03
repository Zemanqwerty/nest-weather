import { Body, Controller, ExecutionContext, Get, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from 'src/dto/auth/login.dto';
import { RegistrationDto } from 'src/dto/auth/registration.dto';
import { User } from 'src/entity/user.entity';
// import { Token } from 'src/entity/token.entity';
// import { TokenService } from 'src/services/token.service';
import { AuthGuard } from 'src/middleware/auth.middleware';
import { GetWeatherDto } from 'src/dto/weather/weather.dto';
import { WeatherService } from 'src/services/weather.service';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Actions } from 'src/entity/actions.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';


@ApiTags('WeatherAPI')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get current weather" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success"})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiBearerAuth('JWT-auth')
  @Post('current')
  async getWeather(@Req() request: Request, @Body() requestData: GetWeatherDto): Promise<Observable<AxiosResponse>> {
    try {
      return await this.weatherService.getWeather(requestData, request['user']);
    } catch (e) {
      return e
    }
  }

  @Get('all')
  async all(): Promise<Actions[]> {
    return await this.weatherService.all();
  }
}

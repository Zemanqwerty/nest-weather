import { ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity'
import { RegistrationDto } from 'src/dto/auth/registration.dto';
import { hash, compare } from 'bcryptjs';
// import { TokenService } from './token.service';
import { PayloadDto } from 'src/dto/jwt/payload.dto';
import { LoginDto } from 'src/dto/auth/login.dto';
import { JwtService } from '@nestjs/jwt';
import { GetWeatherDto } from 'src/dto/weather/weather.dto';
import { Actions } from 'src/entity/actions.entity';
import { AuthService } from './auth.service';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Observable, lastValueFrom, map, tap } from 'rxjs';


@Injectable()
export class WeatherService {
  constructor(
  private userService: AuthService,
  private httpService: HttpService,
  @InjectRepository(Actions)
    private actionsRepository: Repository<Actions>,
  ) {}

  async getWeather(requestData: GetWeatherDto, userData: any): Promise<Observable<AxiosResponse<any>>> {
    const user = await this.userService.getUserById(userData.sub);
    const userApiToken = user.apiToken;
    
    if (requestData.language === undefined) {
        requestData.language = 'ru'
    }

    if (userApiToken !== requestData.apiToken) {
        throw new HttpException(`Incorrect API token`, HttpStatus.BAD_REQUEST);
    }

    const weatherApiToken = process.env.WEATHER_API_KEY;


    const response = await axios({
          method: 'GET',
          url: `http://api.weatherapi.com/v1/current.json?key=${weatherApiToken}&q=${requestData.city}&aqi=no&lang=${requestData.language}`,
        }).catch(async (e) => {
            const weatherData = this.actionsRepository.create({
                action_time: Math.floor(Date.now() / 1000),
                request_result: e.response.status,
                temp_c: null,
                user: user
            });
        
            await this.actionsRepository.save(weatherData);
            throw new HttpException('ApiError', e.response.status);
        });
    
    const weatherData = this.actionsRepository.create({
        action_time: Math.floor(Date.now() / 1000),
        request_result: response.status,
        temp_c: response.data.current.temp_c,
        user: user
    });

    await this.actionsRepository.save(weatherData);
    

    return response.data;
  }

  async all(): Promise<Actions[]> {
    return await this.actionsRepository.find();
  }
}

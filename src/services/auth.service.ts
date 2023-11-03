import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity'
import { RegistrationDto } from 'src/dto/auth/registration.dto';
import { hash, compare } from 'bcryptjs';
// import { TokenService } from './token.service';
import { PayloadDto } from 'src/dto/jwt/payload.dto';
import { LoginDto } from 'src/dto/auth/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ReturnDto } from 'src/dto/auth/loginReturn.dto';
import { RegReturnDto } from 'src/dto/auth/registrationReturn.dto';


@Injectable()
export class AuthService {
  constructor(
  // private tokenService: TokenService,
  private jwtService: JwtService,
  @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async login(userData: LoginDto): Promise<ReturnDto> {
    const user = await this.usersRepository.findOneBy({login: userData.login});

    if (!user) {
      throw new HttpException(`Incorrect login or password`, HttpStatus.BAD_REQUEST)
    }

    if (!compare(user.password, userData.password)) {
      throw new HttpException(`Incorrect login or password`, HttpStatus.BAD_REQUEST)
    }
    const payload = { sub: user.id, username: user.login };
    try {
      const accessToken = await this.jwtService.signAsync(payload)

      return {
        fio: user.fio,
        apiToken: user.apiToken,
        accessToken: accessToken,
      }
    } catch (e) {
      console.log(e);
    }
  }

  async registration(userData: RegistrationDto): Promise<RegReturnDto> {
    const condidate = await this.usersRepository.findOneBy({ login: userData.login });

    if (condidate) {
      throw new HttpException(`User ${userData.login} already created`, HttpStatus.BAD_REQUEST);
    }

    userData.password = await hash(userData.password, 3);

    const user = this.usersRepository.create(userData);
    await this.usersRepository.save(user);

    return {
      fio: user.fio,
      apiToken: user.apiToken,
    }
  }

  async getUserById(userId: number): Promise<User> {
    return await this.usersRepository.findOneBy({id: userId});
  }
}

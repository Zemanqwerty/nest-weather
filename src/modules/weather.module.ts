import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// import { TokenService } from 'src/services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { Actions } from 'src/entity/actions.entity';
import { WeatherService } from 'src/services/weather.service';
import { WeatherController } from 'src/controllers/weather.controller';
import { UsersModule } from './users.module';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [TypeOrmModule.forFeature([Actions]),
    UsersModule,
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  providers: [WeatherService],
  controllers: [WeatherController],
//   exports: [TypeOrmModule],
})
export class WeatherModule {}
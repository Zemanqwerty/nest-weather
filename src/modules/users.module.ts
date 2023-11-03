import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { User } from '../entity/user.entity';
import { ConfigModule } from '@nestjs/config';
// import { TokenService } from 'src/services/token.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([User]),
    // TokenModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    JwtModule.register({
        global: true,
        secret: process.env.JWT_ACCESS_SECRET_KEY,
        signOptions: { expiresIn: '30m' },
      }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class UsersModule {}
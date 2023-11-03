import {
    validate,
    validateOrReject,
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max,
    IsNotEmpty,
    Matches,
  } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegistrationDto {
    @ApiProperty({ description: "User login", nullable: false })
    @IsNotEmpty()
    login: string;

    @ApiProperty({ description: "User password", nullable: false })
    @IsNotEmpty()
    @Length(6, 254)
    // @Contains()
    @Matches('[.,!_]', undefined)
    password: string;

    @IsNotEmpty()
    @ApiProperty({ description: "User FIO", nullable: false })
    fio: string;
}
import {
    Length,
    IsNotEmpty,
    Matches,
} from '@nestjs/class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({ description: "User login", nullable: false })
    @IsNotEmpty()
    login: string;

    @ApiProperty({ description: "User password", nullable: false })
    @IsNotEmpty()
    password: string;
}
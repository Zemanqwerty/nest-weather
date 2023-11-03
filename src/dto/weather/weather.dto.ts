import { IsNotEmpty } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetWeatherDto {
    @ApiProperty({ description: "User API token", nullable: false })
    @IsNotEmpty()
    apiToken: string;

    @ApiProperty({ description: "City for get current weather", nullable: false })
    @IsNotEmpty()
    city: string;

    @ApiProperty({ description: "Response language", nullable: false })
    language: string;
}
import { ApiProperty } from "@nestjs/swagger";

export class RegReturnDto {
    @ApiProperty({ description: "User F I O", nullable: false })
    fio: string;

    @ApiProperty({ description: "User API token", nullable: false })
    apiToken: string;
}
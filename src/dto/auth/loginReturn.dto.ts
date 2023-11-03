import { ApiProperty } from "@nestjs/swagger";

export class ReturnDto {
    @ApiProperty({ description: "User F I O", nullable: false })
    fio: string;

    @ApiProperty({ description: "User API token", nullable: false })
    apiToken: string;

    @ApiProperty({ description: "Access token for authorization", nullable: false })
    accessToken: string;
}
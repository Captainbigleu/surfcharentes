import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateArticleDto {

    @ApiProperty()
    @IsString()
    spot: string;

    @ApiProperty()
    @IsString()
    content: string;


}

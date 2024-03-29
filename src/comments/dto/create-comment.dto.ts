import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Length } from "class-validator";

export class CreateCommentDto {

    @ApiProperty()
    @IsString()
    @Length(1, 5000)
    content: string

    @ApiProperty()
    @IsInt()
    article_id: number
}

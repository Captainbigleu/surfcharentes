import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ["pseudo"])) { } /* OmitType car on ne veut pas update le pseudo */

/* PartialType prend toute la CreateUserDto et met le tout en optionnel pour UpdateUserDto */
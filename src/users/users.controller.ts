import {
  Controller,
  UseInterceptors,
  Request,
  Post,
  Body,
  Patch,
  ConflictException,
  UseGuards,
  NotFoundException,
  Get,
  Bind,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PromoAdminDto } from './dto/promo-admin.dto';
import { User } from './entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { GetAdmin } from 'src/auth/get-admin.decorator';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guards';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('users') /* Pour swagger */
@Controller('users') /* Nestjs */
/* Possibilité de mettre ici le ClassSerializerInterceptor pour toute la class UsersController si nécessaire */
export class UsersController {
  constructor(
    private readonly usersService: UsersService /* Constructor de la classe UsersController */,
  ) { }

  /** S'ENREGISTRER */

  @UseInterceptors(
    ClassSerializerInterceptor,
  ) /* Cache le mot de passe pour toute cette requête */
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const mailExist = await this.usersService.findOneByMail(
      createUserDto.email,
    ); /* Compare l'email de l'utilisateur, existe-t-il déjà ? */

    if (mailExist) {
      throw new ConflictException('Ce mail est déjà enregistré, veuillez en changer svp.'); /* Nest */
    }

    const pseudoExist = await this.usersService.findOneByPseudo(
      createUserDto.pseudo,
    ); /* Compare le pseudonyme de l'utilisateur, existe-t-il déjà ? */


    if (pseudoExist)
      throw new ConflictException('Ce pseudo est déjà enregistré, veuillez en changer svp.');

    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      10,
    ); /* Crypte le mot de passe */

    const data = await this.usersService.create(
      createUserDto,
    ); /* Créé le nouvel utilisateur */
    return {
      message: `${createUserDto.pseudo} a bien été enregistré` /* Concatenation d'une variable dans un string littéral */,
      data: data /* Renvoie la data sans le mot de passe évidemment */,
    };
  }

  /** SE LOGIN = dans le auth.controller.ts */

  /** S'UPDATE */

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ) {
    /* Exemple d'une nouvelle méthode plus rapide pour cette requête avec @GetUser() user : User */
    if (user !== null) {
      /* Vérification de l'existance */
      /* if (updateUserDto.password)
        updateUserDto.password = await bcrypt.hash(
          updateUserDto.password,
          10,
        ); */ /* Crypte le nouveau mot de passe s'il est changé dans le front (via Dto) */

      const updateUser = await this.usersService.updateUser(
        user.id,
        updateUserDto,
      ); /* Attente du UsersService */
      return {
        message: 'Votre modification a bien été enregistrée',
        data: updateUser /* Data totale modifiée */,
      };
    }
  }

  /** Pour que l'adninistrateur TROUVE tous les utilisateurs */

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('findallusers')
  async findAll(@GetAdmin() _: User) {
    const data = await this.usersService.findAllUsers();

    return {
      message: 'Liste exhaustive de tous les utilisateurs.',
      data: data,
    };
  }

  /** Pour être PROMOTE par l'administrateur */

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Patch('promote/:id')
  @Bind(Param('id', new ParseIntPipe()))
  async promoAdmin(
    @Param('id') id: string,
    @Body() promoteAdminDto: PromoAdminDto,
    @Request() req: any,
  ) {
    /* @Request = ancienne méthode à remplacer par @Get */
    const userData = req.user;
    if (userData.access_level < 1)
      throw new UnauthorizedException('Accès non autorisé, vous n`êtes pas administrateur.');

    const updateUser = await this.usersService.promoteUser(
      promoteAdminDto,
      +id,
    ); /* Promeut un utilisateur grâce à UsersService */

    if (updateUser === null)
      throw new NotFoundException("L'utilisateur recherché n'existe pas");

    return {
      message: `${updateUser.pseudo} est passé au niveau d'acces ${updateUser.access_level}`,
      data: updateUser,
    };
  }
}


/* @Post()
create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}

@Get()
findAll() {
  return this.usersService.findAll();
}

@Get(':id')
findOne(@Param('id') id: string) {
  return this.usersService.findOne(+id);
}

@Patch(':id')
update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  return this.usersService.update(+id, updateUserDto);
}

@Delete(':id')
remove(@Param('id') id: string) {
  return this.usersService.remove(+id);
}
} */

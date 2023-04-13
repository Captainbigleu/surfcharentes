import { ApiProperty } from "@nestjs/swagger";
import { Article } from "src/articles/entities/article.entity";
import { User } from "src/users/entities/user.entity";
import { UsersController } from "src/users/users.controller";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('skills')
export class Skill extends BaseEntity {


    @ApiProperty()
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number

    @ApiProperty()
    @Column({ name: 'name', type: 'varchar' })
    name: string;

    @ApiProperty()
    @Column({ name: 'level', type: 'varchar' })
    level: string;

    @ManyToMany(() => User, (user) => user.skills)
    users: User[];

    @ManyToMany(() => Article, (article) => article.skills)
    articles: Article[]


}


import { Entity, Unique, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Article } from "src/articles/entities/article.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Skill } from "src/skills/entities/skill.entity";


@Entity('users')
@Unique(['pseudo', 'email'])
export class User extends BaseEntity {

    @ApiProperty() /*Pour swagger*/
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @ApiProperty()
    @Column({ name: 'pseudo', type: 'varchar' })
    pseudo: string;

    @ApiProperty()
    @Column({ name: 'email', type: 'varchar' })
    email: string;

    @ApiProperty()
    @Column({ name: 'password', type: 'varchar' })
    password: string;

    @ManyToMany(() => Article, (article) => article.users)
    articles: Article[];

    @ManyToMany(() => Comment, (comment) => comment.users)
    comments: Comment[];

    @ManyToMany(() => Skill, (skill) => skill.users)
    skills: Skill[];

}

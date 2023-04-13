
import { Entity, Unique, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, ManyToOne } from "typeorm";
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

    @ApiProperty()
    @Column({ name: 'spot', type: 'varchar', nullable: true })
    spots: string;

    @ApiProperty()
    @Column({ type: 'int', nullable: true })
    access_level: number;

    @ManyToOne(() => Article, (title) => title.spots)
    titles: Article;

    @OneToMany(() => Article, (article) => article.users)
    articles: Article[];

    @OneToMany(() => Comment, (comment) => comment.users) /* Relation où chaque "Comment"(Many) conserve l'id du "user"(One) */
    comments: Comment[];

    @ManyToMany(() => Skill, (skill) => skill.users)
    skills: Skill[];

}

import { ApiProperty } from "@nestjs/swagger";
import { Comment } from "src/comments/entities/comment.entity";
import { Skill } from "src/skills/entities/skill.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";



@Entity('articles')
@Unique(['title'])
export class Article extends BaseEntity {


    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({ name: 'title', type: 'varchar' })
    title: string;

    @ApiProperty()
    @Column({ type: 'varchar' })
    content: string;

    /* @ApiProperty()
    @Column({ name: 'user_id', type: 'number' })
    user_id: number; */

    @ApiProperty()
    @CreateDateColumn({ type: 'timestamptz', default: new Date() })
    created_at: Date;

    @ApiProperty()
    @UpdateDateColumn({ type: 'timestamptz', default: null, nullable: true })
    updated_at: Date;

    @ApiProperty()
    @Column({ type: 'timestamptz', default: null, nullable: true })
    deleted_at: Date;

    @OneToMany(() => User, (spot) => spot.titles)
    spots: User;

    @ManyToOne(() => User, (user) => user.articles)
    users: User;

    @OneToMany(() => Comment, (comment) => comment.articles)
    comments: Comment[];

    @ManyToMany(() => Skill, (skill) => skill.articles)
    @JoinTable()
    skills: Skill[];

}

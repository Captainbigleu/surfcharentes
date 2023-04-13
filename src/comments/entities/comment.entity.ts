import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Article } from "src/articles/entities/article.entity";

@Entity('comments')
export class Comment extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number

    @ApiProperty()
    @Column({ type: 'varchar' })
    content: string;

    @ApiProperty()
    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @ApiProperty()
    @UpdateDateColumn({ type: 'timestamptz', default: null })
    updated_at: Date;

    @ApiProperty()
    @Column({ type: 'timestamptz', default: null, nullable: true })
    deleted_at: Date;

    @ManyToOne(() => User, (user) => user.comments)
    users: User;

    @ManyToOne(() => Article, (article) => article.comments)
    articles: Article;

}

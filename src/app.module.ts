import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SkillsModule } from './skills/skills.module';
/* import { AuthModule } from './auth/auth.module'; */
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ArticlesModule } from './articles/articles.module';
import { Article } from './articles/entities/article.entity';




@Module({
  imports: [

    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT!),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        Article,
        Comment,
        User,
      ],
      synchronize: true,
    }),

    SkillsModule,
    ArticlesModule,
    CommentsModule,
    UsersModule,
    /* AuthModule, */
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

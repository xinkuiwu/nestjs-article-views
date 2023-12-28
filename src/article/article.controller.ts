import { Controller, Get, Post, Body, Patch, Param, Delete, Session, Req } from "@nestjs/common";
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get(':id')
  async findOne(@Param('id') id:string) {
    return await this.articleService.findOne(parseInt(id))
  }

  @Get(':id/view')
  async view (@Param('id') id: string,
              @Session() session,
              @Req() req) {
    // +id ，字符串转数字
    return await this.articleService.view(+id, session?.user?.id || req.ip)
  }
}

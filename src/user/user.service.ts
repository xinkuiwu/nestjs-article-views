import { BadRequestException, Body, Injectable, Post } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from "./dto/login-user.dto";
import { User } from "./entities/user.entity";
import { EntityManager } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  @InjectEntityManager()
  private entityManager: EntityManager;
  async login(loginUserDto: LoginUserDto){
    const user = await this.entityManager.findOne(User, {
      where: {
        username: loginUserDto.username
      }
    })

    if(!user) {
      throw new BadRequestException('用户不存在')
    }
    if(user.password !== loginUserDto.password) {
      throw new BadRequestException('密码错误')
    }
    return user
  }
}

import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../database/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const userExist = await this.findUserByEmail(createUserDto.email);

      if (!!userExist) {
        throw new BadRequestException();
      }

      const newUser = this.userRepository.create(createUserDto);

      await this.userRepository.save(newUser);

      return newUser;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: email,
        },
        select: {
          id: true,
          email: true,
          password: false,
        },
      });

      return user;
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: number) {
    try {
      const userFound = await this.userRepository.findOne({
        where: { id },
      });

      if (!userFound) {
        throw new NotFoundException('User not found.');
      }

      return userFound;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();

      return users;
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException();
    }
    try {
      const user = await this.userRepository.findOneByOrFail({ id });

      return user;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);

      if (updateUserDto.email) {
        user.email = updateUserDto.email;
      }

      if (updateUserDto.name) {
        user.name = updateUserDto.name;
      }

      if (updateUserDto.role) {
        user.role = updateUserDto.role;
      }

      await this.userRepository.save(user);

      return user;
    } catch (error) {
      throw new HttpException(
        error.message || 'Server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    const entityRemove = await this.findOne(id);

    if (!entityRemove) {
      throw new NotFoundException('Record not found');
    }

    entityRemove.isActive = false;
    await this.userRepository.save(entityRemove);

    return `This action removes a #${id} user`;
  }

  async restore(id: number) {
    const entityRestore = await this.findOne(id);

    if (!entityRestore) {
      throw new NotFoundException('Record not found');
    }

    entityRestore.isActive = true;
    await this.userRepository.save(entityRestore);

    return `This action restores a #${id} user`;
  }
}

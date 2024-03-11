import {IUserAttribute} from '../entities/user.entity';

export type CreateUserDto = Pick<IUserAttribute, 'name' | 'password' | 'email' | 'provider'>;

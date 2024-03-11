import {MediaEntity} from '../entities/media.entity';

export type CreateMediaDto = Omit<MediaEntity, 'id'>;

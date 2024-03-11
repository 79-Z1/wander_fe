import * as zod from 'zod';

import {MAX_PASSWORD} from '@/common/constants/user.constant';

export const ResetPasswordValidator = zod
  .object({
    password: zod.string().min(8, 'password_at_least_8_characters').max(MAX_PASSWORD, 'max_password'),
    confirmPassword: zod.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'password_does_not_match',
    path: ['confirmPassword']
  });

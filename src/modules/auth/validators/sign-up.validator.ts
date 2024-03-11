import * as zod from 'zod';

import {MAX_PASSWORD, MAX_USER_ENTER_NAME} from '@/common/constants/user.constant';

export const SignUpValidator = zod
  .object({
    name: zod.string().min(1, 'Không được để trống họ tên').max(MAX_USER_ENTER_NAME, 'Tên quá dài'),
    email: zod.string().email('Không được để trống email'),
    password: zod.string().min(8, 'Password phải có ít nhất 8 kí tự').max(MAX_PASSWORD, 'max_password'),
    confirmPassword: zod.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'password_does_not_match',
    path: ['confirmPassword']
  });

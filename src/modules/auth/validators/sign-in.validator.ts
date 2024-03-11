import * as zod from 'zod';

import {MAX_PASSWORD, MIN_PASSWORD} from '@/common/constants/user.constant';

export const SignInValidator = zod.object({
  email: zod
    .string({
      invalid_type_error: 'Email không hợp lệ'
    })
    .min(MIN_PASSWORD, 'Không được để trống email'),

  password: zod
    .string({
      invalid_type_error: 'Mật khẩu không hợp lệ'
    })
    .min(MIN_PASSWORD, 'Không được để trống mật khẩu')
    .max(MAX_PASSWORD, 'Mật khẩu quá dài')
});

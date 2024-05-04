import * as zod from 'zod';

import {MAX_USER_ENTER_NAME} from '@/common/constants/user.constant';

export const SettingValidator = zod.object({
  name: zod.string().min(1, {message: 'Không được để trống họ tên'}).max(MAX_USER_ENTER_NAME, {message: 'Tên quá dài'}),
  email: zod.string().min(1, {message: 'Không được để trống email'}).email({message: 'Sai định dạng email'}),
  phoneNumber: zod.string().max(11, {message: 'Sai định dạng số điện thoại'}).optional(),
  address: zod.string().optional()
});

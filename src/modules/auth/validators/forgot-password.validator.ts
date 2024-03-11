import * as zod from 'zod';

export const ForgotPasswordValidator = zod.object({
  email: zod.string().email('required_email')
});

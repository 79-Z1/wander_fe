import {IResetPassword} from '../entities/reset-password';
import FetchRequest from '../http/fetch-request';
import HttpRequest from '../http/http-request';

const sendResetPasswordRequest = async (email: string) => {
  return HttpRequest.post<IResetPassword>(`reset-password/send-mail`, {
    email
  });
};

const resetPassword = async (password: string, token: string) => {
  return HttpRequest.post<IResetPassword>(`reset-password`, {
    newPassword: password,
    token
  });
};

const readValidResetPasswordToken = async (token: string) => {
  try {
    const res = await FetchRequest(`reset-password/validate/${token}`, {
      cache: 'no-cache',
      next: {revalidate: undefined}
    });
    const json = await res.json();

    return json.metadata as boolean;
  } catch (error) {
    return null;
  }
};

export const ResetPasswordApi = {
  sendResetPasswordRequest,
  readValidResetPasswordToken,
  resetPassword
};

export default ResetPasswordApi;

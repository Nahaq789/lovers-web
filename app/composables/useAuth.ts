import { AuthApi } from '~/api/auth';
import { errorHandler } from '~/shared/errorHandler';

export const useAuth = () => {
  const { login } = AuthApi();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleLogin = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    // テストで2秒待機
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (!validateEmail(email)) {
      return { success: false, error: 'Invalid email format' };
    }
    if (!validatePassword(password)) {
      return {
        success: false,
        error: 'Password must be at least 6 characters long',
      };
    }

    try {
      const result = await login(email, password);
      console.log('Login result:', result);
      return { success: true };
    } catch (e) {
      errorHandler('Login failed', e);
      return {
        success: false,
        error: 'Login failed. Please check your credentials and try again.',
      };
    }
  };

  return {
    handleLogin,
  };
};

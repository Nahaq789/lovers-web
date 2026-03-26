import { AuthApi } from '~/api/auth';
import { errorHandler } from '~/shared/errorHandler';

export const useAuth = () => {
  const { login } = AuthApi();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
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

  const handleSignup = async (
    _email: string,
    _password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    return { success: false, error: 'Signup functionality not implemented' };
  };

  return {
    validatePassword,
    handleLogin,
    handleSignup,
  };
};

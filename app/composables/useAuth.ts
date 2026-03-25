import { AuthApi } from '~/api/auth';

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
    if (!validateEmail(email)) {
      return { success: false, error: 'Invalid email format' };
    }
    if (!validatePassword(password)) {
      return {
        success: false,
        error: 'Password must be at least 6 characters long',
      };
    }

    return { success: true };
  };

  return {
    handleLogin,
  };
};

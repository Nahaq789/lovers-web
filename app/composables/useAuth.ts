import { AuthApi } from "~/api/auth";

export const useAuth = () => {
  const { login } = AuthApi();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleLogin = async (email: string, password: string) => {
    if (!validateEmail(email)) {
      throw new Error("Invalid email format");
    }
    if (!validatePassword(password)) {
      throw new Error("Password must be at least 6 characters long");
    }
  };

  return {
    handleLogin,
  };
};

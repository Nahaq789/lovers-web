export const AuthApi = () => {
  const { api } = useApi();

  const login = async (email: string, password: string) => {
    const result = await api('/auth/login', {
      method: 'POST',
      body: {
        email: email,
        password: password,
      },
    });
    return result;
  };

  return {
    login,
  };
};

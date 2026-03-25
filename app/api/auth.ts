export const AuthApi = () => {
  const { api } = useApi();

  const login = async () => {
    const reulst = api('/auth/login', {
      method: 'POST',
      body: {},
    });
  };

  return {
    login,
  };
};

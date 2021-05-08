import { Api } from '../api/Api';

const setAccessTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);

  Api.$instance.setHeader('Authorization', accessToken);
}

export default setAccessTokens;

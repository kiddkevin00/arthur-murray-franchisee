import HttpClient from '../../utils/HttpClient';

const httpClient = HttpClient.createInstance({
  baseURL: 'https://api.arthurmurrayfranchisee.com',
});

// eslint-disable-next-line import/prefer-default-export
export const login = (email, password) =>
  httpClient.post('/oauth/v2/token', {
    client_id: '5cb9f3803b7750216d34f772_4pfk2m5bhyuccc48kc4c8ooow04sscgsc0s4cggk88kkw8g00s',
    client_secret: '52963dmdve88ow4o8ggk0g80k000k0g4s0k00k0kso8coswssw',
    grant_type: 'password',
    username: 'amdcworld+dancecomp@gmail.com' || email,
    password: '111111',
  });

export const fetchMyInfo = access_token => httpClient.get('/api/v1/users/current', { params: { access_token } });

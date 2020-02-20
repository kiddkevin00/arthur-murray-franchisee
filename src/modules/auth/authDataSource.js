import HttpClient from '../../utils/HttpClient';

const httpClient = HttpClient.createInstance({
  baseURL: 'https://reporting.arthurmurray.com',
});

export const login = (email, password) =>
  httpClient.post('/oauth/v2/token', {
    client_id: '5e4ab19f047c2a16883c6f58_5ranbk2z53kssgkwc8sc0kgww8o8ko0444k004co8ws4s48w4k',
    client_secret: '3sctxu7wz06c8w0oko0ow4sog8kg08o4k80gkkw4k8wwcow4ws',
    grant_type: 'password',
    username: email,
    password,
  });

export const fetchMyInfo = access_token =>
  httpClient.get('/api/v1/users/current', { params: { access_token } });

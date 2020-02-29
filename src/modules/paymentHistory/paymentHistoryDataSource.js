import HttpClient from '../../utils/HttpClient';

const stripeHttpClient = HttpClient.createInstance({
  baseURL: 'https://api.stripe.com',
});

export const fetchMyTransactions = () =>
  stripeHttpClient.get('/v1/balance_transactions', {
    params: {
      limit: 100,
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer sk_test_QkVvxEkYDwfdCRrjtSwcbtjT00S6G3W8Tk`,
    },
  });

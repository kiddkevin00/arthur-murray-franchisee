import HttpClient from '../../utils/HttpClient';
import { STRIPE_PUBLISHABLE_KEY } from '../../utils/constants';
import queryString from 'query-string';

const stripeHttpClient = HttpClient.createInstance({
  baseURL: 'https://api.stripe.com',
});
const arthurMurraySystemhttpClient = HttpClient.createInstance();

export const fetchStripeCardToken = cardData =>
  stripeHttpClient.post('/v1/tokens', queryString.stringify(cardData), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
    },
  });

export const proceedPayment = payload =>
  arthurMurraySystemhttpClient.post('payment/proceed', payload);

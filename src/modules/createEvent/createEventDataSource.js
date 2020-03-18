import HttpClient from '../../utils/HttpClient';

const httpClient = HttpClient.createInstance();

export const createEvent = payload => httpClient.post('/events', payload);

import HttpClient from '../../utils/HttpClient';

const httpClient = HttpClient.createInstance();

export const fetchEvents = () => httpClient.get('/events');

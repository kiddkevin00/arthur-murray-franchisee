import HttpClient from '../../utils/HttpClient';

const httpClient = HttpClient.createInstance();

export const fetchStudioReports = studio => httpClient.get(`/reports/studios/${studio}`);

import request from 'superagent';

const backendBaseUrl = 'http://192.168.1.83:8000/';

export const updateStrip = (mode_name: string, parameters: object) => {
  console.log('');

  return request
    .post(`${backendBaseUrl}update`)
    .send({ mode: mode_name, params: parameters })
    .set('Accept', 'application/json');
  //return request.get(`${backendBaseUrl}hello`).query({}).set('Accept', 'application/json')
};
